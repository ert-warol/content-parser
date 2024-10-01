import React from 'react'
import { styled } from '@adminjs/design-system/styled-components'

const LinkWrapper = styled.div`
  padding: 5px;
  background-color: darkgray;
  color: white;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const AnnouncementLink = props => {
  const onLinkClick = e => {
    e.stopPropagation()
    window.open(props.link, '_blank')
  }

  return (
    <LinkWrapper onClick={onLinkClick}>
      <div>See announcement to </div>
      <div>https://www.mobile.bg</div>
    </LinkWrapper>
  )
}

export default AnnouncementLink
