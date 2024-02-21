export const toast = {
  observers: [],
  info(message) {
    this.notify(message, 'info');
  },
  error(message) {
    this.notify(message, 'error');
  },
  /** @param {(id:string, message: string, type: "info" | "error") => void} callback */
  subscribe(callback) {
    this.observers.push(callback);
  },
  unsubscribe(callback) {
    this.observers = this.observers.filter((observer) => observer !== callback);
  },
  /**
   * @param {string} message
   * @param {"info" | "error"} type
   */
  notify(message, type) {
    this.observers.forEach((obs) => obs(crypto.randomUUID(), message, type));
  },
};
