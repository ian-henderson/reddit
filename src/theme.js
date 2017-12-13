import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { darkBlack, grey600, white } from 'material-ui/styles/colors'

export default getMuiTheme({
  appBar: {
    color: white,
    textColor: darkBlack,
    height: 46
  },
  palette: {
    primary1Color: grey600,
    accent1Color: '#FF4500'
  }
})