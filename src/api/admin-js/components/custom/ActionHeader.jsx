import React from 'react'

const CustomActionHeader = props => {
  console.log('props', props)
  return props.OriginalComponent(props)
}

export default CustomActionHeader
