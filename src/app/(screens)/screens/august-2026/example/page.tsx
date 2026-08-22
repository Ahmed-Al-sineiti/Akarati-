export default function ExampleScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Example Screen</h1>
        <p className="text-gray-600 mb-6">
          This is an isolated screen. It does not have the dashboard sidebar or navbar.
          You can build your custom designs here and send the link to the client.
        </p>
        <button className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
          Interactive Button
        </button>
      </div>
    </div>
  );
}
