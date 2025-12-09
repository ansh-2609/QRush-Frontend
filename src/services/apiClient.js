export const apiFetch = (url, options = {}) => {
  return fetch(url, {
    credentials: "include",
    ...options
  });
};
