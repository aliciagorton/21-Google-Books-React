import React from "react";
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'; 

const useStyles = makeStyles({
  navButton: {
    color: "white",
    "&:hover": {
      color: "#eeeeee"
    }
  },
  title: {
    flexGrow: 1
  },
  nav: {
    background: "#2196f3"
  }
})

function Nav() {

  const classes = useStyles();

  return (
    <AppBar className={classes.nav} position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          Google Books Search
        </Typography>
        <Typography>
            <Button className={classes.navButton} href="/">Search</Button>
        </Typography>
        <Typography>
            <Button className={classes.navButton} href="/saved">Saved</Button>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;