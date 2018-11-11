import Store from "./Store";

class AppStore {
  static #instance;

  getStore() {
    return this.#instance;
  }

  static getInstance(initialState = undefined) {
    let store;
    if (typeof this.#instance != Store && initialState) {
      this.#instance = new Store(initialState);
      store = this.#instance;
    } else {
      store = this.#instance;
    }
    debugger;
    return store.state;
  }
}

export default AppStore;
