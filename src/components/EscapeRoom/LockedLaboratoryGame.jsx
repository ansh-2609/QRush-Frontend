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

const LockedLaboratoryGame = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [solvedPuzzles, setSolvedPuzzles] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [timer, setTimer] = useState(0);

  const labPuzzles = [
  {
    id: 1,
    title: "The Cryogenic Chamber",
    scenario:
      "A cryo-lock shows the code '–273'. Nearby, a note reads: 'At this temperature, motion stops.' What’s the unlock code word?",
    clues: [
      "–273°C is a special temperature in physics.",
      "It’s when atomic motion nearly ceases.",
      "Scientists call it 'absolute zero'.",
    ],
    answer: "absolute zero",
    solution: "–273°C = 0 Kelvin = Absolute Zero.",
    hint: "Think of the coldest possible temperature.",
    difficulty: "Medium",
    theme: "lab",
  },
  {
    id: 2,
    title: "The Glass Cylinder Riddle",
    scenario:
      "Three test tubes are labeled A, B, and C. A floats, B sinks, and C stays suspended in the middle. The password equals the word describing the *density of C* compared to the liquid.",
    clues: [
      "Floating → less dense.",
      "Sinking → more dense.",
      "Suspended → equal density.",
    ],
    answer: "equal",
    solution: "C’s density equals that of the liquid.",
    hint: "What condition makes an object neither sink nor float?",
    difficulty: "Medium",
    theme: "lab",
  },
  {
    id: 3,
    title: "The Coded Beakers",
    scenario:
      "Four beakers are labeled: H, He, Li, Be. A hidden code says: 'Combine their numbers.' Another clue says: 'Periodic table holds the key.'",
    clues: [
      "Atomic numbers: H=1, He=2, Li=3, Be=4.",
      "Maybe the password is the concatenation or sum.",
    ],
    answer: "1234",
    solution: "Reading atomic numbers in order: 1-2-3-4.",
    hint: "Don’t add, read them in sequence.",
    difficulty: "Medium",
    theme: "lab",
  },
  {
    id: 4,
    title: "The Broken Microscope",
    scenario:
      "The microscope’s lenses are numbered 10×, 20×, and 40×. The screen reads 'Combine for full power'. A note says: 'It’s a product, not a sum.'",
    clues: [
      "Total magnification = eyepiece × objective.",
      "Assume eyepiece is 10×, objective 40×.",
    ],
    answer: "400",
    solution: "10 × 40 = 400 total magnification.",
    hint: "Think multiplication of magnifying lenses.",
    difficulty: "Hard",
    theme: "lab",
  },
  {
    id: 5,
    title: "The Laser Alignment Puzzle",
  scenario:
    "You find a laser grid blocking the lab door. A nearby console says: 'Red reflects at 90°, Green passes straight, Blue refracts.' The control panel shows a pattern: 🔴🟩🔵🟩🔴. The passcode is the number of beams that reach the end without changing direction.",
  clues: [
    "Red reflects → changes direction.",
    "Green passes straight → unchanged.",
    "Blue refracts → changes direction.",
    "Only Green lasers go straight through.",
  ],
  answer: "2",
  solution: "Pattern: R(×), G(✓), B(×), G(✓), R(×) → Only 2 green beams go straight.",
  hint: "Count only the beams that do not change direction.",
  difficulty: "Medium",
  theme: "lab",
  },
  {
    id: 6,
    title: "The Chemical Weigh-In",
    scenario:
      "Three jars labeled 'Carbon', 'Oxygen', and 'CO₂'. Their labels read 12, 16, and __. The keypad expects the missing number.",
    clues: [
      "CO₂ = 1 Carbon + 2 Oxygen atoms.",
      "Atomic masses: 12 + (16×2).",
    ],
    answer: "44",
    solution: "12 + 32 = 44.",
    hint: "Add the atomic masses.",
    difficulty: "Hard",
    theme: "lab",
  },
  {
    id: 7,
    title: "The Time Freeze",
    scenario:
      "The lab clock stopped at '13:37'. A sticky note says 'It’s Leet time!'. The code expects a word.",
    clues: [
      "1337 in 'leet speak' means a word used by hackers.",
      "It reads as 'leet' or 'elite'.",
    ],
    answer: "elite",
    solution: "1337 → leet → elite.",
    hint: "Think internet 'leet' code.",
    difficulty: "Medium",
    theme: "lab",
  },
  {
    id: 8,
    title: "The Chemical Mirror",
    scenario:
      "On a mirror, you see a chemical formula that looks like 'COOH'. But reflected, it still reads 'HOOC'. The code is what chemists call this type of structure.",
    clues: [
      "It’s symmetric when reversed.",
      "COOH is a functional group that appears at both ends of some molecules.",
    ],
    answer: "carboxylic acid",
    solution: "COOH group → Carboxylic acid.",
    hint: "Think organic chemistry functional groups.",
    difficulty: "Hard",
    theme: "lab",
  },
  {
    id: 9,
    title: "The Lab Equation Lock",
    scenario:
      "The lock shows: (6 × 2) + (8 ÷ 4) – 3 = ? A note says: 'Order matters!'",
    clues: [
      "Follow PEMDAS: Multiply, Divide, Add, Subtract.",
      "(6×2)=12, (8÷4)=2, so 12+2–3.",
    ],
    answer: "11",
    solution: "12+2–3 = 11.",
    hint: "Respect the order of operations.",
    difficulty: "Medium",
    theme: "lab",
  },
  {
    id: 10,
    title: "The AI Control Panel",
    scenario:
      "The console says: 'Truth = 1, False = 0.' Then shows (1 AND 0) OR 1. You must type the resulting code.",
    clues: [
      "Evaluate logic gates: AND first, then OR.",
      "(1 AND 0) = 0 → (0 OR 1) = 1.",
    ],
    answer: "1",
    solution: "Logical result = 1.",
    hint: "Use Boolean logic rules.",
    difficulty: "Hard",
    theme: "lab",
  },
];


  // Timer
  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const puzzle = labPuzzles[currentPuzzle];
  const progress = (currentPuzzle / labPuzzles.length) * 100;

  const checkAnswer = () => {
    setAttempts((a) => a + 1);
    if (userAnswer.trim().toLowerCase() === puzzle.answer.toLowerCase()) {
      setSolvedPuzzles((prev) => [...prev, puzzle.id]);
      if (currentPuzzle === labPuzzles.length - 1) {
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
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🔬</div>
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            Lab Escape Successful!
          </h1>
          <p className="text-gray-700 mb-4">
            You solved all {labPuzzles.length} puzzles!
          </p>
          <p className="text-xl font-semibold text-blue-600 mb-6">
            Time: {formatTime(timer)}
          </p>
          <button
            onClick={resetGame}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <FaRedo className="inline mr-2" />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaLock className="mr-3 text-blue-500" /> Escape Room 2: The Locked Laboratory
            </h1>
            <div className="text-right space-y-1">
              <div className="flex items-center text-gray-600">
                <FaClock className="mr-2" />
                Time: {formatTime(timer)}
              </div>
              <div className="text-sm text-gray-500">
                Puzzle {currentPuzzle + 1} / {labPuzzles.length}
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
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
                      : "bg-yellow-100 text-yellow-800"
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
                <div key={i} className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                  <span className="text-blue-700">{clue}</span>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 transition-all"
            />

            <div className="flex gap-3">
              <button
                onClick={checkAnswer}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-all transform hover:scale-105"
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
                {labPuzzles.map((p, i) => (
                  <div
                    key={p.id}
                    className={`aspect-square rounded-lg flex items-center justify-center font-bold text-white ${
                      solvedPuzzles.includes(p.id)
                        ? "bg-green-500"
                        : i === currentPuzzle
                        ? "bg-blue-500"
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
                  {solvedPuzzles.length}/{labPuzzles.length}
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

export default LockedLaboratoryGame;
