import React from 'react'
import { styled } from '@adminjs/design-system/styled-components'

const TitleWrapper = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
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

const CustomTitle = props => {
  const onLinkClick = e => {
    e.stopPropagation()
    window.open(props.record.params.link, '_blank')
  }
  return (
    <TitleWrapper id="custom-link">
      <h3>{props.record.params.title}</h3>
      <LinkWrapper onClick={onLinkClick}>
        <span>See announcement to https://</span>
        <span>www.mobile.bg</span>
      </LinkWrapper>
    </TitleWrapper>
  )
}

export default CustomTitle
