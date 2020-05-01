import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Table from "../reports/Table";
import { withStyles } from "@material-ui/core/styles";
import { getData, loadStates, updateState } from "../../redux/actions";
import DisplayTable from "../reports/Table.js";

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
      tableData: []
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
    try {
      await this.getData();
    } catch (e) {
      console.log(e);
    }
    let tabdat = [];
    let { data, state } = this.props;
    for (let key of Object.keys(this.props.data)) {
      if (key !== "United States") {
        tabdat.push(data[state][data[state].length - 1]);
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
                <Paper className={this.props.classes.paperxl}>
                  <Table data={this.tableData} title={`Today's stats`} />
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
  connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Home))
);
