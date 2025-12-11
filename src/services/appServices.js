import { apiFetch } from "./apiClient";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';


export const fetchTodayWord = async (id) => {
  try {
    const response = await apiFetch(`${API_URL}/todaysword/${id}`);

    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching today's word:`, error);
    throw error;
  }
};

export const fetchQuestionsByCategory = async (category) => {
  try {
    const response = await apiFetch(`${API_URL}/categories/${category}`);

    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching questions:`, error);
    throw error;
  }
};

export const fetchQuestionsByFinishCategory = async (subcategory) => {
  try {
    const response = await apiFetch(`${API_URL}/quiz-type/finish/${subcategory}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching questions:`, error);
    throw error;
  }
};

export const fetchQuestionsByIdentifyCategory = async (subcategory) => {
  try {
    const response = await apiFetch(`${API_URL}/quiz-type/identify/${subcategory}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching questions:`, error);
    throw error;
  }
};

export const fetchQuestionsByEscapeRoom = async (subcategory) => {
  try {
    const response = await apiFetch(`${API_URL}/quiz-type/escape-rooms/${subcategory}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching questions:`, error);
    throw error;
  }
};


export const fetchBadges = async () => {
  try {
    const response = await apiFetch(`${API_URL}/badges`);

    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching questions:`, error);
    throw error;
  }
};

export const setSignupInfo = async (signupData) => {
  try {
    const response = await apiFetch(`${API_URL}/signup-submit`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Log the detailed error messages from backend
      console.error(`Signup failed:`, data.errorMessages);
      return data;
    }

    return data;
  } catch (error) {
    console.error(`Error setting signup info:`, error);
    throw error;
  }
};

export const setLoginInfo = async (loginData) => {
  try {
    const response = await apiFetch(`${API_URL}/login-submit`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error(`Login failed`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error setting login info:`, error);
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await apiFetch(`${API_URL}/check-auth`, {
      method: `GET`
    });

    const data = await response.json();
    console.log("Auth check response:", data); // Debug log
    return data;
  } catch (error) {
    console.error(`Error checking auth status:`, error);
    throw error;
  }
};

export const setLogoutInfo = async () => {
  try {
    const response = await apiFetch(`${API_URL}/logout-submit`, {
      method: `POST`
    });

    if (!response.ok) {
      throw new Error(`Logout failed`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error during logout:`, error);
    throw error;
  }
};


export const fetchPlayCount = async(category) => {
  try {
    const response = await apiFetch(`${API_URL}/api/playcount/${category}`, {method : "GET"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching questions:`, error);
    throw error;
  }
}

export const setPlayCount = async (category) => {
  try {
    const response = await apiFetch(`${API_URL}/api/playcount/${category}`, { method: "PUT" });

    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    
    return; 
  } catch (error) { 
    console.error(`Error updating play count:`, error);
    throw error;
  }
}


export const fetchCStatus = async(category, userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/cstatus/${category}/${userId}`, {method : "GET"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching complete status:`, error);
    throw error;
  }
}

export const setCStatus = async (category, userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/cstatus/${category}/${userId}`, { method: "PUT" });

    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    
    return; 
  } catch (error) { 
    console.error(`Error updating complete status:`, error);
    throw error;
  }
}

export const fetchImageQuizStatus = async(category,userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/imagequizstatus/${category}/${userId}`, {method : "GET"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching image quiz status:`, error);
    throw error;
  }
};

export const setImageQuizStatus = async (category, userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/imagequizstatus/${category}/${userId}`, { method: "PUT" });
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating image quiz status:`, error);
    throw error;
  }
};

export const fetchFinishQuizStatus = async(category,userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/finishquizstatus/${category}/${userId}`, {method : "GET"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching image quiz status:`, error);
    throw error;
  }
};

export const setFinishQuizStatus = async (category, userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/finishquizstatus/${category}/${userId}`, { method: "PUT" });
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating image quiz status:`, error);
    throw error;
  }
};

export const fetchEscapeQuizStatus = async(category,userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/escapequizstatus/${category}/${userId}`, {method : "GET"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching image quiz status:`, error);
    throw error;
  }
};

export const setEscapeQuizStatus = async (category, userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/escapequizstatus/${category}/${userId}`, { method: "PUT" });
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating image quiz status:`, error);
    throw error;
  }
};


