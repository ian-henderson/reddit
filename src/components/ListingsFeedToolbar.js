import React from 'react'
import PropTypes from 'prop-types'
import DropDownMenu from 'material-ui/DropDownMenu'
import FontIcon from 'material-ui/FontIcon'
import MenuItem from 'material-ui/MenuItem'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import { grey600 } from 'material-ui/styles/colors'

const styles = {
  sortingIcon: {
    color: grey600,
    fontSize: '12pt',
    paddingLeft: '16px',
  },
  sortingLabel: {
    color: grey600,
    fontSize: '10pt',
    paddingLeft: '8px',
    top: '-4px'
  },
  toolbar: {
    backgroundColor: 'inherit',
    height: '40px',
    top: '46px'
  }
}

const ListingFeedToolbar = props =>
  <Toolbar style={styles.toolbar}>
    <ToolbarGroup firstChild={true}>
      {/* Sorting Menu */}
      <FontIcon className='material-icons' style={styles.sortingIcon}>
        sort
      </FontIcon>
      <DropDownMenu
        value={props.sortingValue}
        onChange={props.handleSorting}
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

ListingFeedToolbar.propTypes = {
  handleSorting: PropTypes.func.isRequired,
  sortingValue: PropTypes.string
}

export default ListingFeedToolbar