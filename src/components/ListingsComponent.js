import React from 'react'
import PropTypes from 'prop-types'
import ListingsNav from './ListingsNav'
import PageContainer from './PageContainer'

const ListingsComponent = props =>
  <div>
    <ListingsNav title={props.title} />
    <PageContainer>
      {props.pages.length}<br/>
      {props.pageData.length}
    </PageContainer>
  </div>

ListingsComponent.propTypes = {
  title: PropTypes.string.isRequired
}

export default ListingsComponent