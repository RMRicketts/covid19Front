import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import GetAppIcon from "@material-ui/icons/GetApp";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import GitHubIcon from "@material-ui/icons/GitHub";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Link } from "react-router-dom";
import { updateState, updateLabel } from "../../redux/actions";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}));

const Patreon = props => {
  return (
    <SvgIcon {...props}>
      <path d="m0 .5h4.219v23h-4.219z" />
      <path d="m15.384.5c-4.767 0-8.644 3.873-8.644 8.633 0 4.75 3.877 8.61 8.644 8.61 4.754 0 8.616-3.865 8.616-8.61 0-4.759-3.863-8.633-8.616-8.633z" />
    </SvgIcon>
  );
};

const Navbar = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  let handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  let handleClose = event => {
    setAnchorEl(null);
  };

  let clickSourceCode = event => {
    window.open("https://github.com/RMRicketts/covid19Front");
  };

  let clickDataSource = event => {
    window.open("https://covidtracking.com/");
  };

  let clickPatreon = event => {
    window.open("https://www.patreon.com/RobertRicketts");
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
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Menu"
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
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
                  onClick={e => {
                    props.updateLabel("Today");
                    handleClose(e);
                  }}
                  component={Link}
                  to={`/reports/data/today`}
                >{`Today`}</MenuItem>
                {props.states.map(state => {
                  return (
                    <MenuItem
                      key={state}
                      onClick={e => {
                        props.updateState(state);
                        props.updateLabel(state);
                        handleClose(e);
                      }}
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
          <Typography variant="h6" className={classes.title}>
            {props.label}
          </Typography>
          <Button color="inherit" onClick={clickDataSource}>
            Data
          </Button>
          {props.data === undefined ? (
            <div />
          ) : (
            <Button onClick={downloadData} color="inherit" variant="outlined">
              JSON
              <GetAppIcon />
            </Button>
          )}
          <IconButton color="inherit" onClick={clickPatreon}>
            <Patreon />
          </IconButton>
          <IconButton color="inherit" onClick={clickSourceCode}>
            <GitHubIcon />
          </IconButton>
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

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ updateState, updateLabel }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
