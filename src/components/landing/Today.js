import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Table from "../reports/Table";
import { withStyles } from "@material-ui/core/styles";
import { getData, loadStates, updateLabel } from "../../redux/actions";

const useStyles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1)
  },
  paperxl: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    height: "64vh"
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
      tableData: [{ "loading...": "loading..." }]
    };

    this.getData = this.getData.bind(this);
  }

  async getData(params) {
    try {
      await this.props.getData();
      this.props.loadStates(this.props.data);
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    this.props.updateLabel(`Today's Data`)
    if (this.props.data === undefined) {
      try {
        await this.getData();
      } catch (e) {
        console.log(e);
      }
    }

    let { data } = this.props;
    let tabdat = [];
    for (let key of Object.keys(this.props.data)) {
      if (key !== "United States") {
        let {
          state,
          positive,
          recovered,
          death,
          positiveIncrease,
          deathIncrease,
          negativeIncrease,
          hospitalizedCurrently
        } = data[key][data[key].length - 1];
        let row = {
          state,
          positive,
          recovered,
          death,
          positiveIncrease,
          deathIncrease,
          negativeIncrease,
          hospitalizedCurrently
        };
        row = JSON.parse(JSON.stringify(data[key][data[key].length - 1]));
        delete row.date
        tabdat.push(row);
      }
    }
    this.setState({
      tableData: tabdat
    });
  }

  render() {
    return (
      <div>
        <main className={this.props.classes.content}>
          <div className={this.props.classes.appBarSpacer} />
          <Container maxWidth="lg" className={this.props.classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Table
                  data={this.state.tableData}
                  title={`Today's stats`}
                  key={"state"}
                />
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
});

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ getData, loadStates, updateLabel }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Home))
);
