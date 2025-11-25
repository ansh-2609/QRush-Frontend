import { useSelector, useDispatch } from "react-redux";
import { setQuestions } from "../../store/finishQuizSlice";

const Finished = ({ onHome }) => {
  const dispatch = useDispatch();
  const finishQuiz = useSelector((store) => store.finishQuiz);
  const { score, questions, submitted } = finishQuiz;

  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

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
    // reset quiz (clear previous answers/score but keep questions)
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
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Try Again
        </button>
        <button
          onClick={onHome}
          className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-200"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
};

export default Finished;
