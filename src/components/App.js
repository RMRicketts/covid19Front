import React from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Navbar from "./assets/Navbar";
import Home from "./landing/Home";
import Login from '
import { getData } from "../redux/actions";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Navbar />
        <main>
          <Route path="/data/:state" component={Home} />
          <Rooute exact path="/login" component={Login} />
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
