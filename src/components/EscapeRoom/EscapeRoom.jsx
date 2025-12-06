import { FaDoorOpen, FaLock, FaMapMarkedAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuestions, setSubCategory } from "../../store/escapeRoomSlice";
import { fetchQuestionsByEscapeRoom } from "../../services/appServices";

const EscapeRoom = () => {

  const escapeRooms = [
    {
      name: "Escape Room 1: The Ancient Temple",
      description:
        "Solve cryptic puzzles to uncover the secrets of a lost civilization before the doors close forever.",
      key: "temple",
      icon: FaDoorOpen,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      name: "Escape Room 2: The Island Mystery",
      description:
        "Navigate clues hidden across a tropical island and find the escape route before the storm hits.",
      key: "island",
      icon: FaMapMarkedAlt,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      name: "Escape Room 3: The Locked Laboratory",
      description:
        "Crack the scientist’s code, deactivate traps, and escape the lab before it self-destructs.",
      key: "lab",
      icon: FaLock,
      gradient: "from-indigo-500 to-blue-500",
    },
    
  ];

  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRoomClick = async(roomKey) => {
    dispatch(setSubCategory(roomKey));

    const data = await fetchQuestionsByEscapeRoom(roomKey);
    dispatch(setQuestions(data));
    
    navigate(`/quiz-type/escape-rooms/${roomKey}`);
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 py-12 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Choose Your Escape Room
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Each room presents unique puzzles, hidden clues, and thrilling mysteries. 
          Can you escape in time?
        </p>
      </div>

      {/* Escape Room Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {escapeRooms.map((room) => {
          const Icon = room.icon;
          return (
            <div
              key={room.key}
              onClick={() => handleRoomClick(room.key)}
              className={`group relative bg-white/10 backdrop-blur-md border border-white/20 
                         rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 
                         hover:-translate-y-2 cursor-pointer overflow-hidden flex flex-col`}
            >
              {/* Hover Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${room.gradient} 
                            opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
              />

              <div className="relative z-10 p-8 flex flex-col h-full">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 mb-6 
                              rounded-xl bg-gradient-to-r ${room.gradient} text-white 
                              group-hover:scale-110 transition-transform duration-300 mx-auto`}
                >
                  <Icon className="text-3xl" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {room.name}
                </h3>
                <p className="text-gray-300 mb-6">{room.description}</p>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm font-semibold text-gray-300">
                    Enter Room
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-r ${room.gradient} 
                                flex items-center justify-center text-white 
                                group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-sm font-bold">→</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Message */}
      <div className="text-center mt-16">
        <p className="text-gray-400">
          Each room offers increasing levels of difficulty — start with 
          <span className="text-amber-400 font-semibold"> Room 1</span> and 
          test your way up to <span className="text-green-400 font-semibold"> Room 3!</span>
        </p>
      </div>
    </div>
  );
};

export default EscapeRoom;
