import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/index";
import NewsFeed from "./pages/NewsFeed";
import CurrentFeed from "./pages/CurrentFeed";

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={NewsFeed} />
          <Route exact path="/news/:id" component={CurrentFeed} />
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
