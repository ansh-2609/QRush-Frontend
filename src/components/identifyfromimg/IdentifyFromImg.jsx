import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuestions, setSubCategory } from "../../store/imageQuizSlice";
import { FaLandmark, FaFlag, FaTree, FaPaw, FaPaintBrush, FaMusic, FaCar, FaFutbol } from "react-icons/fa";
import { fetchQuestionsByIdentifyCategory } from "../../services/appServices";

const imageQuizzes = [
  {
    title: "Identify the Landmark",
    description: "Recognize famous landmarks and monuments from around the world",
    key: "landmarks",
    icon: FaLandmark,
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
    examples: ["Big Ben", "The Thinker", "Colosseum"]
  },
  {
    title: "Identify the Flag",
    description: "Name the country from its national flag",
    key: "flags",
    icon: FaFlag,
    gradient: "from-red-500 to-rose-500",
    bgGradient: "from-red-50 to-rose-50",
    examples: ["Peru", "Belgium", "Kenya"]
  },
  {
    title: "Identify the Animal",
    description: "Recognize animals from their pictures",
    key: "animals",
    icon: FaPaw,
    gradient: "from-emerald-500 to-green-500",
    bgGradient: "from-emerald-50 to-green-50",
    examples: ["Okapi", "Aye-Aye", "Shoebill"]
  },
  {
    title: "Identify the Plant",
    description: "Name plants, flowers, and trees from images",
    key: "plants",
    icon: FaTree,
    gradient: "from-green-500 to-lime-500",
    bgGradient: "from-green-50 to-lime-50",
    examples: ["Hyacinth", "Oak Tree", "Iris"]
  },
  {
    title: "Identify the Car Brand",
    description: "Name car manufacturers from their logos and models",
    key: "cars",
    icon: FaCar,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    examples: ["Mazda", "Skoda", "Maserati"]
  },
  {
    title: "Identify the Sport",
    description: "Recognize sports from equipment or action shots",
    key: "sports",
    icon: FaFutbol,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    examples: ["Polo", "Kendo", "Fencing"]
  },
  {
    title: "Identify the Instrument",
    description: "Name musical instruments from pictures",
    key: "instruments",
    icon: FaMusic,
    gradient: "from-indigo-500 to-purple-500",
    bgGradient: "from-indigo-50 to-purple-50",
    examples: ["Trumpet", "Saxophone", "Accordion"]
  },
];

const IdentifyFromImage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = async (subcategory) => {
    dispatch(setSubCategory(subcategory));
    
    const data = await fetchQuestionsByIdentifyCategory(subcategory);
    dispatch(setQuestions(data));
 
    
    navigate(`/quiz-type/identify/${subcategory}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white pb-4">
            Identify from Image
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Test your visual recognition skills by identifying objects, places, and more from images. 
            How many can you identify correctly?
          </p>
        </div>

        {/* Quiz Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {imageQuizzes.map((quiz) => {
            const IconComponent = quiz.icon;
            return (
              <div
                key={quiz.title}
                className="group relative bg-white/10 backdrop-blur-md rounded-2xl 
                         shadow-lg hover:shadow-2xl transition-all duration-500 
                         hover:-translate-y-2 cursor-pointer border border-white/20 
                         overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${quiz.gradient} 
                              opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                <div className="relative z-10 p-6 h-full flex flex-col">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 
                                rounded-xl bg-gradient-to-r ${quiz.gradient} 
                                text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-xl" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                      {quiz.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                      {quiz.description}
                    </p>

                    {/* Examples */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-300 mb-2">EXAMPLES:</p>
                      <div className="space-y-1">
                        {quiz.examples.map((example, index) => (
                          <div 
                            key={index}
                            className="text-xs text-white/80 bg-white/10 rounded-lg px-2 py-1 
                                     border border-white/20 font-medium"
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
                    className={`w-full py-3 px-4 bg-gradient-to-r ${quiz.gradient} 
                              text-white rounded-lg font-semibold text-base
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
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto 
                         shadow-lg border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Visual Recognition Challenge
            </h3>
            <p className="text-gray-300 mb-6">
              Each quiz contains 10 images to identify. Test your observation skills and knowledge across different categories!
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Perfect for visual learners and observation training
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentifyFromImage;