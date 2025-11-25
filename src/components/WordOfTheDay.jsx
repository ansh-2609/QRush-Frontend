// import React, { useEffect, useState } from "react";

// const WordOfTheDay = () => {
//   const [word, setWord] = useState("");
//   const [definition, setDefinition] = useState("");
//   const [loading, setLoading] = useState(true); 

//   useEffect(() => {
//     const fetchWordOfTheDay = async () => {
//       try {
//         // Save date in localStorage to avoid new word on every refresh
//         const today = new Date().toDateString();
//         const stored = JSON.parse(localStorage.getItem("wordOfTheDay"));

//         if (stored && stored.date === today) {
//           setWord(stored.word);
//           setDefinition(stored.definition);
//           setLoading(false);
//           return;
//         }

//         // 1. Fetch a random word
//         const wordRes = await fetch("https://random-word-api.herokuapp.com/word");
//         const [newWord] = await wordRes.json();

//         // 2. Get its meaning from dictionary
//         const dictRes = await fetch(
//           `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`
//         );
//         const dictData = await dictRes.json();

//         let meaning = "No definition found.";
//         if (Array.isArray(dictData) && dictData[0]?.meanings?.length > 0) {
//           meaning = dictData[0].meanings[0].definitions[0].definition;
//         }

//         // Save word for today
//         setWord(newWord);
//         setDefinition(meaning);
//         localStorage.setItem(
//           "wordOfTheDay",
//           JSON.stringify({ date: today, word: newWord, definition: meaning })
//         );
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWordOfTheDay();
//   }, []);

//   if (loading) return <p className="text-center">Loading today's word...</p>;

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl text-center">
//       <h2 className="text-xl font-semibold mb-2">📖 Today's Word</h2>
//       <p className="text-3xl font-bold text-indigo-600 capitalize">{word}</p>
//       <p className="mt-3 text-gray-700 italic">“{definition}”</p>
//       <p className="mt-2 text-gray-500 text-sm">Check back tomorrow for a new word!</p>
//     </div>
//   );
// };

// export default WordOfTheDay;

import React, { useEffect, useState } from "react";

const WordOfTheDay = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWordOfTheDay = async () => {
      try {
        const today = new Date().toDateString();
        const stored = JSON.parse(localStorage.getItem("wordOfTheDay"));

        if (stored && stored.date === today) {
          setWord(stored.word);
          setDefinition(stored.definition);
          setLoading(false);
          return;
        }

        const wordRes = await fetch("https://random-word-api.herokuapp.com/word");
        const [newWord] = await wordRes.json();

        const dictRes = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`
        );
        const dictData = await dictRes.json();

        let meaning = "No definition found.";
        if (Array.isArray(dictData) && dictData[0]?.meanings?.length > 0) {
          meaning = dictData[0].meanings[0].definitions[0].definition;
        }

        setWord(newWord);
        setDefinition(meaning);
        localStorage.setItem(
          "wordOfTheDay",
          JSON.stringify({ date: today, word: newWord, definition: meaning })
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWordOfTheDay();
  }, []);

  if (loading)
    return (
      <p className="text-center text-indigo-500 font-medium animate-pulse">
        Loading today's word...
      </p>
    );

  return (
    <div className="relative max-w-md mx-auto p-6 bg-white/70 backdrop-blur-sm shadow-xl rounded-3xl border border-indigo-100 hover:shadow-2xl transition-all duration-300">
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
        📖 Word of the Day
      </div>
      <h2 className="text-3xl font-bold text-indigo-700 mt-4 capitalize">
        {word}
      </h2>
      <p className="mt-4 text-gray-700 italic leading-relaxed">
        “{definition}”
      </p>
      <p className="mt-4 text-sm text-gray-500">
        Check back tomorrow for a new word!
      </p>
    </div>
  );
};

export default WordOfTheDay;
