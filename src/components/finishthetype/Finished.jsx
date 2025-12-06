import { useSelector, useDispatch } from "react-redux";
import { setQuestions } from "../../store/finishQuizSlice";
import { fetchFinishQuizPlayed, fetchFinishQuizStatus, fetchQuizPlayed, setFinishQuizPlayed, setFinishQuizStatus, setFirstQuizBadge, setQuizLordBadge, setQuizPlayed, setSecondCategoryQuizBadge, updateQuizLordBadge, updateSecondFinishQuizBadge } from "../../services/appServices";
import { useEffect, useRef } from "react";

const Finished = ({ onHome }) => {
  const dispatch = useDispatch();
  const finishQuiz = useSelector((store) => store.finishQuiz);
  const { score, questions, submitted } = finishQuiz;

  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);


  const category = useSelector((state) => state.finishQuiz.subcategory);
  const userId = useSelector((state) => state.auth.userId);

  const hasRun = useRef(false);


  useEffect(()  => {

    const getCompleteStatus = async () => {
      if (hasRun.current) return;
      hasRun.current = true;
      try {

        const response = await fetchFinishQuizStatus(category, userId);

        const finishQuizPlayed = await fetchFinishQuizPlayed(userId);
        if (Array.isArray(finishQuizPlayed) && finishQuizPlayed.length > 0 && finishQuizPlayed[0]) {
          const key = Object.keys(finishQuizPlayed[0])[0];
          const value = finishQuizPlayed[0][key];

          if(value < 5 && !response[0][category]) {
              await updateSecondFinishQuizBadge(userId);
          }
        }else {
          console.warn("fetchFinishQuizPlayed returned invalid data:", finishQuizPlayed);
        }

        const response2 = await fetchFinishQuizStatus(category, userId);
        if (Array.isArray(response2) && response2.length > 0 && response2[0]) {
          const dynamicCategory = Object.keys(response2[0])[0];
          if (!response2[0][dynamicCategory]) {
            await setFinishQuizPlayed(userId);
            await setQuizPlayed(userId);
            await setFinishQuizStatus(category, userId);
          }
        } else {
          console.warn("fetchFinishQuizStatus returned invalid data:", response2);
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

        const finishQuizPlayed2 = await fetchFinishQuizPlayed(userId);
        if (Array.isArray(finishQuizPlayed2) && finishQuizPlayed2.length > 0 && finishQuizPlayed2[0]) {
          const key = Object.keys(finishQuizPlayed2[0])[0];
          const value = finishQuizPlayed2[0][key];

          if (value ===  5) {
            await setSecondCategoryQuizBadge(userId);
          }
          
        } else {
          console.warn("fetchFinishQuizPlayed returned invalid data:", finishQuizPlayed2);
        }


      }catch (error) {
        console.error("Error updating quiz status:", error);
      }
    };
    getCompleteStatus();
  }, [category, userId]);

  const getPerformanceMessage = () => {
    if (percentage >= 80) return "Excellent work!";
    if (percentage >= 60) return "Good job!";
    if (percentage >= 40) return "Nice try!"; 
    return "Keep practicing!";
  };

  const getPerformanceColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const handleRestart = () => {
    // reset quiz
    dispatch(setQuestions([...questions]));
  };

  if (!submitted) {
    return (
      <div className="p-4 max-w-md mx-auto text-center">
        <h2 className="text-xl font-bold">No answers submitted yet!</h2>
        <p className="text-gray-600">Please complete the quiz first.</p>
      </div>
    );
  }

  return (
    <main className="py-20 text-center">
      <h2 className="text-4xl font-bold text-blue-800 mb-4">
        Quiz Completed!
      </h2>

      <div className="mb-8">
        <h3 className={`text-2xl font-semibold ${getPerformanceColor()} mb-6`}>
          {getPerformanceMessage()}
        </h3>
        <div className="text-lg text-gray-700 space-y-2">
          <p>
            Your Score:{" "}
            <span className="font-bold text-blue-800">
              {score}/{totalQuestions}
            </span>
          </p>
          <p>
            Percentage:{" "}
            <span className="font-bold text-blue-800">{percentage}%</span>
          </p>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={handleRestart}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
        >
          Try Again
        </button>
        <button
          onClick={onHome}
          className="px-6 py-3 bg-gray-600 text-white font-semibold cursor-pointer rounded-lg hover:bg-gray-700 transition duration-200"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
};

export default Finished;
