import { useState, useEffect } from "react";
import {
  FaLock,
  FaUnlock,
  FaLightbulb,
  FaCompass,
  FaClock,
  FaRedo,
  FaArrowLeft,
  FaBook,
  FaSearch,
} from "react-icons/fa";
import QuizFinished from "./QuizFinished";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IslandMysteryGame = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [solvedPuzzles, setSolvedPuzzles] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [timer, setTimer] = useState(0);

  const islandPuzzles = useSelector((store) => store.escapeRoom.questions);
  const navigate = useNavigate();

  useEffect(() => { 
    if (islandPuzzles.length === 0) {
      navigate("/quiz-type/escape-rooms");
    }
  }, [islandPuzzles, navigate]);

  
  if (islandPuzzles.length === 0) {
    return null; 
  }
 // Timer
  useEffect(() => {
    if (gameStatus === "completed") return; 
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [gameStatus]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const checkAnswer = () => {
    const puzzle = islandPuzzles[currentPuzzle];
    setAttempts((a) => a + 1);

    if (userAnswer.trim().toLowerCase() === puzzle.answer.toLowerCase()) {
      setSolvedPuzzles((s) => [...s, puzzle.id]);
      if (currentPuzzle === islandPuzzles.length - 1) {
        setGameStatus("completed");
      } else {
        setCurrentPuzzle((p) => p + 1);
        setUserAnswer("");
        setShowHint(false);
        setAttempts(0);
      }
    } else {
      const input = document.getElementById("answer-input");
      input.classList.add("shake");
      setTimeout(() => input.classList.remove("shake"), 500);
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
      setCurrentPuzzle((p) => p - 1);
      setUserAnswer("");
      setShowHint(false);
      setAttempts(0);
    }
  };

  if (gameStatus === "completed") {
    return (
      <QuizFinished
        totalPuzzles={islandPuzzles.length}
        timer={timer}
        formatTime={formatTime}
        resetGame={resetGame}
      />
    );
  }

  const puzzle = islandPuzzles[currentPuzzle];
  const progress = (currentPuzzle / islandPuzzles.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-yellow-50 to-emerald-100 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaCompass className="mr-3 text-green-500" /> Escape Room 2: The Island Mystery
            </h1>
            <div className="text-right space-y-1">
              <div className="flex items-center text-gray-600">
                <FaClock className="mr-2" />
                Time: {formatTime(timer)}
              </div>
              <div className="text-sm text-gray-500">
                Puzzle {currentPuzzle + 1} / {islandPuzzles.length}
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
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
                <div
                  key={i}
                  className="bg-green-50 border-l-4 border-green-400 p-3 rounded-r-lg"
                >
                  <span className="text-green-700">{clue}</span>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4 transition-all"
            />

            <div className="flex gap-3">
              <button
                onClick={checkAnswer}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white cursor-pointer font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-all transform hover:scale-105"
              >
                <FaUnlock className="mr-2" /> Submit
              </button>
              <button
                onClick={() => setShowHint(!showHint)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer font-semibold py-3 px-4 rounded-lg flex items-center justify-center"
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
                {islandPuzzles.map((p, i) => (
                  <div
                    key={p.id}
                    className={`aspect-square rounded-lg flex items-center justify-center font-bold text-white ${
                      solvedPuzzles.includes(p.id)
                        ? "bg-green-500"
                        : i === currentPuzzle
                        ? "bg-yellow-500"
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
                  className="w-full bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white cursor-pointer py-2 px-4 rounded-lg flex items-center justify-center disabled:cursor-not-allowed"
                >
                  <FaArrowLeft className="mr-2" /> Previous
                </button>
                <button
                  onClick={resetGame}
                  className="w-full bg-red-500 hover:bg-red-600 text-white cursor-pointer py-2 px-4 rounded-lg flex items-center justify-center"
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
                  {solvedPuzzles.length}/{islandPuzzles.length}
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

      <style jsx>{`
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

export default IslandMysteryGame;
