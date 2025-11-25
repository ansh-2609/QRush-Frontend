import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nextQuestion, submitAnswer } from "../../store/imageQuizSlice";
import { FaHeart, FaRegHeart, FaArrowRight, FaHome } from "react-icons/fa";
import { setSubmitted } from "../../store/imageQuizSlice";

// const landmarkQuestions = [
//   {
//     id: 1,
//     image: "../../public/images/landmarks/EiffelTower.jpg",
//     correctAnswer: "Eiffel Tower",
//     options: ["Eiffel Tower", "Big Ben", "Statue of Liberty", "Colosseum"],
//     hint: "Located in Paris, France"
//   },
//   {
//     id: 2,
//     image: "../../public/images/landmarks/Statue-of-Liberty.jpg",
//     correctAnswer: "Statue of Liberty",
//     options: ["Christ the Redeemer", "Statue of Liberty", "Mount Rushmore", "The Thinker"],
//     hint: "Gift from France to the United States"
//   },
//   {
//     id: 3,
//     image: "../../public/images/landmarks/Great-Wall-of-China.jpg",
//     correctAnswer: "Great Wall of China",
//     options: ["Great Wall of China", "Hadrian's Wall", "Berlin Wall", "Western Wall"],
//     hint: "Longest wall in the world"
//   },
//   {
//     id: 4,
//     image: "../../public/images/landmarks/Taj-Mahal.jpg",
//     correctAnswer: "Taj Mahal",
//     options: ["Taj Mahal", "Hagia Sophia", "Saint Basil's Cathedral", "Notre Dame"],
//     hint: "White marble mausoleum in India"
//   },
//   {
//     id: 5,
//     image: "../../public/images/landmarks/Colosseum.jpg",
//     correctAnswer: "Colosseum",
//     options: ["Colosseum", "Pantheon", "Parthenon", "Roman Forum"],
//     hint: "Ancient amphitheater in Rome"
//   },
//   {
//     id: 6,
//     image: "../../public/images/landmarks/Pyramids-of-Giza.jpg",
//     correctAnswer: "Pyramids of Giza",
//     options: ["Pyramids of Giza", "Stonehenge", "Machu Picchu", "Petra"],
//     hint: "Ancient wonders in Egypt"
//   },
//   {
//     id: 7,
//     image: "../../public/images/landmarks/Sydney-Opera-House.jpg",
//     correctAnswer: "Sydney Opera House",
//     options: ["Sydney Opera House", "Guggenheim Museum", "Louvre", "Burj Al Arab"],
//     hint: "Famous performing arts center in Australia"
//   },
//   {
//     id: 8,
//     image: "../../public/images/landmarks/Machu-Picchu.jpg",
//     correctAnswer: "Machu Picchu",
//     options: ["Machu Picchu", "Chichen Itza", "Angkor Wat", "Easter Island"],
//     hint: "Inca citadel in Peru"
//   },
//   {
//     id: 9,
//     image: "../../public/images/landmarks/Christ-the-Redeemer.jpg",
//     correctAnswer: "Christ the Redeemer",
//     options: ["Christ the Redeemer", "Buddha Dordenma", "Spring Temple Buddha", "Ushiku Daibutsu"],
//     hint: "Large statue in Rio de Janeiro"
//   },
//   {
//     id: 10,
//     image: "../../public/images/landmarks/Petra.jpg",
//     correctAnswer: "Petra",
//     options: ["Petra", "Cappadocia", "Mesa Verde", "Alhambra"],
//     hint: "Rose-red city carved into rock in Jordan"
//   }
// ];

