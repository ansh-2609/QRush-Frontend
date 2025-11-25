import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBadges, fetchBadgesByUser } from "../services/appServices";
import { useSelector } from "react-redux";

const Badges = () => {
  const [badges, setBadges] = useState([]);
  const [allBadges, setAllBadges] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [badgesData, setBadgesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [userStats, setUserStats] = useState({
    totalBadges: 0,
    unlockedBadges: 0,
    completionRate: 0
  });

  const userId  = useSelector((state) => state.auth.userId);
  useEffect(() => {
    const loadBadges = async () => {
      try {
        const badges = await fetchBadges();
        setAllBadges(badges);
        const data = await fetchBadgesByUser(userId);
        setUserBadges(data);

      } catch (error) {
        console.error("Error fetching badges:", error);
      }
    };

    loadBadges();
  }, []);


  // Mock data - replace with actual API calls
  const badgeCategories = [
    { id: "all", name: "All Badges" },
    { id: "quiz", name: "Quiz Master" },
    { id: "streak", name: "Consistency" },
    { id: "category", name: "Subject Expert" },
    { id: "social", name: "Social Butterfly" }
  ];

  // const allBadges = [
  //   {
  //     id: 1,
  //     name: "First Steps",
  //     description: "Complete your first quiz",
  //     category: "quiz",
  //     icon: "🚀",
  //     rarity: "common",
  //     unlocked: false,
  //     progress: 0,
  //     dateUnlocked: "2024-01-15"
  //   },
  //   {
  //     id: 2,
  //     name: "Quiz Novice",
  //     description: "Complete 10 quizzes",
  //     category: "quiz",
  //     icon: "📚",
  //     rarity: "common",
  //     unlocked: false,
  //     progress: 0,
  //     dateUnlocked: "2024-01-20"
  //   },
  //   {
  //     id: 3,
  //     name: "Perfect Score",
  //     description: "Get 100% on any quiz",
  //     category: "quiz",
  //     icon: "⭐",
  //     rarity: "rare",
  //     unlocked: false,
  //     progress: 0,
  //     requirement: "Score 100% on any quiz"
  //   },
  //   {
  //     id: 4,
  //     name: "7-Day Streak",
  //     description: "Maintain a 7-day login streak",
  //     category: "streak",
  //     icon: "🔥",
  //     rarity: "uncommon",
  //     unlocked: false,
  //     progress: 0,
  //     dateUnlocked: "2024-01-22"
  //   },
  //   {
  //     id: 5,
  //     name: "Math Whiz",
  //     description: "Complete 20 math quizzes",
  //     category: "category",
  //     icon: "🧮",
  //     rarity: "rare",
  //     unlocked: false,
  //     progress: 0,
  //     requirement: "Complete 20 math quizzes"
  //   },
  //   {
  //     id: 6,
  //     name: "Socializer",
  //     description: "Share 5 quiz results",
  //     category: "social",
  //     icon: "👥",
  //     rarity: "common",
  //     unlocked: false,
  //     progress: 0,
  //     requirement: "Share 5 quiz results"
  //   },
  //   {
  //     id: 7,
  //     name: "Speed Demon",
  //     description: "Complete a quiz in under 2 minutes",
  //     category: "quiz",
  //     icon: "⚡",
  //     rarity: "epic",
  //     unlocked: false,
  //     progress: 0,
  //     requirement: "Finish any quiz in under 2 minutes"
  //   },
  //   {
  //     id: 8,
  //     name: "Category Master",
  //     description: "Master 5 different categories",
  //     category: "category",
  //     icon: "🏆",
  //     rarity: "legendary",
  //     unlocked: false,
  //     progress: 0,
  //     requirement: "Master 5 different categories"
  //   }
  // ];

  useEffect(() => {
    // Filter badges based on selected category
    const filtered = selectedCategory === "all" 
      ? allBadges 
      : allBadges.filter(badge => badge.category === selectedCategory);
    
    setBadges(filtered);

    // Calculate user stats
    // const unlocked = allBadges.filter(badge => badge.unlocked).length;
    const unlocked = userBadges.filter(badge => badge.unlocked === 1).length;
    // const unlocked = allBadges.filter(badge => badge.unlocked === 1).length;

    const total = userBadges.length;
    const completionRate = Math.round((unlocked / total) * 100);

    setUserStats({
      totalBadges: total,
      unlockedBadges: unlocked,
      completionRate: completionRate
    });

    const merged = allBadges.map(badge => {
      const userBadge = userBadges.find(ub => ub.badge_id === badge.id);

      return {
          ...badge,
          unlocked: userBadge ? userBadge.unlocked : 0,
          progress: userBadge ? userBadge.progress : 0,
          date_unlocked: userBadge ? userBadge.date_unlocked : null
        };
      });
      setBadgesData(merged);
  }, [selectedCategory, userBadges, allBadges]);

  const getRarityColor = (rarity) => {
    const colors = {
      common: "border-gray-400 bg-gray-50",
      uncommon: "border-green-400 bg-green-50",
      rare: "border-blue-400 bg-blue-50",
      epic: "border-purple-400 bg-purple-50",
      legendary: "border-yellow-400 bg-yellow-50"
    };
    return colors[rarity] || colors.common;
  };

  const getRarityText = (rarity) => {
    const texts = {
      common: "text-gray-600",
      uncommon: "text-green-600",
      rare: "text-blue-600",
      epic: "text-purple-600",
      legendary: "text-yellow-600"
    };
    return texts[rarity] || texts.common;
  };

  return (
    <div className="min-h-screen bg-violet-500 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Achievement Badges</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock badges by completing challenges and mastering quizzes. Collect them all!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{userStats.unlockedBadges}</div>
            <div className="text-gray-600">Badges Unlocked</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-gray-900">{userStats.totalBadges}</div>
            <div className="text-gray-600">Total Badges</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600">{userStats.completionRate}%</div>
            <div className="text-gray-600">Completion Rate</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {badgeCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {badgesData.map(badge => (
            <div
              key={badge.id}
              className={`bg-white rounded-xl shadow-sm border-2 p-6 text-center transition-transform duration-200 hover:scale-105 ${
                badge.unlocked ? getRarityColor(badge.rarity) : "border-gray-200 bg-gray-50 opacity-75"
              }`}
            >
              {/* Badge Icon */}
              <div className="text-4xl mb-3">{badge.icon}</div>
              
              {/* Badge Name */}
              <h3 className={`font-bold text-lg mb-2 ${badge.unlocked ? getRarityText(badge.rarity) : "text-gray-500"}`}>
                {badge.name}
              </h3>
              
              {/* Badge Description */}
              <p className="text-gray-600 text-sm mb-3">{badge.description}</p>
              
              {/* Progress or Unlocked Status */}
              {badge.unlocked === 1 ? (
                <div className="text-green-600 text-sm font-medium">
                  ✓ Unlocked on {new Date(badge.date_unlocked).toLocaleDateString()}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-red-600 text-sm font-medium">
                    🔒 Locked
                  </div>
                  {/* <div className="text-xs text-gray-500 mb-2">
                    {badge.requirement}
                  </div> */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${badge.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {badge.progress}% Complete
                  </div>
                </div>
              )}
              
              {/* Rarity Indicator */}
              <div className={`text-xs font-medium mt-2 ${
                badge.unlocked ? getRarityText(badge.rarity) : "text-gray-400"
              }`}>
                {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {badges.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No badges found</h3>
            <p className="text-gray-600">Try selecting a different category.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link
            to="/categories"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Start Earning Badges
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Badges;
