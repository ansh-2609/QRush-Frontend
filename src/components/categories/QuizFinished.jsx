
import {useEffect, useRef } from "react";
import { fetchCategoryQuizPlayed, fetchCStatus, fetchQuizPlayed, setCategoryQuizPlayed, setCStatus, setFirstQuizBadge, setQuizPlayed, setSecondCategoryQuizBadge, setThirdCategoryQuizBadge, updateQuizLordBadge, updateSecondCategoryQuizBadge, updateThirdCategoryQuizBadge } from "../../services/appServices";
import { useSelector } from "react-redux";

const QuizFinished = ({ score, totalQuestions, onRestart, onHome }) => {

  
  const percentage = Math.round((score / totalQuestions) * 100);

  const category = useSelector((state) => state.quiz.category);

  const userId = useSelector((state) => state.auth.userId);
  

  const hasRun = useRef(false);
 

  useEffect(() => {
    
    const getCompleteStatus = async () => {
      if (hasRun.current) return;
      hasRun.current = true;
      try {
 
        const response = await fetchCStatus(category, userId);

        const categoryQuizPlayed = await fetchCategoryQuizPlayed(userId);
        if (Array.isArray(categoryQuizPlayed) && categoryQuizPlayed.length > 0 && categoryQuizPlayed[0]) {
          const key = Object.keys(categoryQuizPlayed[0])[0];
          const value = categoryQuizPlayed[0][key];


          if(value < 5 && !response[0][category]) {

            await updateSecondCategoryQuizBadge(userId);
            
          }

          if(value < 10 && !response[0][category]) {

            await updateThirdCategoryQuizBadge(userId); 
        }
        } else {
          console.warn("fetchCategoryQuizPlayed returned invalid data:", categoryQuizPlayed);
        }

        

        
        const response2 = await fetchCStatus(category, userId);
        if (Array.isArray(response2) && response2.length > 0 && response2[0]) {
          const dynamicCategory = Object.keys(response2[0])[0];

          if (!response2[0][dynamicCategory]) {
            await setCategoryQuizPlayed(userId); 
            await setQuizPlayed(userId);
            await setCStatus(category, userId);
          }
        } else {
          console.warn("fetchCStatus returned invalid data:", response2);
        }

        const quizPlayed = await fetchQuizPlayed(userId);

        if (Array.isArray(quizPlayed) && quizPlayed.length > 0 && quizPlayed[0]) {
          const key = Object.keys(quizPlayed[0])[0];
          const value = quizPlayed[0][key];

          if (value < 25) {
            await updateQuizLordBadge(userId, value);
          }
        }else {
          console.warn("fetchQuizPlayed returned invalid data:", quizPlayed);
        }

        const quizPlayed2 = await fetchQuizPlayed(userId);

        if (Array.isArray(quizPlayed2) && quizPlayed2.length > 0 && quizPlayed2[0]) {
          const key = Object.keys(quizPlayed2[0])[0];
          const value = quizPlayed2[0][key];

          if (value === 1 || value === "1") {
            await setFirstQuizBadge(userId);
          }

          if(value ===  25) {
            await setQuizLordBadge(userId);
          }
        }else {
          console.warn("fetchQuizPlayed returned invalid data:", quizPlayed2);
        }

        const categoryQuizPlayed2 = await fetchCategoryQuizPlayed(userId);
        if (Array.isArray(categoryQuizPlayed2) && categoryQuizPlayed2.length > 0 && categoryQuizPlayed2[0]) {
          const key = Object.keys(categoryQuizPlayed2[0])[0];
          const value = categoryQuizPlayed2[0][key];

          if (value ===  5) {
            await setSecondCategoryQuizBadge(userId);
          }

          if(value === 10) {
            await setThirdCategoryQuizBadge(userId); 
        }
          
        } else {
          console.warn("fetchCategoryQuizPlayed returned invalid data:", categoryQuizPlayed);
        }

      } catch (error) {
        console.error("Error fetching complete status:", error);
      }


    };
    getCompleteStatus();
  }, [category, userId]);


  const getPerformanceMessage = () => {
    if (percentage >= 80) return "Excellent work!";
    if (percentage >= 60) return "Great job!";
    if (percentage >= 40) return "Nice try!";
    return "Keep practicing!";
  };

  const getPerformanceEmoji = () => {
    if (percentage >= 80) return "🌟";
    if (percentage >= 60) return "👍";
    if (percentage >= 40) return "🙂";
    return "💪";
  };

  const getGradientColors = () => {
    if (percentage >= 80) return "from-emerald-500 to-teal-500";
    if (percentage >= 60) return "from-blue-500 to-indigo-500";
    if (percentage >= 40) return "from-amber-500 to-orange-500";
    return "from-rose-500 to-pink-500";
  };

  const getGlowColor = () => {
    if (percentage >= 80) return "shadow-emerald-500/50";
    if (percentage >= 60) return "shadow-blue-500/50";
    if (percentage >= 40) return "shadow-amber-500/50";
    return "shadow-rose-500/50";
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 overflow-hidden px-4 py-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-slate-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-100px) translateX(50px); opacity: 0.6; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

      <div className="relative z-10 w-full max-w-xl">
        {/* Main card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 animate-slideUp">
          {/* Celebration emoji */}
          <div className="text-5xl font-black text-white mb-6 animate-slideUp inline-block" style={{ animationDelay: "0.2s" }}>
            🎉 Quiz Completed!
          </div>

          {/* Title */}
          {/* <h2 className="text-5xl font-black text-white mb-6 animate-slideUp inline-block" style={{ animationDelay: "0.3s" }}>
            🎉  Quiz Completed!
          </h2> */}

          {/* Score circle container */}
          <div className="mb-6 animate-scaleIn" style={{ animationDelay: "0.4s" }}>
            <div className={`relative mx-auto w-48 h-48 flex items-center justify-center rounded-full bg-gradient-to-br ${getGradientColors()} p-1 shadow-2xl ${getGlowColor()}`}>
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-950 rounded-full flex items-center justify-center">
                {/* Animated progress ring */}
                <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="565"
                    strokeDashoffset={565 - (565 * percentage) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-[2000ms] ease-out"
                    style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))" }}
                  />
                </svg>
                
                {/* Score display */}
                <div className="text-center z-10">
                  <div className="text-6xl font-black text-white mb-1">
                    {percentage}
                  </div>
                  <div className="text-xl font-bold text-white/80">%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance badge */}
          <div className="mb-6 animate-slideUp flex items-center justify-center" style={{ animationDelay: "0.5s" }}>
            <div className={`inline-flex items-center gap-3 px-6 py-3 justify-center bg-gradient-to-r ${getGradientColors()} rounded-2xl shadow-lg ${getGlowColor()}`}>
              <span className="text-3xl">{getPerformanceEmoji()}</span>
              <span className="text-xl font-bold text-white">{getPerformanceMessage()}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 mb-8 animate-slideUp" style={{ animationDelay: "0.6s" }}>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">{score}</div>
              <div className="text-xs font-semibold text-white/60 uppercase tracking-wider">Correct</div>
            </div>
            <div className="w-px bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">{totalQuestions}</div>
              <div className="text-xs font-semibold text-white/60 uppercase tracking-wider">Total</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp" style={{ animationDelay: "0.7s" }}>
            <button
              onClick={onRestart}
              className={`group relative px-8 py-4 bg-gradient-to-r ${getGradientColors()} text-white font-bold rounded-xl cursor-pointer shadow-lg hover:shadow-2xl ${getGlowColor()} transition-all duration-300 hover:scale-105 overflow-hidden`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-xl">🔁</span>
                <span>Try Again</span>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            
            <button
              onClick={onHome}
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="text-xl">🏠</span>
                <span>Back to Home</span>
              </span>
            </button>
          </div>
        </div>

        {/* Bottom decorative text */}
        <div className="text-center mt-8 text-white/40 text-sm font-medium animate-slideUp" style={{ animationDelay: "0.8s" }}>
          Your progress has been saved
        </div>
      </div>
    </section>
  );
};

export default QuizFinished;
