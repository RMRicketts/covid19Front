import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import { getData } from "../../redux/actions";
import DisplayTable from "../reports/Table.js";
import Chart from "../reports/Chart.js";
import moment from "moment";

const useStyles = theme => ({
  root: {
    padding: "0 10px"
  },
  appBarSpacer: theme.mixins.toolbar,
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 225
  },
  paperl: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 360
  },
  paperxl: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "80vh"
  },
  content: {
    flexGrow: 1,
    height: "89vh",
    overflow: "auto"
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "United States"
    };
    this.getData = this.getData.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  async getData(params) {
    try {
      await this.props.getData();
    } catch (e) {
      console.log(e);
    }
  }

  async onButtonClick() {
    try {
      await this.getData();
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    try {
      await this.getData();
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <main className={this.props.classes.content}>
          <div className={this.props.classes.appBarSpacer} />
          <Container maxWidth="lg" className={this.props.classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper display="flex">{/*className={this.props.classes.paperl}>*/}
                  {this.props.data === undefined ? (
                    <div />
                  ) : (
                    <DisplayTable
                      data={this.props.data[this.state.key]}
                      title="Statistics"
                    />
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={this.props.classes.paperxl}>
                  {this.props.data === undefined ? (
                    <div />
                  ) : (
                    <Chart
                      data={this.props.data[this.state.key]}
                      title="Covid Over Time"
                    />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.getData.covidData
});

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ getData }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(useStyles)(Home))
);
