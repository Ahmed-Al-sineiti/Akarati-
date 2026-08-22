import Link from "next/link";
import { notFound } from "next/navigation";
import { screensData } from "../data";

export default async function MonthScreens({ params }: { params: Promise<{ month: string }> }) {
  const resolvedParams = await params;
  const monthData = screensData.find((m) => m.id === resolvedParams.month);

  if (!monthData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black p-8 sm:p-12 font-sans text-white">
      <div className="max-w-6xl mx-auto">
        <Link 
          href="/screens" 
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Directory
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {monthData.name}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            {monthData.description}
          </p>
        </header>

        {monthData.screens.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center backdrop-blur-sm">
            <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No screens yet</h3>
            <p className="text-gray-500">You haven't added any screens to this month.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthData.screens.map((screen) => (
              <Link 
                key={screen.id} 
                href={screen.path}
                className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col h-full"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    {screen.date && (
                      <span className="text-xs font-medium text-gray-500 bg-black/20 px-3 py-1 rounded-full">
                        {screen.date}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{screen.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{screen.description}</p>
                </div>
                
                <div className="flex items-center text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors mt-auto">
                  View Screen 
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
