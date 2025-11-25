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

const AncientTempleGame = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [solvedPuzzles, setSolvedPuzzles] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [timer, setTimer] = useState(0);

  const templePuzzles = [
    {
      id: 1,
      title: "The Stone Symbols",
      scenario: "You find a wall engraved with four glowing symbols: 🌞 🌙 🌟 🔥. A carving reads, 'Light guides the worthy.'",
      clues: [
        "The inscription mentions 'light'.",
        "Which of these symbols represents the source of daylight?",
      ],
      answer: "sun",
      solution: "The Sun (🌞) symbolizes light — the first symbol to press.",
      hint: "It shines in the sky each day.",
      difficulty: "Easy",
      theme: "temple",
    },
    {
      id: 2,
      title: "The Path of Shadows",
      scenario: "Three doors stand ahead: Past, Present, and Future. A mural shows the sun casting a shadow behind a figure.",
      clues: [
        "A shadow is a remnant of what has already occurred.",
        "The sun is behind the figure — just like the past.",
      ],
      answer: "past",
      solution: "The mural implies the 'Past' door is correct.",
      hint: "The shadow points backward.",
      difficulty: "Easy",
      theme: "temple",
    },
    {
      id: 3,
      title: "The Number Stones",
      scenario: "Three stones read: 1984, 2001, 2020. The fourth stone is blank. The inscription says: 'The wisdom of time grows by 17, 19, 21…'",
      clues: [
        "The differences are +17 and +19.",
        "Add +21 to the last number.",
      ],
      answer: "2041",
      solution: "1984 + 17 = 2001, 2001 + 19 = 2020, 2020 + 21 = 2041.",
      hint: "Continue the pattern of increasing gaps.",
      difficulty: "Medium",
      theme: "temple",
    },
    {
      id: 4,
      title: "The Sacred Equation",
      scenario: "Hieroglyphs on the wall: 🐍 = 3, 🌞 = 5, 🏺 = 7. Below it reads: 🐍 + 🌞 × 🏺 = ?",
      clues: [
        "Remember: multiplication before addition.",
        "🐍 + (🌞 × 🏺)",
      ],
      answer: "38",
      solution: "3 + (5 × 7) = 3 + 35 = 38.",
      hint: "Follow standard math order.",
      difficulty: "Medium",
      theme: "temple",
    },
    {
      id: 5,
      title: "The Guardian’s Riddle",
      scenario: "A statue speaks: 'I am taken from a mine, locked in a wooden case, never released unless you break me. What am I?'",
      clues: [
        "Used for writing on papyrus.",
        "Dark in color, fragile.",
      ],
      answer: "pencil lead",
      solution: "The answer is pencil lead (graphite).",
      hint: "It’s inside every writing stick.",
      difficulty: "Medium",
      theme: "temple",
    },
    {
      id: 6,
      title: "The Sand Timer",
      scenario: "An ancient hourglass drips sand. You notice that when it’s half empty, 5 minutes have passed. How long does it take to fully empty?",
      clues: [
        "Half = 5 minutes.",
        "Full = double the time of half.",
      ],
      answer: "10",
      solution: "It takes 10 minutes for all the sand to fall.",
      hint: "Double it.",
      difficulty: "Easy",
      theme: "temple",
    },
    {
      id: 7,
      title: "The Four Statues",
      scenario: "Four statues face different directions — North, South, East, West. A clue reads: 'The one who faces the rising sun guards the way.'",
      clues: [
        "The sun rises in the East.",
        "Follow the guardian of dawn.",
      ],
      answer: "east",
      solution: "The statue facing East marks the exit.",
      hint: "Where does the sun rise?",
      difficulty: "Easy",
      theme: "temple",
    },
    {
      id: 8,
      title: "The Sacred Code",
      scenario: "You see an engraving: I = 1, V = 5, X = 10, L = 50. The text below says 'XL + IX = ?'.",
      clues: [
        "XL = 40, IX = 9.",
        "40 + 9 = ?",
      ],
      answer: "49",
      solution: "In Roman numerals, XLIX = 49.",
      hint: "Convert to numbers first.",
      difficulty: "Medium",
      theme: "temple",
    },
    {
      id: 9,
      title: "The Echo Chamber",
      scenario: "You shout your name and hear it echo 3 times, each quieter. The last echo fades after 6 seconds. How long between each echo?",
      clues: [
        "3 echoes, total delay = 6 seconds.",
        "The gap between echoes is equal.",
      ],
      answer: "2",
      solution: "6 ÷ 3 = 2 seconds apart.",
      hint: "Divide total time by number of echoes.",
      difficulty: "Medium",
      theme: "temple",
    },
    {
      id: 10,
      title: "The Golden Lock",
      scenario: "The final gate has a code panel. Symbols glow: 🌞 (1), 🌙 (2), 🌟 (3). The inscription reads: 'Multiply the first two, add the third, and double the result.'",
      clues: [
        "(1 × 2) + 3 = ?",
        "Then double your total.",
      ],
      answer: "10",
      solution: "(1 × 2) + 3 = 5, then doubled = 10.",
      hint: "Follow the steps in order.",
      difficulty: "Medium",
      theme: "temple",
    },
  ];

  // Timer
  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🏺</div>
          <h1 className="text-3xl font-bold text-amber-800 mb-2">
            You Escaped the Ancient Temple!
          </h1>
          <p className="text-gray-700 mb-4">
            You solved all {templePuzzles.length} puzzles!
          </p>
          <p className="text-xl font-semibold text-amber-600 mb-6">
            Time: {formatTime(timer)}
          </p>
          <button
            onClick={resetGame}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <FaRedo className="inline mr-2" />
            Play Again
          </button>
        </div>
      </div>
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
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-all transform hover:scale-105"
              >
                <FaUnlock className="mr-2" /> Submit
              </button>
              <button
                onClick={() => setShowHint(!showHint)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center"
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
                  className="w-full bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg flex items-center justify-center disabled:cursor-not-allowed"
                >
                  <FaArrowLeft className="mr-2" /> Previous
                </button>
                <button
                  onClick={resetGame}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center"
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

export default AncientTempleGame;
