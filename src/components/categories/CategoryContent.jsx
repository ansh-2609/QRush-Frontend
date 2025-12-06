import QuestionCard from "./QuestionCard";
import { useSelector } from "react-redux";
import { nextQuestion, setFinished, submitAnswer } from "../../store/quizSlice";
import { useDispatch } from "react-redux";
import QuizFinished from "./QuizFinished";

const CategoryContent = () => {
  const quizs = useSelector((store) => store.quiz);
  const category = useSelector((store) => store.quiz.category);

  const dispatch = useDispatch();

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
              }, 500); // delay so user sees click
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
