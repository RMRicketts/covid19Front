import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { login, create } from "../../redux/actions";

const useStyles = theme => ({
  center: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "70%"
  },
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(1)
  }
});

class Login extends Component {
  constructor(props) {
    super();
    this.state = { create: false, disabled: false };
    this.updateField = this.updateField.bind(this);
    this.updateToken = this.updateToken.bind(this);
  }

  updateField(e) {
    let update = {};
    update[e.target.getAttribute("id")] = e.target.value;
    this.setState(update);
  }

  async updateToken(method) {
    let { pw, userName } = this.state;
    if (
      userName === undefined ||
      pw === undefined ||
      userName.length === 0 ||
      pw.length === 0
    ) {
      alert("Invalid UserName or Password");
      return;
    }
    this.setState({ disabled: true }, () => {
      console.log(method);
      let pkg = {};
      pkg.userName = userName;
      pkg.pw = pw;
      if (method === "login") {
        this.props.login(pkg);
      }
      if (method === "create") {
        this.props.create(pkg);
      }
      this.setState({ disabled: false });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.container}>
        <Paper className={classes.center}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  onChange={this.updateField}
                  label="User Name"
                  id="userName"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  onChange={this.updateField}
                  label="Password"
                  id="pw"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <ButtonGroup
                  variant="text"
                  color="primary"
                  size="large"
                  aria-label="selection button group"
                  className={classes.center}
                >
                  <Button
                    key="loginButton"
                    id="login"
                    disabled={this.state.disabled}
                    onClick={e => {
                      this.updateToken("login");
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    key="createButton"
                    id="create"
                    disabled={this.state.disabled}
                    onClick={e => {
                      this.updateToken("create");
                    }}
                  >
                    Sign Up
                  </Button>
                </ButtonGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.login.accessToken
});

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ login, create }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(useStyles)(Login))
);
