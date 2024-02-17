export const token = {
  /** @returns {string | null}   */
  getAccessToken() {
    try {
      return localStorage.getItem('access-token');
    } catch (error) {
      // TODO: Handle error
      console.error(error.message);
      return null;
    }
  },
  deleteAccessToken() {
    try {
      localStorage.removeItem('access-token');
    } catch (error) {
      // TODO: Handle error
      console.error(error.message);
    }
  },
  /** @param {string} newToken */
  putAccessToken(newToken) {
    try {
      localStorage.setItem('access-token', newToken);
    } catch (error) {
      // TODO: Handle error
      console.error(error.message);
    }
  },
};
