import React from "react";
import { connect } from "react-redux";

class Landing extends React.Component {
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

export default connect(mapStateToProps)(Landing);
