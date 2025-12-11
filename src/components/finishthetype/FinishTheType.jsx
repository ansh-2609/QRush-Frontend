
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuestionsByFinishCategory } from "../../services/appServices";
import { setQuestions, setSubCategory } from "../../store/finishQuizSlice";
import { FaLandmark, FaStore, FaGlobeAmericas, FaLightbulb, FaUserTie } from "react-icons/fa";

const finishQuizzes = [
  {
    title: "Finish the Landmark",
    description: "Complete the name of famous landmarks from around the world",
    key: "landmark",
    icon: FaLandmark,
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
    examples: ["Eiffel ____", "Great Wall of ____", "Taj ____"]
  },
  {
    title: "Finish the Brand Name",
    description: "Complete the names of well-known brands and companies",
    key: "brandname",
    icon: FaStore,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    examples: ["Cola- ____", "Micro ____", "App ____"]
  },
  {
    title: "Finish the Capital",
    description: "Complete the capital cities of countries worldwide",
    key: "capitalcity",
    icon: FaGlobeAmericas,
    gradient: "from-emerald-500 to-green-500",
    bgGradient: "from-emerald-50 to-green-50",
    examples: ["The capital of Japan is ____", "Paris is the capital of ____"]
  },
  {
    title: "Finish the Fact",
    description: "Complete interesting facts about science and nature",
    key: "fact",
    icon: FaLightbulb,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
    examples: ["The planet known for its rings is ____", "Water boils at ____°C"]
  },
  {
    title: "Finish the Inventor",
    description: "Identify inventors from their famous inventions",
    key: "inventor",
    icon: FaUserTie,
    gradient: "from-red-500 to-rose-500",
    bgGradient: "from-red-50 to-rose-50",
    examples: ["The telephone was invented by ____", "Light bulb by ____"]
  },
];

const FinishTheTypes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = async (subcategory) => {
    dispatch(setSubCategory(subcategory));
    const data = await fetchQuestionsByFinishCategory(subcategory);
    dispatch(setQuestions(data));
    navigate(`/quiz-type/finish/${subcategory}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Finish the … Quizzes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Test your knowledge by completing phrases, names, and facts. 
            How many can you finish correctly?
          </p>
        </div>

        {/* Quiz Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {finishQuizzes.map((quiz) => {
            const IconComponent = quiz.icon;
            return (
              <div
                key={quiz.title}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                         transition-all duration-500 hover:-translate-y-2 cursor-pointer
                         border border-gray-100 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${quiz.bgGradient} 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 
                                rounded-2xl bg-gradient-to-r ${quiz.gradient} 
                                text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-2xl" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                      {quiz.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {quiz.description}
                    </p>

                    {/* Examples */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-500 mb-3">EXAMPLES:</p>
                      <div className="space-y-2">
                        {quiz.examples.map((example, index) => (
                          <div 
                            key={index}
                            className="text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2 
                                     border border-gray-200 font-mono"
                          >
                            {example}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleCategoryClick(quiz.key)}
                    className={`w-full py-4 px-6 bg-gradient-to-r ${quiz.gradient} 
                              text-white rounded-xl font-semibold text-lg
                              hover:shadow-lg transform hover:scale-105 
                              transition-all duration-300 cursor-pointer
                              border border-transparent hover:border-white/30`}
                  >
                    Start Quiz
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      →
                    </span>
                  </button>
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent 
                              group-hover:border-gradient-to-r ${quiz.gradient} 
                              group-hover:opacity-30 transition-all duration-500`} />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Challenge Yourself?
            </h3>
            <p className="text-gray-600 mb-6">
              Each quiz contains 10 questions. Complete as many as you can to test your knowledge!
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Perfect for quick brain exercises
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishTheTypes;