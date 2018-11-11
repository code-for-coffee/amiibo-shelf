import React, { Component } from "react";
import "./App.css";
import Store from "./models/Store";
import { AmmiiboApiObserver } from "./observers/AmiiboApiObserver";
import { merge } from "rxjs";

class App extends Component {
  store = new Store({ amiibo: ["Zelda", "Link"] });
  observers;
  subscriptions;

  componentWillMount() {
    this.observers = merge(
      AmmiiboApiObserver("zelda"),
      AmmiiboApiObserver("link"),
      AmmiiboApiObserver("mario"),
      AmmiiboApiObserver("luigi")
    );

    this.subscriptions = this.observers.subscribe(change => {
      this.store.updateStore(change);
      console.log(this.store);
    });
  }

  render() {
    return (
      <div className="App">
        <button
          onClick={() => {
            this.store.updateStore({
              cats: this.store.getState().cats + 1 || 1
            });
            console.log(this.store.getState());
          }}
        >
          Update Store
        </button>
        <button
          onClick={() => {
            console.log(this.store.getState());
          }}
        >
          Current State
        </button>
        <button
          onClick={() => {
            console.log(this.store.getPreviousState());
          }}
        >
          Previoius State
        </button>
        <button
          onClick={() => {
            console.log(this.store.getInitialState());
          }}
        >
          Show Initial State
        </button>
      </div>
    );
  }
}

export default App;