export const fetchQuizPlayed = async(id) => {
  try {
    const response = await apiFetch(`${API_URL}/api/quizplayed/${id}`, {method : "GET"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching complete status:`, error);
    throw error;
  }
}

export const setQuizPlayed = async (id) => {
  try {
    const response = await apiFetch(`${API_URL}/api/quizplayed/${id}`, { method: "PUT" });

    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    
    return; 
  } catch (error) { 
    console.error(`Error updating complete status:`, error);
    throw error;
  }
}

export const fetchBadgesByUser = async(userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/userbadges/${userId}`, {method : "GET"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching badges by user:`, error);
    throw error;
  }
}

export const setFirstQuizBadge = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/firstcategoryquiz`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
  } catch (error) {
    console.error(`Error setting first quiz badge:`, error);
    throw error;
  }
}

export const setSecondCategoryQuizBadge = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/secondcategoryquiz`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating second category quiz played status:`, error);
    throw error;
  }
}

export const updateSecondCategoryQuizBadge = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/secondcategoryquizprogress`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating second category quiz played status:`, error);
    throw error;
  }
}

export const setThirdCategoryQuizBadge = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/thirdcategoryquiz`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error setting third category quiz badge:`, error);
    throw error;
  }
}

export const updateThirdCategoryQuizBadge = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/thirdcategoryquizprogress`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating third category quiz played status:`, error);
    throw error;
  }
}

export const setSecondImageQuizBadge = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/secondimagequiz`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error setting second image quiz badge:`, error);
    throw error;
  }
}

export const updateSecondImageQuizBadge = async(userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/secondimagequizprogress`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating second image quiz played status:`, error);
    throw error;
  }
}

export const setThirdImageQuizBadge = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/thirdimagequiz`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error setting third image quiz badge:`, error);
    throw error;
  }
}

export const updateThirdImageQuizBadge = async(userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/thirdimagequizprogress`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating third image quiz played status:`, error);
    throw error;
  }
}

export const setSecondFinishQuizBadge = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/secondfinishquiz`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error setting third image quiz badge:`, error);
    throw error;
  }
}

export const updateSecondFinishQuizBadge = async(userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/secondfinishquizprogress`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating third image quiz played status:`, error);
    throw error;
  }
}

export const setFirstEscapeQuizBadge = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/firstescapequiz`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error setting third image quiz badge:`, error);
    throw error;
  }
}

export const setSecondEscapeQuizBadge = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/secondescapequiz`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error setting third image quiz badge:`, error);
    throw error;
  }
}

export const setThirdEscapeQuizBadge = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/thirdescapequiz`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error setting third image quiz badge:`, error);
    throw error;
  }
}


export const setFourthEscapeQuizBadge = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/fourthescapequiz`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error setting third image quiz badge:`, error);
    throw error;
  }
}

export const updateFourthEscapeQuizBadge = async(userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/fourthescapequizprogress`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating third image quiz played status:`, error);
    throw error;
  }
}

export const updateQuizLordBadge = async(userId, value) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/${value}/quizlordprogress`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating third image quiz played status:`, error);
    throw error;
  }
}

export const setQuizLordBadge = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/badges/${userId}/quizlord`, { method: "PUT"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating third image quiz played status:`, error);
    throw error;
  }
}

export const fetchCategoryQuizPlayed = async(userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/categoryquizplayed/${userId}`, {method : "GET"}); 
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching complete status:`, error);
    throw error;
  }
}

export const setCategoryQuizPlayed = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/categoryquizplayed/${userId}`, { method: "PUT" }); 
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating complete status:`, error);
    throw error;
  }
}

export const fetchImageQuizPlayed = async(userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/imagequizplayed/${userId}`, {method : "GET"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching complete status:`, error);
    throw error;
  }
}

export const setImageQuizPlayed = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/imagequizplayed/${userId}`, { method: "PUT" });
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating complete status:`, error);
    throw error;
  }
}


export const fetchFinishQuizPlayed = async(userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/finishquizplayed/${userId}`, {method : "GET"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching complete status:`, error);
    throw error;
  }
}

export const setFinishQuizPlayed = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/finishquizplayed/${userId}`, { method: "PUT" });
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating complete status:`, error);
    throw error;
  }
}


export const fetchEscapeQuizPlayed = async(userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/escapequizplayed/${userId}`, {method : "GET"});
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching complete status:`, error);
    throw error;
  }
}

export const setEscapeQuizPlayed = async (userId) => {
  try {
    const response = await apiFetch(`${API_URL}/api/escapequizplayed/${userId}`, { method: "PUT" });
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating complete status:`, error);
    throw error;
  }
}