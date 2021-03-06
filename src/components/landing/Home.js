import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Footer from "../Footer";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { updateState, updateLabel } from "../../redux/actions";
import { MobileView } from "react-device-detect";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Chart from "../reports/Chart.js";

const useStyles = theme => {
  return {
    appBarSpacer: theme.mixins.toolbar,
    button: {
      margin: theme.spacing(1)
    },
    input: {
      display: "none"
    },
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    pushToEnd: {
      display: "flex",
      justifyContent: "flex-end"
    },
    flex: {
      display: "flex",
      marginTop: "auto",
      flexGrow: 4
    },
    buttonRoot: {
      textTransform: "none",
      padding: "5px 10px"
    },
    center: {
      flexGrow: 1,
      justifyContent: "center"
    },
    content: {
      background: "#f0f0f0",
      flexGrow: 1,
      height: "89vh"
    }
  };
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: {},
      daysBack: 91,
      selectedDate: new Date(Date.now() - 91 * 24 * 60 * 60 * 1000),
      defaultReports: {
        clear: {},
        totals: {
          active: true,
          death: true,
          positive: true,
          recovered: true
        },
        daily: {
          deathIncrease: true,
          positiveIncrease: true,
          totalTestResultsIncrease: true
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
    this.handleDaysBack = this.handleDaysBack.bind(this);
  }

  async getData(params) {
    this.props.updateState(this.props.match.params.state);
    this.setState({
      keys: {
        active: true,
        death: true,
        positive: true,
        recovered: true
      }
    });
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

  handleDaysBack(date) {
    let diff = moment().diff(moment(date), "days");
    if (diff > 700) {
      return;
    }
    this.setState({
      daysBack: diff,
      selectedDate: date
    });
  }

  setDefaultReport(reportName) {
    let report = { ...this.state.defaultReports[reportName] };
    this.setState({
      keys: report
    });
  }

  async componentDidMount() {
    this.props.updateLabel(this.props.match.params.state);
    try {
      await this.getData();
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (
      !this.props.data ||
      this.props.data[this.props.match.params.state] === undefined
    ) {
      return <div />;
    }

    const colors = [
      "#845EC2",
      "#D65DB1",
      "#FF6F91",
      "#FF9671",
      "#FFC75F",
      "#00E1F1",
      "#06EDD4",
      "#73F6AF",
      "#B8FA8A",
      "#F9F871"
    ];

    return (
      <main className={this.props.classes.content}>
        <div className={this.props.classes.appBarSpacer} />
        <Container maxWidth="lg" className={this.props.classes.container}>
          <Grid container spacing={3}>
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
                    key="clear"
                    id="clear"
                    onClick={e => {
                      this.setDefaultReport("clear");
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    key="totals"
                    id="totals"
                    onClick={e => {
                      this.setDefaultReport("totals");
                    }}
                  >
                    Totals
                  </Button>
                  <Button
                    key="daily"
                    id="daily"
                    onClick={e => {
                      this.setDefaultReport("daily");
                    }}
                  >
                    Daily
                  </Button>
                  <Button
                    key="hospital"
                    id="hospital"
                    onClick={e => {
                      this.setDefaultReport("hospital");
                    }}
                  >
                    Hospitals
                  </Button>
                </ButtonGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={10}>
              <Grid container justify="space-around" spacing={1}>
                {Object.keys(this.props.data[this.props.state][0])
                  .sort()
                  .filter(field => {
                    return (
                      (field === "active" ||
                        field === "death" ||
                        field === "positive" ||
                        field === "recovered" ||
                        field === "hospitalizedCurrently" ||
                        field === "inIcuCurrently" ||
                        field === "onVentilatorCurrently" ||
                        field === "totalTestResults") &&
                      !field.match(new RegExp("percent", "ig"))
                    );
                  })
                  .map(dataField => {
                    return (
                      <Grid item key={dataField}>
                        <Button
                          size="small"
                          classes={{ root: this.props.classes.buttonRoot }}
                          onClick={e => {
                            return this.onButtonClick(dataField);
                          }}
                          variant="contained"
                          style={
                            this.state.keys[dataField]
                              ? {
                                  backgroundColor:
                                    colors[
                                      Object.keys(this.state.keys).indexOf(
                                        dataField
                                      ) % colors.length
                                    ]
                                }
                              : {}
                          }
                        >
                          {dataField.charAt(0).toUpperCase() +
                            dataField
                              .replace(/([A-Z])/g, " $1")
                              .trim()
                              .replace("total ", "")
                              .replace("Currently", "Now")
                              .replace("Ventilator", "Vent")
                              .replace(" Results", "ing")
                              .slice(1)}
                        </Button>
                      </Grid>
                    );
                  })}
              </Grid>
              <Grid container justify="space-around" spacing={1}>
                {Object.keys(this.props.data[this.props.state][0])
                  .sort()
                  .filter(field => {
                    return (
                      (field === "positiveIncrease" ||
                        field === "deathIncrease" ||
                        field === "totalTestResultsIncrease") &&
                      !field.match(new RegExp("percent", "ig"))
                    );
                  })
                  .map(dataField => {
                    return (
                      <Grid item key={dataField}>
                        <Button
                          size="small"
                          classes={{ root: this.props.classes.buttonRoot }}
                          onClick={e => {
                            return this.onButtonClick(dataField);
                          }}
                          variant="contained"
                          style={
                            this.state.keys[dataField]
                              ? {
                                  backgroundColor:
                                    colors[
                                      Object.keys(this.state.keys).indexOf(
                                        dataField
                                      ) % colors.length
                                    ]
                                }
                              : {}
                          }
                        >
                          {dataField.charAt(0).toUpperCase() +
                            dataField
                              .replace(/([A-Z])/g, " $1")
                              .trim()
                              .replace("total ", "")
                              .replace(" Results", "ing")
                              .slice(1)}
                        </Button>
                      </Grid>
                    );
                  })}
              </Grid>
              <Grid container justify="space-around" spacing={1}>
                {Object.keys(this.props.data[this.props.state][0])
                  .sort()
                  .filter(field => {
                    return field.match(new RegExp("percent", "ig"));
                  })
                  .map(dataField => {
                    return (
                      <Grid item key={dataField}>
                        <Button
                          size="small"
                          classes={{ root: this.props.classes.buttonRoot }}
                          onClick={e => {
                            return this.onButtonClick(dataField);
                          }}
                          variant="contained"
                          style={
                            this.state.keys[dataField]
                              ? {
                                  backgroundColor:
                                    colors[
                                      Object.keys(this.state.keys).indexOf(
                                        dataField
                                      ) % colors.length
                                    ]
                                }
                              : {}
                          }
                        >
                          {dataField
                            .replace(/([A-Z])/g, " $1")
                            .trim()
                            .replace("percent", "%")}
                        </Button>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
            <Grid className={this.props.classes.pushToEnd} item xs={12} md={2}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  className={this.props.classes.flex}
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Since"
                  value={this.state.selectedDate}
                  onChange={this.handleDaysBack}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              {Object.keys(this.state.keys).length < 1 ? (
                <div />
              ) : (
                  <Chart
                    data={this.props.data[this.props.state].slice(
                      -this.state.daysBack
                    )}
                    title={`${this.props.state}`}
                    keys={Object.keys(this.state.keys)}
                  />
              )}
            </Grid>
          </Grid>
        </Container>
        <MobileView>
          <Footer />
        </MobileView>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  data: state.getData.covidData,
  state: state.updateState.state
});

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ updateState, updateLabel }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(useStyles)(Home))
);
