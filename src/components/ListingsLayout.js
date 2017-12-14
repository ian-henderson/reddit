import React from 'react'
import { withRouter } from 'react-router-dom'
import { parse } from 'query-string'
import DropDownMenu from 'material-ui/DropDownMenu'
import FontIcon from 'material-ui/FontIcon'
import MenuItem from 'material-ui/MenuItem'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import { darkBlack } from 'material-ui/styles/colors'
import ListingFeed from '../components/ListingFeed'
import Nav from '../containers/Nav'
import PageOuterContainer from '../components/PageOuterContainer'
import { listingsEndpoint } from '../utils'

const styles = {
  feed: {
    margin: 'auto',
    maxWidth: '588px'
  },
  sortingLabel: {
    paddingLeft: '8px',
    top: '-4px'
  },
  sortingIcon: {
    color: darkBlack,
    fontSize: '15pt',
    paddingLeft: '16px',
  },
  toolbar: {
    backgroundColor: 'inherit',
    height: '46px',
    top: '46px'
  }
}

class ListingsLayout extends React.PureComponent {
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
    const endpoint = listingsEndpoint(Object.assign({},
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
                {/* Sorting Menu */}
                <FontIcon className='material-icons' style={styles.sortingIcon}>
                  sort
                </FontIcon>
                <DropDownMenu
                  value={this.state.sorting}
                  onChange={this.handleSorting}
                  labelStyle={styles.sortingLabel}
                  iconButton={null}>
                  <MenuItem value='hot' primaryText='Hot' />
                  <MenuItem value='new' primaryText='New' />
                  <MenuItem value='rising' primaryText='Rising' />
                  <MenuItem value='controversial' primaryText='Controversial' />
                  <MenuItem value='top' primaryText='Top' />
                </DropDownMenu>
              </ToolbarGroup>
            </Toolbar>
            <ListingFeed
              isFetching={this.props.isFetching}
              pages={this.props.pages}
              pageData={this.props.pageData}
            />
          </div>
        </PageOuterContainer>
      </div>
    )
  }
}

export default withRouter(ListingsLayout)