
import QuestionCard from "./QuestionCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nextQuestion, setFinished, submitAnswer } from "../../store/quizSlice";
import QuizFinished from "./QuizFinished";

const CategoryContent = () => {
  const quizs = useSelector((store) => store.quiz);
  const category = quizs.category;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  useEffect(() => { 
    if (quizs.questions.length === 0) {
      navigate("/categories");
    }
  }, [quizs.questions, navigate]);

  
  if (quizs.questions.length === 0) {
    return null; 
  }

  return (
    <>
      {quizs.isFinished ? (
        <QuizFinished
          score={quizs.score}
          totalQuestions={quizs.questions.length}
          onRestart={() => {}}
          onHome={() => {}}
        />
      ) : (
        <QuestionCard
          question={quizs.questions[quizs.currentQuestionIndex]}
          onAnswer={(choice) => {
            dispatch(submitAnswer(choice));
            if (quizs.currentQuestionIndex < quizs.questions.length - 1) {
              setTimeout(() => {
                dispatch(nextQuestion());
              }, 500);
            } else {
              dispatch(setFinished(true));
            }
          }}
          current={quizs.currentQuestionIndex}
          total={quizs.questions.length}
          category={category}
        />
      )}
    </>
  );
};

export default CategoryContent;
