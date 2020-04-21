import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import { getData, loadStates, updateState } from "../../redux/actions";
import DisplayTable from "../reports/Table.js";
import Chart from "../reports/Chart.js";

const useStyles = theme => ({
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
  paperxl: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    height: "41vh"
  },
  content: {
    flexGrow: 1,
    height: "89vh"
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
      this.props.loadStates(this.props.data);
      this.props.updateState(this.props.match.params.state);
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

  componentDidUpdate() {
    this.props.updateState(this.props.match.params.state);
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
                <Paper display="flex">
                  {this.props.state === "" ? (
                    <div />
                  ) : (
                    <DisplayTable
                      data={this.props.data[this.props.state]}
                      title="Statistics"
                    />
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={this.props.classes.paperxl}>
                  {this.props.state === "" ? (
                    <div />
                  ) : (
                    <Chart
                      data={this.props.data[this.props.state]}
                      title={`Daily Statistics for ${this.props.state}`}
                      keys={[
                        "positive",
                        "recovered",
                        "death",
                        "hospitalizedCurrently"
                      ]}
                    />
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={this.props.classes.paperxl}>
                  {this.props.state === "" ? (
                    <div />
                  ) : (
                    <Chart
                      data={this.props.data[this.props.state]}
                      title={`Daily Increase Rates for ${this.props.state}`}
                      keys={[
                        "positiveIncrease",
                        "deathIncrease",
                        "hospitalizedIncrease"
                      ]}
                    />
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={this.props.classes.paperxl}>
                  {this.props.state === "" ? (
                    <div />
                  ) : (
                    <Chart
                      data={this.props.data[this.props.state]}
                      title={`Daily Testing Rates for ${this.props.state}`}
                      keys={["totalTestResults", "positive", "negative"]}
                    />
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={this.props.classes.paperxl}>
                  {this.props.state === "" ? (
                    <div />
                  ) : (
                    <Chart
                      data={this.props.data[this.props.state]}
                      title={`Daily Testing Increase Rates for ${
                        this.props.state
                      }`}
                      keys={[
                        "totalTestResultsIncrease",
                        "positiveIncrease",
                        "negativeIncrease"
                      ]}
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
  data: state.getData.covidData,
  state: state.updateState.state
});

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ getData, loadStates, updateState }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(useStyles)(Home))
);
