import React from 'react'
import Nav from './Nav'
import PageContainer from './PageContainer'

const Subreddit = props =>
  <div>
    <Nav title={props.title ? `r/${props.title}` : 'reddit'} />
    <PageContainer>
    </PageContainer>
  </div>

export default Subreddit