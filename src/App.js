import React from "react";
import "./App.css";
import { Amiibo } from "./components/Amiibo";
import Store from "./models/Store";
import { AmmiiboApiObserver } from "./observers/AmiiboApiObserver";
import { merge } from "rxjs";

class App extends React.PureComponent {
  state = { apiResults: { amiibo: [] } };
  store = new Store({ amiibo: [] });
  observers = null;
  subscriptions = null;

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
      this.setState({ apiResults: this.store.getState() });
    });
  }

  render() {
    let { apiResults } = this.state;
    console.log(apiResults);
    return (
      <div className="App">
        <section>
          <h1>State Management</h1>
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
        </section>
        <section>
          <h1>Data</h1>
          {apiResults.amiibo
            ? apiResults.amiibo.map(amiibo => {
                return (
                  <li>
                    <Amiibo
                      key={amiibo.tail}
                      name={amiibo.name}
                      character={amiibo.character}
                      amiiboSeries={amiibo.amiiboSeries}
                    />
                  </li>
                );
              })
            : null}
        </section>
      </div>
    );
  }
}

export default App;
