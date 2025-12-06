
import React, { useEffect, useState } from "react";
import { fetchTodayWord } from "../services/appServices";

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

        const dayOfYear = Math.floor(
          (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
        );
        const index = dayOfYear % 366; 

        const todayWord = await fetchTodayWord(index);
        const newWord = todayWord.word;
        const wordMeaning = todayWord.meaning;
        let meaning = "No definition found.";
        if (wordMeaning) {
          meaning = wordMeaning;
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
