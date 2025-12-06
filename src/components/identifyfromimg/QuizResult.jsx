
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaTrophy, FaStar, FaHeart } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { fetchImageQuizPlayed, fetchImageQuizStatus, setImageQuizPlayed, setImageQuizStatus, setQuizPlayed, fetchQuizPlayed, setSecondCategoryQuizBadge, updateSecondImageQuizBadge, setFirstQuizBadge, updateThirdImageQuizBadge, setThirdImageQuizBadge, updateQuizLordBadge, setQuizLordBadge } from "../../services/appServices";
import { useSelector } from "react-redux";

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { score = 0, totalQuestions = 10, quizType = "Identify the Landmark", livesRemaining = 0 } = location.state || {};

  const category = useSelector((state) => state.imageQuiz.subcategory);

  const userId = useSelector((state) => state.auth.userId);

  const percentage = Math.round((score / (totalQuestions * 10)) * 100);


  const hasRun = useRef(false);

  useEffect(() => {
    

    const getCompleteStatus = async () => {
      if (hasRun.current) return;
      hasRun.current = true;
    
      try{
        const response = await fetchImageQuizStatus(category, userId);

        const imageQuizPlayed = await fetchImageQuizPlayed(userId);
        if (Array.isArray(imageQuizPlayed) && imageQuizPlayed.length > 0 && imageQuizPlayed[0]) {
          const key = Object.keys(imageQuizPlayed[0])[0];
          const value = imageQuizPlayed[0][key];


          if(value < 5 && !response[0][category]) {

              await updateSecondImageQuizBadge(userId);
            
          }

          if(value < 7 && !response[0][category]) {

            await updateThirdImageQuizBadge(userId); 
          }
        } else {
          console.warn("fetchImageQuizPlayed returned invalid data:", imageQuizPlayed);
        }

        const response2 = await fetchImageQuizStatus(category, userId);
        if (Array.isArray(response2) && response2.length > 0 && response2[0]) {
          const dynamicCategory = Object.keys(response2[0])[0];

          if (!response2[0][dynamicCategory]) {
            await setImageQuizPlayed(userId);
            await setQuizPlayed(userId);
            await setImageQuizStatus(category, userId);
          }
        } else {
          console.warn("fetchImageQuizStatus returned invalid data:", response2);
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

        const imageQuizPlayed2 = await fetchImageQuizPlayed(userId);
        if (Array.isArray(imageQuizPlayed2) && imageQuizPlayed2.length > 0 && imageQuizPlayed2[0]) {
          const key = Object.keys(imageQuizPlayed2[0])[0];
          const value = imageQuizPlayed2[0][key];


          if (value ===  5) {
            await setSecondCategoryQuizBadge(userId);
          }

          if(value === 7) {
            await setThirdImageQuizBadge(userId); 
          }
          
        } else {
          console.warn("fetchImageQuizPlayed returned invalid data:", imageQuizPlayed2);
        }



      }
      catch (error) {
        console.error("Error updating quiz status:", error);
      }
    }
    getCompleteStatus();
  }, [category, userId]);
  
  const getPerformanceMessage = () => { 
    if (percentage >= 90) return "Outstanding! 🎉";
    if (percentage >= 70) return "Excellent! 👏";
    if (percentage >= 50) return "Good job! 👍";
    return "Keep practicing! 💪";
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleRetryQuiz = () => {
    navigate('/identify-landmark');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white text-center">
          <FaTrophy className="text-4xl mx-auto mb-4 text-yellow-300" />
          <h1 className="text-3xl font-bold">Quiz Complete!</h1>
          <p className="text-blue-100 mt-2">{quizType}</p>
        </div>

        {/* Results */}
        <div className="p-6">
          {/* Score Circle */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800">{score}</div>
                <div className="text-gray-500">points</div>
                <div className="text-lg font-semibold text-green-600 mt-1">
                  {percentage}%
                </div>
              </div>
            </div>
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#10b981"
                strokeWidth="8"
                strokeDasharray={`${percentage} 100`}
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Performance Message */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {getPerformanceMessage()}
            </h2>
            <p className="text-gray-600">
              You scored {score} out of {totalQuestions * 10} possible points
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <FaStar className="text-yellow-500 text-xl mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{score}</div>
              <div className="text-sm text-gray-600">Total Score</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <FaHeart className="text-red-500 text-xl mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{livesRemaining}</div>
              <div className="text-sm text-gray-600">Lives Left</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleRetryQuiz}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <FaTrophy className="text-lg" />
              Try Again
            </button>
            
            <button
              onClick={handleHomeClick}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 cursor-pointer rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <FaHome className="text-lg" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
