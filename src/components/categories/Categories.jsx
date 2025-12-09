
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCategory, setQuestions } from "../../store/quizSlice";
import { fetchPlayCount, fetchQuestionsByCategory, setPlayCount } from "../../services/appServices";
import { CiPlay1 } from "react-icons/ci";
import { useEffect, useState } from "react";

const categories = [
  { name: "Plants", key: "plants", icon: "🌿" },
  { name: "Animals", key: "animals", icon: "🐾" },
  { name: "Planets", key: "planets", icon: "🪐" },
  { name: "Technology", key: "technology", icon: "💻" },
  { name: "Science", key: "science", icon: "🔬" },
  { name: "Geography", key: "geography", icon: "🌎" },
  { name: "General Knowledge", key: "generalknowledge", icon: "🧠" },
  { name: "Travel", key: "travel", icon: "✈️" },
  { name: "Environment", key: "environment", icon: "🌳" },
  { name: "Space", key: "space", icon: "✨" },
]; 

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [playCounts, setPlayCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayCounts = async () => {
      const counts = {};
      try {
        for (const cat of categories) {
          const data = await fetchPlayCount(cat.key);
          counts[cat.key] = data[0]?.playcounts || 0;
        }
        setPlayCounts(counts);
      } catch (error) {
        console.error("Failed to load play counts", error);
      } finally {
        setLoading(false);
      }
    };
    loadPlayCounts();
  }, []);

  const handleCategoryClick = async (category) => {
    dispatch(setCategory(category));
 
    try {
      await setPlayCount(category); 
    } catch (err) {
      console.error("Failed to update play count", err);
    }
    const data = await fetchQuestionsByCategory(category);
    dispatch(setQuestions(data));
    
    navigate(`/categories/${category}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">Quiz Categories</h2>
          <h3 className="text-2xl font-semibold text-gray-300 mb-4">
            Explore Various Quiz Topics!
          </h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Pick a category below and challenge yourself with fun, engaging quizzes. 
            Test your knowledge and learn something new!
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryClick(cat.key)}
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl 
                         shadow-lg hover:shadow-2xl border border-white/20 p-6 
                         transition-all duration-500 hover:-translate-y-2 
                         hover:scale-105 cursor-pointer overflow-hidden"
            >
              {/* Background Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                
                {/* Category Name */}
                <div className="mb-4">
                  <span className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                    {cat.name}
                  </span>
                </div>
                
                {/* Play Count */}
                <div className="flex items-center justify-center gap-2 text-gray-300 group-hover:text-white transition-colors duration-300">
                  <CiPlay1 className="text-xl group-hover:text-blue-300 transition-colors duration-300" />
                  <span className="font-medium">
                    {loading ? (
                      <div className="inline-block h-4 w-16 bg-white/20 rounded animate-pulse" />
                    ) : (
                      `${playCounts[cat.key] || 0} played`
                    )}
                  </span>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
                            group-hover:border-blue-400/30 transition-all duration-500" />
            </button>
          ))}
        </div>

        {/* Footer Text */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Can't decide? Start with General Knowledge! 🚀
          </p>
        </div>
      </div>
    </main>
  );
};

export default Categories;