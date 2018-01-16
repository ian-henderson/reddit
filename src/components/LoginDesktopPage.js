import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import Button from "material-ui/Button"
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from "material-ui/Typography"

const styles = {
  actions: {
    flexDirection: "row-reverse",
    marginTop: "150px"
  },
  card: {
    margin: "auto",
    minHeight: "500px",
    minWidth: "450px",
    padding: "40px"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  media: {
    height: "200px"
  },
  subheader: {
    marginTop: "25px"
  }
}

const LoginDesktopPage = props => {
  const { classes, authorizationURL } = props
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="display1" component="h2">
            Reddit Browser
          </Typography>
          <Typography type="subheader" className={classes.subheader} component="p">
            A progressive web app for Reddit
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button raised 
            color="primary" 
            href={authorizationURL} 
          >
            Login
          </Button>
          <Button 
            color="primary" 
            href="https://github.com/ian-henderson/reddit" 
            target="_blank"
          >
            View Source
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

LoginDesktopPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginDesktopPage)