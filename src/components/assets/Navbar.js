import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            {props.state}
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
              props.states.map(state => {
                return (
                  <MenuItem
                    key={state}
                    onClick={handleClose}
                    component={Link}
                    to={`/reports/${state}`}
                  >
                    {state}
                  </MenuItem>
                );
              })
            )}
          </Menu>
          <Typography variant="h6" className={classes.title}>
            Covid Reports
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => ({
  state: state.updateState.state,
  states: state.states.states
});

export default withRouter(connect(mapStateToProps)(Navbar));
