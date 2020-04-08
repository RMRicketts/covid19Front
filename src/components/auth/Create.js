import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { login } from "../../redux/actions";

const useStyles = theme => {};

class Login extends Component {
  constructor(props) {
    super();
    this.state = { create: false };
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({
  accessToken: state.login.accessToken
});

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ login }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(useStyles)(Login))
);
