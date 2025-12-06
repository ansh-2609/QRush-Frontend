
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCategory } from "../store/finishQuizSlice";
import { 
  FaListUl, 
  FaCheckCircle, 
  FaClock, 
  FaPuzzlePiece,
  FaFillDrip,
  FaImage,
  FaDoorOpen,
} from "react-icons/fa";

const QuizTypes = () => {
  const quizTypes = [
    { 
      name: "Identify from Image", 
      description: "Guess the correct answer based on visual clues", 
      key: "identify",
      icon: FaImage,
      gradient: "from-amber-500 to-yellow-500",
      bgGradient: "from-amber-50 to-yellow-50",
      color: "amber"
    },
    { 
      name: "Finish the Types", 
      description: "Complete phrases and fill in what's missing", 
      key: "finish",
      icon: FaFillDrip,
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50",
      color: "indigo"
    },
    { 
      name: "Escape Rooms", 
      description: "Solve clues and complete tasks to 'escape' each themed room", 
      key: "escape-rooms",
      icon: FaDoorOpen, 
      gradient: "from-rose-500 to-red-500",
      bgGradient: "from-rose-50 to-red-50",
      color: "rose"
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
    navigate(`/quiz-type/${category}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-4xl font-bold text-white pb-6">
            Choose Your Quiz Style
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover different ways to test your knowledge. Each quiz type offers a unique challenge 
            and learning experience.
          </p>
        </div>

        {/* Quiz Types Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizTypes.map((quiz) => {
            const IconComponent = quiz.icon;
            return (
              <div
                key={quiz.name}
                onClick={() => handleCategoryClick(quiz.key)}
                className="group relative bg-white/10 backdrop-blur-md rounded-2xl shadow-lg 
                         hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 
                         cursor-pointer border border-white/20 overflow-hidden h-full flex flex-col"
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${quiz.gradient} 
                              opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                <div className="relative z-10 p-8 flex flex-col h-full">
                  {/* Icon and Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 
                                  rounded-xl bg-gradient-to-r ${quiz.gradient} 
                                  text-white group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="text-2xl" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80">
                      {quizTypes.indexOf(quiz) + 1}/{quizTypes.length}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 mb-6">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {quiz.name}
                    </h3>
                    
                    <p className="text-gray-300">
                      {quiz.description}
                    </p>
                  </div>

                  {/* Action Indicator */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-sm font-semibold text-gray-300">
                      Start Quiz
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${quiz.gradient} 
                                  flex items-center justify-center text-white 
                                  group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-sm font-bold">→</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Section */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto 
                         shadow-lg border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Not Sure Where to Start?
            </h3>
            <p className="text-gray-300 mb-6">
              <span className="font-semibold text-blue-300">Identify from Image</span> is great for beginners, 
              while <span className="font-semibold text-orange-300">Escape Rooms</span> offer an exciting challenge 
              for experienced players!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                Identify from Image - Beginner Friendly
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                Escape Rooms - Tough Challenge
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizTypes;