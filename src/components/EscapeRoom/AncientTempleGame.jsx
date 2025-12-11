import { useState, useEffect } from "react";
import {
  FaLock,
  FaUnlock,
  FaLightbulb,
  FaBook,
  FaClock,
  FaSearch,
  FaArrowLeft, 
  FaRedo,
} from "react-icons/fa";
import QuizFinished from "./QuizFinished";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AncientTempleGame = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [solvedPuzzles, setSolvedPuzzles] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [timer, setTimer] = useState(0);

  const templePuzzles = useSelector((store) => store.escapeRoom.questions);
  const navigate = useNavigate();   

  useEffect(() => { 
    if (templePuzzles.length === 0) {
      navigate("/quiz-type/escape-rooms");
    }
  }, [templePuzzles, navigate]);

  
  if (templePuzzles.length === 0) {
    return null; 
  }

  // Timer
  useEffect(() => {
    if (gameStatus === "completed") return; 
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [gameStatus]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const puzzle = templePuzzles[currentPuzzle];
  const progress = (currentPuzzle / templePuzzles.length) * 100;

  const checkAnswer = () => {
    setAttempts((a) => a + 1);
    if (userAnswer.trim().toLowerCase() === puzzle.answer.toLowerCase()) {
      setSolvedPuzzles((prev) => [...prev, puzzle.id]);
      if (currentPuzzle === templePuzzles.length - 1) {
        setGameStatus("completed");
      } else {
        setCurrentPuzzle((i) => i + 1);
        setUserAnswer("");
        setShowHint(false);
        setAttempts(0);
      }
    } else {
      const input = document.getElementById("answer-input");
      input.classList.add("shake");
      setTimeout(() => input.classList.remove("shake"), 400);
    }
  };

  const resetGame = () => {
    setCurrentPuzzle(0);
    setUserAnswer("");
    setShowHint(false);
    setSolvedPuzzles([]);
    setAttempts(0);
    setGameStatus("playing");
    setTimer(0);
  };

  const goToPreviousPuzzle = () => {
    if (currentPuzzle > 0) {
      setCurrentPuzzle((i) => i - 1);
      setUserAnswer("");
      setShowHint(false);
      setAttempts(0);
    }
  };

  if (gameStatus === "completed") {
    return (
      <QuizFinished
        totalPuzzles={templePuzzles.length}
        timer={timer}
        formatTime={formatTime}
        resetGame={resetGame}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaLock className="mr-3 text-amber-500" /> Escape Room: The Ancient Temple
            </h1>
            <div className="text-right space-y-1">
              <div className="flex items-center text-gray-600">
                <FaClock className="mr-2" />
                Time: {formatTime(timer)}
              </div>
              <div className="text-sm text-gray-500">
                Puzzle {currentPuzzle + 1} / {templePuzzles.length}
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-amber-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Puzzle */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    puzzle.difficulty === "Easy"
                      ? "bg-green-100 text-green-800"
                      : puzzle.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {puzzle.difficulty}
                </span>
                <h2 className="text-xl font-bold text-gray-800 mt-2">{puzzle.title}</h2>
                <p className="text-gray-700 mt-2">{puzzle.scenario}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Attempts</div>
                <div className="text-2xl font-bold text-red-500">{attempts}</div>
              </div>
            </div>

            {/* Clues */}
            <h3 className="font-semibold text-gray-700 flex items-center mb-2">
              <FaSearch className="mr-2" /> Clues:
            </h3>
            <div className="space-y-3 mb-6">
              {puzzle.clues.map((clue, i) => (
                <div key={i} className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-lg">
                  <span className="text-amber-700">{clue}</span>
                </div>
              ))}
            </div>

            {/* Input */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Answer:
            </label>
            <input
              id="answer-input"
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
              placeholder="Enter your answer..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent mb-4 transition-all"
            />

            <div className="flex gap-3">
              <button
                onClick={checkAnswer}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center cursor-pointer transition-all transform hover:scale-105"
              >
                <FaUnlock className="mr-2" /> Submit
              </button>
              <button
                onClick={() => setShowHint(!showHint)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center cursor-pointer"
              >
                <FaLightbulb className="mr-2" /> Hint
              </button>
            </div>

            {showHint && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mt-4">
                <FaLightbulb className="text-yellow-500 mr-3 inline" />
                <span className="text-yellow-800">{puzzle.hint}</span>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                <FaBook className="mr-2" /> Progress
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {templePuzzles.map((p, i) => (
                  <div
                    key={p.id}
                    className={`aspect-square rounded-lg flex items-center justify-center font-bold text-white ${
                      solvedPuzzles.includes(p.id)
                        ? "bg-green-500"
                        : i === currentPuzzle
                        ? "bg-amber-500"
                        : "bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-700 mb-3">Controls</h3>
              <div className="space-y-3">
                <button
                  onClick={goToPreviousPuzzle}
                  disabled={currentPuzzle === 0}
                  className="w-full bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg flex items-center justify-center disabled:cursor-not-allowed cursor-pointer"
                >
                  <FaArrowLeft className="mr-2" /> Previous
                </button>
                <button
                  onClick={resetGame}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center cursor-pointer"
                >
                  <FaRedo className="mr-2" /> Restart
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 text-sm">
              <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
              <div className="flex justify-between">
                <span>Solved:</span>
                <span>
                  {solvedPuzzles.length}/{templePuzzles.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Attempts:</span>
                <span className="text-red-500">{attempts}</span>
              </div>
              <div className="flex justify-between">
                <span>Theme:</span>
                <span className="capitalize">{puzzle.theme}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .shake {
          animation: shake 0.4s;
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-8px);
          }
          75% {
            transform: translateX(8px);
          }
        }
      `}</style>
    </div>
  );
};

export default AncientTempleGame;
