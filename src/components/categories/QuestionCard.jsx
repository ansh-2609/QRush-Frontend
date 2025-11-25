// const QuestionCard = ({ question, onAnswer, current, total, category }) => {


//   function capitalizeFirstLetter(category) {
//     return category.charAt(0).toUpperCase() + category.slice(1)
//   }

//   if (!question) {
//     return <p className="text-center">Loading question...</p>;
//   }

//   const options = [
//     question.option_1,
//     question.option_2,
//     question.option_3,
//     question.option_4,
//   ];
  
//   return (
//     <>
//       <div className="flex justify-center items-center bg-gray-100 py-8">
//         <main className="text-center min-h-[calc(100vh-132px)]">
//           <h2 className="text-4xl font-bold text-blue-800 mb-4">
//              {capitalizeFirstLetter(category)} Quiz
//           </h2>
//           <div className="bg-white shadow-xl rounded-2xl p-6 max-w-xl w-full text-center">
//             {/* Progress */}
//             <p className="text-gray-500 text-sm mb-2">
//               Question {current + 1} of {total}
//             </p>

//             {/* Question */}
//             <h2 className="text-2xl font-bold mb-6">{question.question}</h2>

//             {/* Options */}
//             <div className="grid gap-4">
//                {options.map((opt, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => onAnswer(opt)}
//                 className="p-4 bg-gradient-to-r from-yellow-500 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transform transition duration-200 shadow-md cursor-pointer"
//               >
//                 {opt}
//               </button>
//             ))}
//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default QuestionCard;

// const QuestionCard = ({ question, onAnswer, current, total, category }) => {
//   function capitalizeFirstLetter(category) {
//     return category.charAt(0).toUpperCase() + category.slice(1);
//   }

//   if (!question) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-indigo-600 text-lg font-medium animate-pulse">
//           Loading question...
//         </p>
//       </div>
//     );
//   }

//   const options = [
//     question.option_1,
//     question.option_2,
//     question.option_3,
//     question.option_4,
//   ];

//   return (
//     <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 px-4 py-10">
//       <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 text-center border border-indigo-100 animate-fadeIn">
//         {/* Category Title */}
//         <h2 className="text-4xl font-extrabold text-indigo-700 mb-3 tracking-tight">
//           {capitalizeFirstLetter(category)} Quiz
//         </h2>

//         {/* Progress */}
//         <p className="text-gray-500 text-sm mb-6">
//           Question <span className="font-semibold text-indigo-600">{current + 1}</span> of{" "}
//           <span className="font-semibold text-indigo-600">{total}</span>
//         </p>

//         {/* Question */}
//         <h3 className="text-2xl font-semibold text-gray-800 mb-8 leading-snug">
//           {question.question}
//         </h3>

//         {/* Options */}
//         <div className="grid gap-4">
//           {options.map((opt, idx) => (
//             <button
//               key={idx}
//               onClick={() => onAnswer(opt)}
//               className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg shadow-md hover:shadow-xl hover:scale-[1.03] transition-transform duration-200 active:scale-[0.98] cursor-pointer"
//             >
//               {opt}
//             </button>
//           ))}
//         </div>

//         {/* Progress Bar */}
//         <div className="mt-8 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//           <div
//             className="h-3 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
//             style={{ width: `${((current + 1) / total) * 100}%` }}
//           ></div>
//         </div>

//         {/* Footer */}
//         <p className="mt-6 text-sm text-gray-500 italic">
//           Keep going — you're doing great! 💪
//         </p>
//       </div>
//     </section>
//   );
// };

// export default QuestionCard;


const QuestionCard = ({ question, onAnswer, current, total, category }) => {
  function capitalizeFirstLetter(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  if (!question) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-sky-600">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold tracking-wide">
            Loading question...
          </p>
        </div>
      </div>
    );
  }

  const options = [
    question.option_1,
    question.option_2,
    question.option_3,
    question.option_4,
  ];

  const progress = ((current + 1) / total) * 100;

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-200 via-sky-200 to-blue-300 px-4 py-10 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="w-full max-w-2xl relative z-10">
        {/* Progress indicator at top */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i <= current ? 'w-8 bg-white' : 'w-6 bg-white/30'
                }`}
              ></div>
            ))}
          </div>
          <span className="text-white/90 text-sm font-medium">
            {current + 1}/{total}
          </span>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-blue-500/50">
          {/* Header section */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 px-8 py-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {capitalizeFirstLetter(category)} Quiz
              </h2>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white font-semibold text-sm">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>

          {/* Question section */}
          <div className="px-8 py-10">
            <div className="mb-8">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-sky-100 px-4 py-1 rounded-full mb-4">
                <span className="text-blue-700 text-sm font-semibold">Question {current + 1}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 leading-relaxed">
                {question.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => onAnswer(opt)}
                  className="group w-full py-4 px-6 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 font-semibold text-left shadow-sm hover:shadow-lg hover:from-blue-500 hover:to-sky-500 hover:text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-gray-200 hover:border-transparent relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-sky-600/0 group-hover:from-blue-600/10 group-hover:via-blue-600/10 group-hover:to-sky-600/10 transition-all duration-500"></span>
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-white/50 group-hover:bg-white/90 flex items-center justify-center font-bold text-sm transition-colors duration-300">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span>{opt}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Encouragement footer */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-sky-50 px-6 py-3 rounded-full">
                <span className="text-2xl">✨</span>
                <p className="text-blue-700 font-medium text-sm">
                  You're doing amazing! Keep it up!
                </p>
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionCard;