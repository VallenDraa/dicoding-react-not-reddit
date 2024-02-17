export const tokenHandler = {
  /** @returns {string | null}   */
  getAccessToken() {
    return localStorage.getItem('access-token');
  },
  deleteAccessToken() {
    localStorage.removeItem('access-token');
  },
  /** @param {string} newToken */
  putAccessToken(newToken) {
    localStorage.setItem('access-token', newToken);
  },
};
