import React from 'react'
import { styled } from '@adminjs/design-system/styled-components'
import AnnouncementLink from '../AnnouncementLink'

const Wrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 15px 0;
`
const HeaderWrapper = styled.h3`
  font-size: 1.4em;
  line-height: 1.6em;
`

const CustomListTitle = props => {
  return (
    <Wrapper>
      <HeaderWrapper>{props.record.params.title}</HeaderWrapper>
      <AnnouncementLink link={props.record.params.link} />
    </Wrapper>
  )
}

export default CustomListTitle
