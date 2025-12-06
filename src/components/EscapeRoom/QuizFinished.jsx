
import { useEffect, useRef } from "react";
import { FaRedo } from "react-icons/fa";
import { useSelector } from "react-redux";
import { fetchEscapeQuizPlayed, fetchEscapeQuizStatus, fetchQuizPlayed, setEscapeQuizPlayed, setEscapeQuizStatus, setFirstEscapeQuizBadge, setFirstQuizBadge, setFourthEscapeQuizBadge, setQuizLordBadge, setQuizPlayed, setSecondEscapeQuizBadge, setThirdEscapeQuizBadge, updateFourthEscapeQuizBadge, updateQuizLordBadge } from "../../services/appServices";




const QuizFinished = ({ totalPuzzles, timer, formatTime, resetGame }) => {

  const category = useSelector((state) => state.escapeRoom.subcategory);

  const userId = useSelector((state) => state.auth.userId);

  const hasRun = useRef(false);

  useEffect(() => {

    const getCompleteStatus = async () => {
      if (hasRun.current) return;
      hasRun.current = true;

      try{
        const completeStatus = await fetchEscapeQuizStatus(category, userId);

        const EscapeQuizPlayed = await fetchEscapeQuizPlayed(userId);
        if (Array.isArray(EscapeQuizPlayed) && EscapeQuizPlayed.length > 0 && EscapeQuizPlayed[0]) {
          const key = Object.keys(EscapeQuizPlayed[0])[0];
          const value = EscapeQuizPlayed[0][key];


          if(value < 3 && !completeStatus[0][category]) {

              await updateFourthEscapeQuizBadge(userId);
            
          }
        } else {
          console.warn("fetchCategoryQuizPlayed returned invalid data:", categoryQuizPlayed);
        }

        const response2 = await fetchEscapeQuizStatus(category, userId);
        if (Array.isArray(response2) && response2.length > 0 && response2[0]) {
          const dynamicCategory = Object.keys(response2[0])[0];

          if (!response2[0][dynamicCategory]) {
            await setEscapeQuizPlayed(userId); 
            await setQuizPlayed(userId);
            await setEscapeQuizStatus(category, userId);
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

        const completeStatus2 = await fetchEscapeQuizStatus(category, userId);

        const escapeQuizPlayed2 = await fetchEscapeQuizPlayed(userId);
        if (Array.isArray(escapeQuizPlayed2) && escapeQuizPlayed2.length > 0 && escapeQuizPlayed2[0]) {
          const key = Object.keys(escapeQuizPlayed2[0])[0];
          const value = escapeQuizPlayed2[0][key];

          if(completeStatus2[0][category]){
            if(category === "temple"){
              await setFirstEscapeQuizBadge(userId);
            }
            else if(category === "island"){
              await setSecondEscapeQuizBadge(userId);
            }
            else if(category === "lab"){
              await setThirdEscapeQuizBadge(userId);
            }
          }

          if (value ===  3) {
            await setFourthEscapeQuizBadge(userId);
          }
          
        } else {
          console.warn("fetchEscapeQuizPlayed returned invalid data:", escapeQuizPlayed2);
        }

      }catch(error){
        console.error("Error updating completion status:", error);
      }
    };
    getCompleteStatus();
  }, [category, userId]);

    
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🏺</div>
        <h1 className="text-3xl font-bold text-amber-800 mb-2">
          You Escaped the Ancient Temple!
        </h1>
        <p className="text-gray-700 mb-4">
          You solved all {totalPuzzles} puzzles!
        </p>
        <p className="text-xl font-semibold text-amber-600 mb-6">
          Time: {formatTime(timer)}
        </p>
        <button
          onClick={resetGame}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
        >
          <FaRedo className="inline mr-2" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default QuizFinished;
