import { debug } from "util";

class Store {
  appStore = { state: undefined };

  constructor(initialState = {}) {
    this.appStore = { state: initialState };
    this.initialState = initialState;
  }

  getInitialState() {
    return {
      ...this.initialState
    };
  }

  updateStore(newAttributes = {}, mergeArrays = true) {
    let currentState = this.appStore;
    let existingArrays = () => {
      let arraysInState = Object.keys(this.appStore.state).map(key => {
        if (Array.isArray(this.appStore.state[key])) return key;
      });
      let arraysInNextState = Object.keys(newAttributes).map(key => {
        if (Array.isArray(newAttributes[key])) return key;
      });
      let result = arraysInState.filter(key => arraysInNextState.includes(key));
      let obj = {};

      result.forEach(key => {
        if (!key) return;
        let state = this.appStore.state;
        obj[key] = state[key].concat(newAttributes[key]);
      });

      return obj;
    };

    let nextState = {
      state: {
        ...currentState.state,
        ...newAttributes,
        ...(mergeArrays === true ? existingArrays() : {})
      },
      previousState: { ...currentState.state }
    };

    this.appStore = nextState;
    return currentState;
  }

  getState() {
    return this.appStore.state;
  }

  getPreviousState() {
    return this.appStore.previousState;
  }

  toJSON() {
    return JSON.stringify(this.appStore);
  }
}

export default Store;
