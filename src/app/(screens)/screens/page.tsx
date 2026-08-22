import Link from "next/link";
import { screensData } from "./data";

export default function ScreensIndex() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black p-8 sm:p-12 font-sans text-white">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4 tracking-tight">
            Design Prototype
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            A curated collection of isolated screens and components built for the Akarati freelance project.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {screensData.map((month) => (
            <Link 
              key={month.id} 
              href={`/screens/${month.id}`}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2 overflow-hidden flex flex-col justify-between min-h-[240px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">{month.name}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{month.description}</p>
              </div>

              <div className="relative z-10 mt-6 flex items-center justify-between text-sm font-medium text-blue-400 group-hover:text-purple-400 transition-colors">
                <span>{month.screens.length} Screens</span>
                <span className="flex items-center gap-1">
                  View <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
