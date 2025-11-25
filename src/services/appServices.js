const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const fetchQuestionsByCategory = async (category) => {
  try {
    console.log(`Fetching questions for category: ${category}`);
    const response = await fetch(`${API_URL}/categories/${category}`);

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

export const fetchQuestionsByFinishCategory = async (category, subcategory) => {
  try {
    // console.log(`Fetching questions for category: ${category}`);
    const response = await fetch(`${API_URL}/quiz-type/${category}/${subcategory}`);
    console.log("response",response);
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

export const fetchQuestionsByIdentifyCategory = async (category, subcategory) => {
  try {
    // console.log(`Fetching questions for category: ${category}`);
    const response = await fetch(`${API_URL}/quiz-type/${category}/${subcategory}`);
    console.log("response",response);
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
    const response = await fetch(`${API_URL}/badges`);

    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    const data = await response.json();
    console.log("Badges data:", data);
    return data;
  } catch (error) {
    console.error(`Error fetching questions:`, error);
    throw error;
  }
};

export const setSignupInfo = async (signupData) => {
  try {
    const response = await fetch(`${API_URL}/signup-submit`, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: `include`,
      body: JSON.stringify(signupData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Log the detailed error messages from backend
      console.error(`Signup failed:`, data.errorMessages);
      return data; // Return error data so frontend can display it
    }

    return data;
  } catch (error) {
    console.error(`Error setting signup info:`, error);
    throw error;
  }
};

export const setLoginInfo = async (loginData) => {
  try {
    const response = await fetch(`${API_URL}/login-submit`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error(`Login failed`);
    }
    const data = await response.json();
    console.log("Login response data:", data);
    return data;
  } catch (error) {
    console.error(`Error setting login info:`, error);
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await fetch(`${API_URL}/check-auth`, {
      method: `GET`, 
      credentials: `include`,
    });

    return await response.json();
  } catch (error) {
    console.error(`Error checking auth status:`, error);
    throw error;
  }
};

export const setLogoutInfo = async () => {
  try {
    const response = await fetch(`${API_URL}/logout-submit`, {
      method: `POST`,
      credentials: `include`, 
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
    const response = await fetch(`${API_URL}/api/playcount/${category}`, {method : "GET"});
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
    const response = await fetch(`${API_URL}/api/playcount/${category}`, { method: "PUT" });

    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    
    return; 
  } catch (error) { 
    console.error(`Error updating play count:`, error);
    throw error;
  }
}

export const fetchCompleteStatus = async(category) => {
  try {
    const response = await fetch(`${API_URL}/api/completestatus/${category}`, {method : "GET"});
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

export const setCompleteStatus = async (category) => {
  try {
    const response = await fetch(`${API_URL}/api/completestatus/${category}`, { method: "PUT" });

    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    
    return; 
  } catch (error) { 
    console.error(`Error updating complete status:`, error);
    throw error;
  }
}
export const fetchCStatus = async(category, userId) => {
  try {
    const response = await fetch(`${API_URL}/api/cstatus/${category}/${userId}`, {method : "GET"});
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
    const response = await fetch(`${API_URL}/api/cstatus/${category}/${userId}`, { method: "PUT" });

    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    
    return; 
  } catch (error) { 
    console.error(`Error updating complete status:`, error);
    throw error;
  }
}

export const fetchQuizPlayed = async(id) => {
  try {
    const response = await fetch(`${API_URL}/api/quizplayed/${id}`, {method : "GET"});
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
    const response = await fetch(`${API_URL}/api/quizplayed/${id}`, { method: "PUT" });

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
    const response = await fetch(`${API_URL}/api/userbadges/${userId}`, {method : "GET"});
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
    const response = await fetch(`${API_URL}/api/badges/${userId}/firstcategoryquiz`, { method: "PUT", credentials: `include` });
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
    const response = await fetch(`${API_URL}/api/badges/${userId}/secondcategoryquiz`, { method: "PUT", credentials: `include` });
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
    const response = await fetch(`${API_URL}/api/badges/${userId}/secondcategoryquizprogress`, { method: "PUT", credentials: `include` });
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating second category quiz played status:`, error);
    throw error;
  }
}

export const fetchCategoryQuizPlayed = async(userId) => {
  try {
    const response = await fetch(`${API_URL}/api/categoryquizplayed/${userId}`, {method : "GET"}); 
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
    const response = await fetch(`${API_URL}/api/categoryquizplayed/${userId}`, { method: "PUT" }); 
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return; 
  } catch (error) { 
    console.error(`Error updating complete status:`, error);
    throw error;
  }
}

