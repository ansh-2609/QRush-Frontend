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

const IslandMysteryGame = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [solvedPuzzles, setSolvedPuzzles] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [timer, setTimer] = useState(0);

  const islandPuzzles = [
    {
      id: 1,
      title: "The Compass Stone",
      scenario:
        "A stone compass shows: North → East, East → South, South → West, West → ?. Complete the pattern.",
      clues: ["The directions rotate clockwise.", "After West comes North again."],
      answer: "north",
      solution: "Clockwise order repeats: N → E → S → W → N.",
      hint: "Think of a full 360° rotation.",
      difficulty: "Easy",
      theme: "island",
    },
    {
      id: 2,
      title: "The Pirate’s Coordinates",
      scenario:
        "A map says: 'Start from X(2,3). Move North by 4 and East by 2.' What are your new coordinates?",
      clues: ["Moving North increases Y; East increases X.", "(2+2, 3+4)."],
      answer: "4,7",
      solution: "New coordinates = (4,7).",
      hint: "Adjust both X and Y directions correctly.",
      difficulty: "Medium",
      theme: "island",
    },
    {
      id: 3,
      title: "The Mirror Map",
      scenario:
        "A mysterious mirror reflects a map showing 'EAST' as 'TSAE'. If 'NORTH' is reflected, what will it show?",
      clues: [
        "A mirror reverses left and right.",
        "Reverse the letters of 'NORTH'.",
      ],
      answer: "HTRON",
      solution: "'NORTH' reversed becomes 'HTRON'.",
      hint: "Imagine reading it in a mirror.",
      difficulty: "Medium",
      theme: "island",
    },
    {
      id: 4,
      title: "The Ancient Statue",
      scenario:
        "Three eyes glow: red, green, and blue. A riddle says 'Mix them to see the truth'.",
      clues: ["Red + Green + Blue (light) = White."],
      answer: "white",
      solution: "RGB mixing of light = White.",
      hint: "Think of additive color mixing (light, not paint).",
      difficulty: "Medium",
      theme: "island",
    },
    {
      id: 5,
      title: "The Sun Dial Puzzle",
      scenario:
        "At sunrise, the shadow points West. At noon, it disappears. At sunset, it points ?. Complete the sequence.",
      clues: [
        "The sun rises in the East and sets in the West.",
        "Shadow direction is opposite to the Sun.",
      ],
      answer: "east",
      solution: "At sunset (Sun in West), shadow points East.",
      hint: "Shadow always points opposite to sunlight.",
      difficulty: "Medium",
      theme: "island",
    },
    {
      id: 6,
      title: "The Coconut Code",
      scenario:
        "Coconut shells are arranged: 🥥🥥🥥 = 9, 🥥🥥 = 6, 🥥 = ?. Find the value of one shell.",
      clues: ["Each 🥥 adds 3.", "🥥 = 3."],
      answer: "3",
      solution: "🥥 + 🥥 + 🥥 = 9 → 🥥 = 3.",
      hint: "Look for equal sharing among symbols.",
      difficulty: "Easy",
      theme: "island",
    },
    {
      id: 7,
      title: "The Treasure Riddle",
      scenario:
        "You dig 4 steps East, 3 South, 4 West, and 3 North. Where are you now relative to the starting point?",
      clues: [
        "East-West cancel out, North-South cancel out.",
        "You return to your starting position.",
      ],
      answer: "same place",
      solution: "Total displacement = 0. Back to start.",
      hint: "Add opposite directions together.",
      difficulty: "Medium",
      theme: "island",
    },
    {
      id: 8,
      title: "The Crystal Reflection",
      scenario:
        "A triangle marked A–B–C (clockwise) is seen in a mirror. What is the new vertex order?",
      clues: [
        "A mirror reverses the orientation.",
        "Clockwise becomes counterclockwise.",
      ],
      answer: "A–C–B",
      solution: "Reflected triangle reverses order → A–C–B.",
      hint: "Mirrors flip direction of rotation.",
      difficulty: "Hard",
      theme: "island",
    },
    {
      id: 9,
      title: "The Message in the Bottle",
      scenario: "The bottle has a note: 'Shift each letter by +2'. Decode: 'DOG'.",
      clues: ["Shift D→F, O→Q, G→I.", "Use simple Caesar cipher."],
      answer: "fqi",
      solution: "'DOG' shifted +2 becomes 'FQI'.",
      hint: "Each letter moves forward in the alphabet.",
      difficulty: "Medium",
      theme: "island",
    },
    {
      id: 10,
      title: "The Shell Sequence",
      scenario:
        "You find shells arranged: 1, 1, 2, 3, 5, ?. The inscription says 'The pattern continues'.",
      clues: ["Each term = sum of previous two."],
      answer: "8",
      solution: "Next number after 5 = 3+5 = 8.",
      hint: "It’s the Fibonacci sequence.",
      difficulty: "Easy",
      theme: "island",
    },
  ];

  // Timer
  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🏝️</div>
          <h1 className="text-3xl font-bold text-green-800 mb-4">
            You Escaped the Island!
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            You solved all {islandPuzzles.length} puzzles!
          </p>
          <p className="text-xl font-semibold text-green-600 mb-4">
            Time: {formatTime(timer)}
          </p>
          <button
            onClick={resetGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <FaRedo className="inline mr-2" />
            Play Again
          </button>
        </div>
      </div>
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
              <FaCompass className="mr-3 text-green-500" /> Escape Room 3: The Island Mystery
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
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-all transform hover:scale-105"
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
