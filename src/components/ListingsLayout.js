import React from 'react'
import { withRouter } from 'react-router-dom'
import { parse } from 'query-string'
import Divider from 'material-ui/Divider'
import DropDownMenu from 'material-ui/DropDownMenu'
import FontIcon from 'material-ui/FontIcon'
import MenuItem from 'material-ui/MenuItem'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import { white } from 'material-ui/styles/colors'
import ListingFeed from '../components/ListingFeed'
import Loading from '../components/Loading'
import Nav from '../containers/Nav'
import PageOuterContainer from '../components/PageOuterContainer'
import { paramsEndpoint } from '../utils'
import { darkBlack } from 'material-ui/styles/colors'

const styles = {
  feed: {
    margin: 'auto',
    maxWidth: '588px'
  },
  sorting: {
    paddingLeft: '8px'
  },
  sortingIcon: {
    color: darkBlack,
    fontSize: '15pt',
    marginTop: '6px',
    paddingLeft: '0'
  },
  sortingUnderline: {
    left: '-16px'
  },
  toolbar: {
    backgroundColor: 'inherit'
  }
}

// TODO: add sorting dropdown before feed
class ListingsLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sorting: null }
    this.handleSorting = this.handleSorting.bind(this)
  }

  componentWillMount() {
    this.setState({ sorting: this.props.match.params.sorting || 'hot' })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.sorting !== this.props.match.params.sorting) {
      this.setState({ sorting: this.props.match.params.sorting || 'hot' })
    }
  }

  handleSorting(event, key, value) {
    const endpoint = paramsEndpoint(Object.assign({},
      this.props.match.params,
      parse(this.props.location.search),
      { sorting: value }
    ))
    this.props.history.push(endpoint)
  }

  render() {
    return (
      <div>
        <Nav />
        <PageOuterContainer>
          <div style={styles.feed}>
            <Toolbar style={styles.toolbar}>
              <ToolbarGroup firstChild={true}>
                <FontIcon className='material-icons' style={styles.sortingIcon}>
                  sort
                </FontIcon>
                <DropDownMenu
                  value={this.state.sorting}
                  onChange={this.handleSorting}
                  labelStyle={styles.sorting}
                  underlineStyle={styles.sortingUnderline}>
                  <MenuItem value='hot' primaryText='Hot' />
                  <MenuItem value='new' primaryText='New' />
                  <MenuItem value='rising' primaryText='Rising' />
                  <MenuItem value='controversial' primaryText='Controversial' />
                  <MenuItem value='top' primaryText='Top' />
                </DropDownMenu>
              </ToolbarGroup>
            </Toolbar>
            <Divider />
            {Object.keys(this.props.pageData).length > 0
              ? <ListingFeed
                  pages={this.props.pages}
                  pageData={this.props.pageData}
                />
              : <Loading />
            }
          </div>
        </PageOuterContainer>
      </div>
    )
  }
}

export default withRouter(ListingsLayout)