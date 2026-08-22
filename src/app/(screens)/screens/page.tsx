import Link from "next/link";

export default function ScreensIndex() {
  const screens = [
    { name: "Example Screen", path: "/screens/example" },
    // You can add more screens here in the future
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center font-sans">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center border-b pb-4">
          Prototype Screens Directory
        </h1>
        
        {screens.length === 0 ? (
          <p className="text-gray-500 text-center">No screens available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {screens.map((screen, index) => (
              <Link 
                key={index} 
                href={screen.path}
                className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all hover:-translate-y-1"
              >
                <div className="text-blue-500 mb-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{screen.name}</h2>
                <p className="text-sm text-gray-500 mt-2">Click to view this isolated screen</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
