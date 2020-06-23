import React from "react";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
  tall: {
    height: "15vh"
  }
});

class Footer extends React.Component {
  render() {
    return <div className={this.props.classes.tall} />;
  }
}

export default withStyles(useStyles)(Footer);
