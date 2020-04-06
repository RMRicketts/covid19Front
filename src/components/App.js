import React from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Navbar from "./assets/Navbar";
import Home from "./landing/Home";
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
          <Route exact path="/" component={Home} />
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
