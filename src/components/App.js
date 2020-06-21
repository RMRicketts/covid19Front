import React from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Navbar from "./assets/Navbar";
import Home from "./landing/Home";
import Today from "./landing/Today";
import Landing from "./landing/Landing";
import { getData } from "../redux/actions";

class App extends React.Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
      <div>
        <Navbar />
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/reports/trends/:state" component={Home} />
          <Route exact path="/reports/data/today" component={Today} />
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getData }, dispatch);

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
