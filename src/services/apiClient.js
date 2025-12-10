export const apiFetch = (url, options = {}) => {
  return fetch(url, {
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });
};
