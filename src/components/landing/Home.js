import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import {
  getData,
  loadStates,
  updateState,
  updateLabel
} from "../../redux/actions";
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
  center: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "70%"
  },
  paperxl: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    height: "64vh"
  },
  padIt: {
    marginTop: "5px",
    marginBottom: "2px",
    marginLeft: "2px",
    marginRight: "2px"
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
      keys: {},
      disabled: true,
      defaultReports: {
        totals: {
          active: true,
          death: true,
          positive: true,
          recovered: true
        },
        daily: {
          deathIncrease: true,
          positiveIncrease: true
        },
        hospital: {
          hospitalizedCurrently: true,
          onVentilatorCurrently: true,
          inIcuCurrently: true
        }
      }
    };
    this.getData = this.getData.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.setDefaultReport = this.setDefaultReport.bind(this);
  }

  async getData(params) {
    try {
      await this.props.getData();
      this.props.loadStates(this.props.data);
      this.props.updateState(this.props.match.params.state);
      this.setState({
        keys: {
          active: true,
          death: true,
          positive: true,
          recovered: true
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  onButtonClick(keyName) {
    let newKeys = { ...this.state.keys };
    if (newKeys[keyName] !== undefined) {
      delete newKeys[keyName];
    } else {
      newKeys[keyName] = true;
    }
    this.setState({
      keys: newKeys
    });
  }

  setDefaultReport(reportName) {
    let report = { ...this.state.defaultReports[reportName] };
    this.setState({
      keys: report
    });
  }

  componentDidUpdate() {
    this.props.updateState(this.props.match.params.state);
    this.props.updateLabel(this.props.match.params.state);
  }

  async componentDidMount() {
    this.props.updateLabel(this.props.match.params.state);
    try {
      await this.getData();
      this.setState({
        disabled: false
      });
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
                {this.props.state === "" ? (
                  <div />
                ) : (
                  Object.keys(this.props.data[this.props.state][0])
                    .sort()
                    .filter(field => {
                      return field !== "date" && field !== "state";
                    })
                    .map(dataField => {
                      let color =
                        this.state.keys[dataField] === undefined
                          ? "default"
                          : "primary";
                      return (
                        <Button
                          key={dataField}
                          className={this.props.classes.padIt}
                          onClick={e => {
                            return this.onButtonClick(dataField);
                          }}
                          variant="contained"
                          color={color}
                        >
                          {dataField}
                        </Button>
                      );
                    })
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <ButtonGroup
                    variant="text"
                    color="primary"
                    size="large"
                    aria-label="selection button group"
                    className={this.props.classes.center}
                  >
                    <Button
                      key="totals"
                      id="totals"
                      disabled={this.state.disabled}
                      onClick={e => {
                        this.setDefaultReport("totals");
                      }}
                    >
                      Trending Totals
                    </Button>
                    <Button
                      key="daily"
                      id="daily"
                      disabled={this.state.disabled}
                      onClick={e => {
                        this.setDefaultReport("daily");
                      }}
                    >
                      Trending Increases
                    </Button>
                    <Button
                      key="hospital"
                      id="hospital"
                      disabled={this.state.disabled}
                      onClick={e => {
                        this.setDefaultReport("hospital");
                      }}
                    >
                      Trending Hospital Totals
                    </Button>
                  </ButtonGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {Object.keys(this.state.keys).length < 1 ? (
                  <div />
                ) : (
                  <Paper className={this.props.classes.paperxl}>
                    {this.props.state === "" ? (
                      <div />
                    ) : (
                      <Chart
                        data={this.props.data[this.props.state]}
                        title={`Daily Statistics for ${this.props.state}`}
                        keys={Object.keys(this.state.keys)}
                      />
                    )}
                  </Paper>
                )}
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
  bindActionCreators(
    { getData, loadStates, updateState, updateLabel },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Home))
);
