import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Landing extends React.Component {
  componentDidMount() {
    this.props.history.push('/reports/trends/United States')
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    label: state.updateState.label,
    states: state.states.states,
    data: state.getData.covidData
  };
};

export default withRouter(connect(mapStateToProps)(Landing));
