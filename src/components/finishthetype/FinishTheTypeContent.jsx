
import { IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { submitAnswer } from "../../store/finishQuizSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const FinishTheTypeContent = () => {
  const finishQuiz = useSelector((store) => store.finishQuiz);
  const questions = finishQuiz.questions || [];
   const subcategory = useSelector((store) => store.finishQuiz.subcategory);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => { 
    if (finishQuiz.questions.length === 0) {
      navigate("/quiz-type/finish");
    }
  }, [finishQuiz.questions, navigate]);

  
  if (finishQuiz.questions.length === 0) {
    return null; 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const answers = {};
    formData.forEach((value, key) => {
      answers[key] = value;
    });
    dispatch(submitAnswer(answers));
    navigate(`/quiz-type/finish/${subcategory}/result`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 py-10">
      <motion.div
        className="w-full max-w-xl bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          🏛️ Finish the Capital City
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {questions.map((question, index) => (
            <motion.div
              key={index}
              className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg font-medium text-gray-800 mb-2">
                {question.question}
              </p>
              <input
                type="text"
                name={`answer${index}`}
                placeholder="Type your answer..."
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 text-gray-700 bg-transparent transition-colors"
              />
            </motion.div>
          ))}

          <motion.button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-blue-700 active:scale-95 transition-transform duration-200 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Submit Answers</span>
            <IoSendSharp className="text-xl" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default FinishTheTypeContent;