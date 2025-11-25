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

const EscapeRoomGame = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [solvedPuzzles, setSolvedPuzzles] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing"); // playing, completed
  const [timer, setTimer] = useState(0);

  const escapePuzzles = [
    {
      id: 1,
      type: "digital-escape",
      scenario:
        "You're locked in a digital library. Find the passcode to escape!",
      clues: [
        "Books are arranged by publication year: 1984, 2001, 2020...",
        "A note says: 'The code is the missing year'",
        "Pattern: 1984 (+17) → 2001 (+19) → 2020 (+?) → ?",
      ],
      answer: "2041",
      solution: "Pattern: +17, +19, +21 → 2020 + 21 = 2041",
      hint: "Look at the difference between consecutive numbers",
      difficulty: "Easy",
      theme: "library",
    },
    {
      id: 2,
      type: "ancient-temple",
      scenario:
        "You've discovered an ancient temple. Decode the hieroglyphs to proceed!",
      clues: [
        "Hieroglyphs: 🐍 = 3, 🌞 = 5, 🏺 = 7",
        "Equation: 🐍 + 🌞 × 🏺 = ?",
        "Remember order of operations!",
      ],
      answer: "38",
      solution: "3 + (5 × 7) = 3 + 35 = 38",
      hint: "Multiplication before addition",
      difficulty: "Easy",
      theme: "temple",
    },
    {
      id: 3,
      type: "cyber-lab",
      scenario: "The AI has locked you in the server room. Hack the system!",
      clues: [
        "Binary sequence: 1010, 1100, 1110, ?",
        "Each number increases by 2 in decimal",
        "Convert the pattern to decimal",
      ],
      answer: "10000",
      solution: "10, 12, 14, 16 → 16 in binary is 10000",
      hint: "Convert to decimal first, then back to binary",
      difficulty: "Medium",
      theme: "cyber",
    },
    {
      id: 4,
      type: "time-machine",
      scenario: "The time machine is malfunctioning! Fix the coordinates.",
      clues: [
        "Current date: 2024-03-15",
        "You need to go to: 2030-07-20",
        "Difference in days is the code",
      ],
      answer: "2319",
      solution: "6 years, 4 months, 5 days = 2319 days",
      hint: "Calculate total days between dates",
      difficulty: "Medium",
      theme: "time",
    },
    {
      id: 5,
      type: "art-gallery",
      scenario: "You're trapped in an art gallery. Solve the color puzzle!",
      clues: [
        "RGB colors: Red(255,0,0), Green(0,255,0), Blue(0,0,255)",
        "Yellow = Red + Green = (255,255,0)",
        "What color is (255,0,255)? Use first 3 letters",
      ],
      answer: "mag",
      solution: "RGB(255,0,255) = Magenta → 'mag'",
      hint: "Mix red and blue in RGB color model",
      difficulty: "Easy",
      theme: "art",
    },
    {
      id: 6,
      type: "space-station",
      scenario: "Emergency lockdown on the space station! Override required.",
      clues: [
        "Planets from Sun: 1. Mercury, 2. Venus, 3. Earth...",
        "Take the 4th and 7th planet positions",
        "Multiply them together",
      ],
      answer: "28",
      solution: "4th planet: Mars (4), 7th planet: Uranus (7) → 4 × 7 = 28",
      hint: "Count planets from the Sun in order",
      difficulty: "Medium",
      theme: "space",
    },
    {
      id: 7,
      type: "bank-vault",
      scenario: "The bank vault closed early! Crack the security code.",
      clues: [
        "Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13...",
        "Take the 10th number in the sequence",
        "Multiply by the 5th number",
      ],
      answer: "255",
      solution: "10th Fibonacci: 55, 5th Fibonacci: 5 → 55 × 5 = 275",
      hint: "Continue the Fibonacci sequence",
      difficulty: "Hard",
      theme: "bank",
    },
    {
      id: 8,
      type: "submarine",
      scenario: "You're trapped in a submarine! Solve the pressure equation.",
      clues: [
        "Depth: 100m = 10 atmospheres",
        "Each 10m adds 1 atmosphere",
        "At 250m, how many atmospheres? Add 1 for sea level",
      ],
      answer: "26",
      solution: "250m ÷ 10 = 25 atmospheres + 1 = 26",
      hint: "Don't forget to add the surface atmosphere",
      difficulty: "Medium",
      theme: "ocean",
    },
    {
      id: 9,
      type: "castle-dungeon",
      scenario:
        "The castle dungeon has sealed shut! Solve the knight's riddle.",
      clues: [
        "Knights say: '2 of us always lie, 1 always tells truth'",
        "Knight A: 'B is truthful'",
        "Knight B: 'C is a liar'",
        "Knight C: 'I am truthful'",
        "How many liars? (number)",
      ],
      answer: "2",
      solution: "A lies, B tells truth, C lies → 2 liars",
      hint: "Test each scenario to find consistency",
      difficulty: "Hard",
      theme: "castle",
    },
    {
      id: 10,
      type: "final-escape",
      scenario: "This is the final challenge! Combine all your knowledge.",
      clues: [
        "Previous codes: 2041, 38, 10000, 2319, mag, 28, 255, 26, 2",
        "Take the first digit of each code in order",
        "Convert letters to their position in alphabet (a=1, b=2...)",
        "Sum them all together",
      ],
      answer: "29", // This makes sense with m=13
      solution: "2 + 3 + 1 + 2 + 13(m=13) + 2 + 2 + 2 + 2 = 29",
      hint: "m is the 13th letter of the alphabet",
      difficulty: "Hard",
      theme: "final",
    },
  ];

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const checkAnswer = () => {
    const puzzle = escapePuzzles[currentPuzzle];
    setAttempts((prev) => prev + 1);

    if (userAnswer.trim().toLowerCase() === puzzle.answer.toLowerCase()) {
      // Correct answer
      setSolvedPuzzles((prev) => [...prev, puzzle.id]);

      if (currentPuzzle === escapePuzzles.length - 1) {
        setGameStatus("completed");
      } else {
        setCurrentPuzzle((prev) => prev + 1);
        setUserAnswer("");
        setShowHint(false);
        setAttempts(0);
      }
    } else {
      // Wrong answer - shake animation trigger
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
      setCurrentPuzzle((prev) => prev - 1);
      setUserAnswer("");
      setShowHint(false);
      setAttempts(0);
    }
  };

  if (gameStatus === "completed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-green-800 mb-4">
            Escape Successful!
          </h1>
          <div className="space-y-3 mb-6">
            <p className="text-lg text-gray-700">
              You solved all {escapePuzzles.length} puzzles!
            </p>
            <p className="text-xl font-semibold text-green-600">
              Time: {formatTime(timer)}
            </p>
            <p className="text-lg text-gray-700">
              Total Attempts:{" "}
              {attempts + solvedPuzzles.reduce((acc, curr) => acc + 1, 0)}
            </p>
          </div>
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

  const puzzle = escapePuzzles[currentPuzzle];
  const progress = (currentPuzzle / escapePuzzles.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaLock className="mr-3 text-red-500" />
              Escape Room Challenge
            </h1>
            <div className="text-right space-y-1">
              <div className="flex items-center text-gray-600">
                <FaClock className="mr-2" />
                Time: {formatTime(timer)}
              </div>
              <div className="text-sm text-gray-500">
                Puzzle {currentPuzzle + 1} of {escapePuzzles.length}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Puzzle Area */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Puzzle Header */}
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
                  <h2 className="text-xl font-bold text-gray-800 mt-2">
                    {puzzle.scenario}
                  </h2>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Attempts</div>
                  <div className="text-2xl font-bold text-red-500">
                    {attempts}
                  </div>
                </div>
              </div>

              {/* Clues */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-700 flex items-center">
                  <FaSearch className="mr-2" />
                  Clues:
                </h3>
                {puzzle.clues.map((clue, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg"
                  >
                    <div className="flex items-start">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-gray-700">{clue}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="answer-input"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Answer:
                  </label>
                  <input
                    id="answer-input"
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                    placeholder="Enter the code or answer..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={checkAnswer}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center cursor-pointer"
                  >
                    <FaUnlock className="mr-2" />
                    Submit Answer
                  </button>

                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer"
                  >
                    <FaLightbulb className="mr-2" />
                    Hint
                  </button>
                </div>

                {showHint && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <div className="flex items-start">
                      <FaLightbulb className="text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                      <p className="text-yellow-800">{puzzle.hint}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                <FaBook className="mr-2" />
                Solved Puzzles
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {escapePuzzles.map((puzzle, index) => (
                  <div
                    key={puzzle.id}
                    className={`aspect-square rounded-lg flex items-center justify-center text-white font-bold ${
                      solvedPuzzles.includes(puzzle.id)
                        ? "bg-green-500"
                        : index === currentPuzzle
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-700 mb-4">Navigation</h3>
              <div className="space-y-3">
                <button
                  onClick={goToPreviousPuzzle}
                  disabled={currentPuzzle === 0}
                  className="w-full bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:cursor-not-allowed cursor-pointer"
                >
                  <FaArrowLeft className="mr-2" />
                  Previous Puzzle
                </button>

                <button
                  onClick={resetGame}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center cursor-pointer"
                >
                  <FaRedo className="mr-2" />
                  Restart Game
                </button>
              </div>
            </div>

            {/* Current Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-700 mb-3">
                Current Status
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Solved:</span>
                  <span className="font-semibold">
                    {solvedPuzzles.length}/{escapePuzzles.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Attempts:</span>
                  <span className="font-semibold text-red-500">{attempts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Theme:</span>
                  <span className="font-semibold capitalize">
                    {puzzle.theme}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .shake {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default EscapeRoomGame;