const IdentifyFromImgContent = () => {
  const imageQuizs = useSelector((store) => store.imageQuiz);
  console.log('imageQuizs', imageQuizs);
  console.log('currentQuestionIndex', imageQuizs.currentQuestionIndex);
  const subcategory = imageQuizs.subcategory;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [usedHint, setUsedHint] = useState(false);


  const options = [
    imageQuizs.questions[imageQuizs.currentQuestionIndex]?.option1,
    imageQuizs.questions[imageQuizs.currentQuestionIndex]?.option2,
    imageQuizs.questions[imageQuizs.currentQuestionIndex]?.option3,
    imageQuizs.questions[imageQuizs.currentQuestionIndex]?.option4,
  ];

  const handleAnswerSelect = (answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    const correct = answer === imageQuizs.questions[imageQuizs.currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      // setScore(imageQuizs.score + (usedHint ? 5 : 10));
      dispatch(submitAnswer(imageQuizs.score + (usedHint ? 5 : 10)));
    } else {
      setLives(lives - 1);
    }
  };

  function capitalizeFirstLetter(subcategory) {
    return subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
  }

  const handleNextQuestion = () => {
    setSelectedAnswer("");
    setShowResult(false);
    setIsCorrect(false);
    setUsedHint(false);

    if (imageQuizs.currentQuestionIndex < imageQuizs.questions.length - 1 && lives > 0) {
      dispatch(nextQuestion());
    } else {
      // Game over or quiz completed
      dispatch(setSubmitted(true));
      handleGameOver();
    }
  };

  const handleUseHint = () => {
    if (!usedHint) {
      setUsedHint(true);
    }
  };

  const handleGameOver = () => {
    navigate('/quiz-type/identify/landmarks/result', { 
      state: { 
        score: imageQuizs.score,
        totalQuestions: imageQuizs.questions.length,
        quizType: `Identify the ${capitalizeFirstLetter(subcategory)}`,
        livesRemaining: lives
      }
    });
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  // Check if game over due to no lives
  useEffect(() => {
    if (lives <= 0) {
      setTimeout(handleGameOver, 1500);
    }
  }, [lives]);

  if (lives <= 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg max-w-md">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Game Over!</h2>
          <p className="text-gray-600 mb-4">You've run out of lives!</p>
          <p className="text-2xl font-bold text-gray-800 mb-6">Final Score: {score}</p>
          <button
            onClick={handleHomeClick}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <FaHome className="text-gray-600" />
            <span className="text-gray-700">Home</span>
          </button>

          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Identify the {capitalizeFirstLetter(subcategory)}
            </h1>
            <p className="text-gray-600 mt-2">
              Question { imageQuizs.currentQuestionIndex + 1} of {imageQuizs.questions.length}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Lives */}
            <div className="flex items-center gap-2">
              {[...Array(3)].map((_, index) => (
                <span key={index}>
                  {index < lives ? (
                    <FaHeart className="text-sky-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-300 text-xl" />
                  )}
                </span>
              ))}
            </div>

            {/* Score */}
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              <span className="text-gray-700 font-semibold">Score: </span>
              <span className="text-amber-600 font-bold">{imageQuizs.score}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-gradient-to-r from-sky-500 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${
                ((imageQuizs.currentQuestionIndex + 1) / imageQuizs.questions.length) * 100
              }%`,
            }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image */}
          {/* <div className="relative max-w-[600px] max-h-[400px] overflow-hidden rounded-2xl">
            <img
              src={currentQuestion.image}
              alt="Landmark to identify"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentQuestionIndex + 1}/{landmarkQuestions.length}
            </div>
          </div> */}

          <div className="relative bg-gray-100 py-12">
            <div className="max-w-md mx-auto aspect-video bg-white shadow-md rounded-lg overflow-hidden border-2">
              <img
                src={imageQuizs.questions[imageQuizs.currentQuestionIndex].image}
                alt="Flag to identify"
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {imageQuizs.currentQuestionIndex + 1}/{imageQuizs.questions.length}
            </div>
          </div>

          {/* Hint */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                {usedHint
                  ? imageQuizs.questions[imageQuizs.currentQuestionIndex].hint
                  : "Can you identify this famous landmark?"}
              </p>
              <button
                onClick={handleUseHint}
                disabled={usedHint}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  usedHint
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-amber-500 text-white hover:bg-amber-600"
                }`}
              >
                {usedHint ? "Hint Used" : "Use Hint"}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className={`p-4 text-left rounded-xl border-2 font-semibold transition-all duration-300 ${
                    showResult
                      ? option === imageQuizs.questions[imageQuizs.currentQuestionIndex].correctAnswer
                        ? "bg-green-100 border-green-500 text-green-700"
                        : option === selectedAnswer
                        ? "bg-red-100 border-red-500 text-red-700"
                        : "bg-gray-100 border-gray-200 text-gray-600"
                      : "bg-white border-gray-200 text-gray-700 hover:border-amber-500 hover:bg-amber-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Result Feedback */}
            {showResult && (
              <div
                className={`mt-6 p-4 rounded-xl text-center ${
                  isCorrect
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <p className="text-lg font-semibold mb-2">
                  {isCorrect ? "🎉 Correct! Well done!" : "❌ Incorrect!"}
                </p>
                <p className="text-sm">
                  {isCorrect
                    ? `You earned ${usedHint ? "5" : "10"} points!`
                    : `The correct answer is: ${imageQuizs.questions[imageQuizs.currentQuestionIndex].correctAnswer}`}
                </p>
              </div>
            )}

            {/* Next Button */}
            {showResult && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
                >
                  {imageQuizs.currentQuestionIndex < imageQuizs.questions.length - 1
                    ? "Next Question"
                    : "See Results"}
                  <FaArrowRight />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            Select the correct name for the landmark shown in the image. Use
            hints wisely - they reduce your points!
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdentifyFromImgContent;