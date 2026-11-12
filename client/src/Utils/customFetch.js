export const customFetch = async (url, options = {}) => {
  const isPostOrPut = options.body && typeof options.body === 'string';

  const defaultOptions = {
    ...options,
    credentials: 'include',
    headers: {
      ...(isPostOrPut ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (response.status === 401) {
      alert('Session expired. Authentication is required to continue.');
      window.location.href = '/sign-up';
      return response;
    }

    return response;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};