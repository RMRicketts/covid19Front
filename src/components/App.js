import React from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Navbar from "./assets/Navbar";
import Home from "./landing/Home";
import Today from "./landing/Today";
import Login from "./auth/Login";
import { getData } from "../redux/actions";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    if (
      window.sessionStorage.getItem("Authorization") === null ||
      window.sessionStorage.getItem("exp") <= Math.floor(Date.now() / 1000)
    ) {
      return (
        <div>
          <Navbar />
          <main>
            <Route path="/" component={Login} />
          </main>
        </div>
      );
    }

    return (
      <div>
        <Navbar />
        <main>
          <Route path="/reports/trends/:state" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/reports/data/today" component={Today} />"
        </main>
      </div>
    );
  }
}

const mapStateToProps = stateFromStore => ({
  accessToken: stateFromStore.accessToken,
  data: stateFromStore.data
});

const mapDispatchToProps = (dispatch, propsOfTodoForm) =>
  bindActionCreators({ getData }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
