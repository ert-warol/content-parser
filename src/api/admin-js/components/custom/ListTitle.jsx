import React from 'react'
import { styled } from '@adminjs/design-system/styled-components'
import AnnouncementLink from '../AnnouncementLink'

const Wrapper = styled.div`
  max-width: 250px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const HeaderWrapper = styled.h3`
  font-size: 1.2em;
  line-height: 1.4em;
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
