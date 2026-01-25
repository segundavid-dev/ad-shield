import { ShieldCheck, ShieldAlert, Zap, Globe, Github, Chrome } from "lucide-react";

function App() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">      
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Hero Text */}
        <div className="space-y-6">
          <div className="inline-block bg-neo-success border-2 border-black px-4 py-1 font-black text-sm uppercase shadow-neo animate-bounce">
            Live on Chrome Store
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter">
            Ad<span className="text-neo-accent">Shield</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-bold border-l-4 border-black pl-4 leading-tight">
            Lightweight ad blocker that kills intrusive ads, popups and malicious redirects for a smoother browsing experience.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="neo-button text-lg bg-neo-success hover:bg-neo-success/90">
              <Chrome size={24} strokeWidth={3} />
              ADD TO CHOME
            </button>
            <a 
              href="https://github.com/segundavid-dev/ad-shield" 
              target="_blank" 
              rel="noreferrer"
              className="neo-button text-lg bg-white"
            >
              <Github size={24} strokeWidth={3} />
              GITHUB
            </a>
          </div>
        </div>

        {/* Right Side: Visual/Mockup */}
        <div className="relative">
          {/* Main Extension Mockup Card */}
          <div className="neo-card max-w-sm mx-auto z-10 relative">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 border-2 border-black flex items-center justify-center font-black bg-neo-accent">🛡️</div>
                 <span className="font-black uppercase tracking-tighter">AdShield</span>
               </div>
               <div className="w-10 h-6 border-2 border-black bg-neo-success relative shadow-neo">
                 <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white border-2 border-black"></div>
               </div>
            </div>

            <div className="bg-neo-success border-2 border-black p-8 text-center flex flex-col items-center mb-6">
              <ShieldCheck size={80} strokeWidth={3} className="mb-2" />
              <h2 className="text-2xl font-black uppercase mt-2">Active</h2>
              <p className="font-bold text-xs">PROUDLY PROTECTED</p>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between items-center bg-gray-100 border-2 border-black p-3 shadow-neo">
                  <span className="font-black text-sm uppercase">Ads Blocked</span>
                  {/* <span className="bg-black text-white px-2 py-0.5 font-black">12,402</span> */}
               </div>
               <div className="flex justify-between items-center bg-gray-100 border-2 border-black p-3 shadow-neo">
                  <span className="font-black text-sm uppercase">Trackers Blocked</span>
                  {/* <span className="bg-black text-white px-2 py-0.5 font-black">841</span> */}
               </div>
            </div>
          </div>

          {/* Decorative floating boxes & fragments */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-neo-warning border-4 border-black shadow-neo z-0 rotate-12 transition-transform hover:-rotate-6 duration-500 hidden md:block"></div>
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-neo-accent/10 border-2 border-black border-dashed z-0 -rotate-12 hidden md:block"></div>
          
          {/* Smaller floating fragments to fill the gaps */}
          <div className="absolute top-0 -left-20 w-8 h-8 bg-black z-0 rotate-45 hidden lg:block"></div>
          <div className="absolute bottom-1/3 -right-24 w-12 h-12 border-4 border-black bg-neo-success z-0 -rotate-12 hidden lg:block shadow-neo"></div>
          <div className="absolute -bottom-12 right-12 w-10 h-10 bg-white border-2 border-black shadow-neo z-0 rotate-45 hidden md:block"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-5xl w-full mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="neo-card hover:bg-neo-warning transition-colors group">
          <Zap size={32} strokeWidth={3} className="mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-black uppercase mb-2">Lightning Fast</h3>
          <p className="font-bold text-sm">Engineered for minimal resource usage. Browsing feels faster than ever.</p>
        </div>
        
        <div className="neo-card hover:bg-neo-success transition-colors group">
          <ShieldAlert size={32} strokeWidth={3} className="mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-black uppercase mb-2">No Redirects</h3>
          <p className="font-bold text-sm">Kills malicious redirects and tab-unders instantly before they load.</p>
        </div>

        <div className="neo-card hover:bg-neo-accent hover:text-white transition-colors group">
          <Globe size={32} strokeWidth={3} className="mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-black uppercase mb-2">Global Protection</h3>
          <p className="font-bold text-sm">Curated lists to block regional and international ad networks.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pb-8 text-center font-black uppercase tracking-widest text-sm opacity-60">
        AdShield &copy; 2026 • Built with ❤ for the community
      </footer>
    </main>
  );
}

export default App;
