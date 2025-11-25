const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchQuestions = async (category) => {
  const response = await fetch(`${API_URL}/api/questions/${category}`);
  // ...existing code...
};

export const submitQuiz = async (answers) => {
  const response = await fetch(`${API_URL}/api/submit`, {
    method: 'POST',
    body: JSON.stringify(answers),
    // ...existing code...
  });
  // ...existing code...
};

// Apply this pattern to all your API calls