import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { login, create } from "../../redux/actions";
import Create from "./Create.js";

const useStyles = theme => {};

class Login extends Component {
  constructor(props) {
    super();
    this.state = {};
    this.updateField = this.updateField.bind(this)
    this.postLogin = this.postLogin.bind(this);
    this.postCreate = this.postCreate.bind(this);
  }

  updateField(e) => {
    console.log(e)
    //this.setState({})
  }

  async postLogin(e) => {
    let pkg = {
      method: "POST",
      url: "http://localhost:8080",
      data: {}
    }

    pkg.data.userName = this.state.userName
    pkg.data.pw = this.state.pw

    axios(pkg)
  }

  render() {
    <div>
      {}
    </div
  }

}

const mapStateToProps = state => ({
  accessToken: state.login.accessToken
});

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ create, login }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(Login));
