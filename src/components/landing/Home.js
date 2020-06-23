import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Footer from "../Footer";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { updateState, updateLabel } from "../../redux/actions";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
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
  center: {
    flexGrow: 1,
    justifyContent: "center"
  },
  paperxl: {
    display: "flex",
    flexDirection: "column",
    height: "68vh"
  },
  padIt: {
    marginTop: "5px",
    marginBottom: "2px",
    marginLeft: "4px",
    marginRight: "1px"
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
    return (
      <main className={this.props.classes.content}>
        <div className={this.props.classes.appBarSpacer} />
        <Container maxWidth="xl" className={this.props.classes.container}>
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
              {Object.keys(this.props.data[this.props.state][0])
                .sort()
                .filter(field => {
                  return (
                    field !== "date" &&
                    field !== "state" &&
                    field !== "hash" &&
                    field !== "dateObj" &&
                    field !== "dateChecked" &&
                    field !== "pending" &&
                    field !== "states" &&
                    field !== "dataQualityGrade" &&
                    field !== "checkTimeEt" &&
                    field !== "dateModified" &&
                    field !== "fips" &&
                    field !== "grade" &&
                    field !== "commercialScore" &&
                    field !== "score" &&
                    field !== "total" &&
                    field !== "negative" &&
                    field !== "negativeIncrease" &&
                    field !== "negativeScore" &&
                    field !== "negativeTestsViral" &&
                    field !== "posNeg" &&
                    field !== "negativeRegularScore" &&
                    field !== "lastUpdateEt" &&
                    field !== "positiveScore" &&
                    field !== "positiveCasesViral" &&
                    field !== "positiveTestsViral" &&
                    field !== "totalTestsViral" &&
                    field !== "hospitalized" &&
                    field !== "lastModified" &&
                    !field.match(new RegExp("percent", "ig"))
                  );
                })
                .map(dataField => {
                  let color =
                    this.state.keys[dataField] === undefined
                      ? "default"
                      : "primary";
                  return (
                    <Button
                      key={dataField}
                      size="small"
                      className={this.props.classes.padIt}
                      onClick={e => {
                        return this.onButtonClick(dataField);
                      }}
                      variant="contained"
                      color={color}
                    >
                      {dataField.replace(/([A-Z])/g, " $1").trim()}
                    </Button>
                  );
                })}
              {Object.keys(this.props.data[this.props.state][0])
                .sort()
                .filter(field => {
                  return field.match(new RegExp("percent", "ig"));
                })
                .map(dataField => {
                  let color =
                    this.state.keys[dataField] === undefined
                      ? "default"
                      : "primary";
                  return (
                    <Button
                      key={dataField}
                      size="small"
                      className={this.props.classes.padIt}
                      onClick={e => {
                        return this.onButtonClick(dataField);
                      }}
                      variant="contained"
                      color={color}
                    >
                      {dataField.replace(/([A-Z])/g, " $1").trim()}
                    </Button>
                  );
                })}
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
                <Paper className={this.props.classes.paperxl}>
                  {this.props.state === "" ? (
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
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
        <Footer />
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
