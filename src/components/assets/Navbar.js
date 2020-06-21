import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import GetAppIcon from "@material-ui/icons/GetApp";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  downloadButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  let handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  let handleClose = event => {
    setAnchorEl(null);
  };

  let clickLogin = event => {
    props.history.push("/donate");
  };

  let downloadData = event => {
    let data = new Blob([JSON.stringify(props.data, null, 2)], {
      type: "text/json"
    });
    let jsonURL = window.URL.createObjectURL(data);
    let tempLink = document.createElement("a");
    tempLink.href = jsonURL;
    tempLink.setAttribute("download", "covidData.json");
    tempLink.click();
  };

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          <Button
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            {props.label === "" ? "Select A State" : props.label}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {props.states.length === 0 ? (
              <div />
            ) : (
              <div>
                <MenuItem
                  key="today"
                  onClick={handleClose}
                  component={Link}
                  to={`/reports/data/today`}
                >{`Today's Data`}</MenuItem>
                {props.states.map(state => {
                  return (
                    <MenuItem
                      key={state}
                      onClick={handleClose}
                      component={Link}
                      to={`/reports/trends/${state}`}
                    >
                      {state}
                    </MenuItem>
                  );
                })}
              </div>
            )}
          </Menu>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ cursor: "pointer" }}
            onClick={e => {
              props.history.push("/");
            }}
          >
            Covid Reports
          </Typography>
          {props.data === undefined ? (
            <div />
          ) : (
            <Button
              onClick={downloadData}
              color="inherit"
              variant="outlined"
              className={classes.downloadButton}
            >
              Download Data
              <GetAppIcon />
            </Button>
          )}
          <Button
            color="inherit"
            className={classes.downloadButton}
            onClick={clickLogin}
          >
            Donate
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  label: state.updateState.label,
  states: state.states.states,
  data: state.getData.covidData
});

export default withRouter(connect(mapStateToProps)(Navbar));
