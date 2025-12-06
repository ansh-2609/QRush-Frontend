
import WordOfTheDay from "../components/WordOfTheDay";

const Home = () => {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 text-center px-4 py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20 animate-fadeIn">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-white">Live Now</span>
        </div>

        {/* Main heading with gradient text */}
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight animate-slideUp">
          <span className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 bg-clip-text text-transparent">
            Welcome to
          </span>
          <br />
          <span className="relative inline-block mt-2">
            <span className="relative z-10 bg-gradient-to-r from-blue-100 to-blue-300 bg-clip-text text-transparent">
              QRush
            </span>
            <span className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-blue-400 blur-lg opacity-50 animate-pulse"></span>
          </span>
          <span className="ml-3 text-5xl md:text-6xl animate-bounce inline-block">🎯</span>
        </h2>

        {/* Subheading */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/90 mb-6 animate-fadeIn animation-delay-200">
          Play Fun Quizzes <span className="text-blue-200">Anytime, Anywhere!</span>
        </h3>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto animate-fadeIn animation-delay-400">
          Challenge your brain, compete with friends, and test your knowledge across hundreds of topics.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fadeIn animation-delay-600">
          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            🧠 Brain Training
          </span>
          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            🏆 Leaderboards
          </span>
          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
            ⚡ Quick Quizzes
          </span>
        </div>

        {/* Word of the Day Card */}
        <div className="mt-12 animate-fadeInSlow animation-delay-800 transform hover:scale-105 transition-transform duration-300">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-1 border border-white/20 shadow-2xl">
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6">
              <WordOfTheDay />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 flex justify-center gap-2 animate-fadeIn animation-delay-1000">
          <div className="w-2 h-2 rounded-full bg-blue-300 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse animation-delay-200"></div>
          <div className="w-2 h-2 rounded-full bg-blue-200 animate-pulse animation-delay-400"></div>
        </div>
      </div>

      {/* <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInSlow {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 1s ease-out forwards;
        }
        
        .animate-fadeInSlow {
          animation: fadeInSlow 1.2s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style> */}
    </main>
  );
};

export default Home;