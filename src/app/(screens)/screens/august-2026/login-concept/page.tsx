export default function LoginConcept() {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/70">Sign in to your Akarati account</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white/70 cursor-pointer">
              <input type="checkbox" className="rounded border-white/20 bg-black/20" />
              Remember me
            </label>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Forgot Password?</a>
          </div>
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all hover:scale-[1.02]">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
