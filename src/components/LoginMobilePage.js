import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import Button from "material-ui/Button"
import Typography from "material-ui/Typography"

const styles = {
  button: {
    margin: "10px"
  },
  buttons: {
    marginTop: "150px",
    textAlign: "right"
  },
  container: {
    padding: "50px"
  },
  subheader: {
    marginTop: "25px"
  }
}

const LoginMobilePage = props => {
  const { classes, authorizationURL } = props
  return (
    <div className={classes.container}>
      <Typography type="display1" component="h2">
        Reddit Browser
      </Typography>
      <Typography type="subheader" className={classes.subheader} component="p">
        A progressive web app for Reddit
      </Typography>
      <div class={classes.buttons}>
        <Button
          className={classes.button} 
          color="primary" 
          href="https://github.com/ian-henderson/reddit"
          target="_blank"
        >
          View Source
        </Button>
        <Button raised
          className={classes.button} 
          color="primary" 
          href={authorizationURL}
        >
          Login
        </Button>
      </div>
    </div>
  )
}

LoginMobilePage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginMobilePage)