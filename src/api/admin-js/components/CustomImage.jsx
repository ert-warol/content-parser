import React from 'react'
import { ShowPropertyProps } from 'adminjs'
import { Box } from '@adminjs/design-system'

const CustomImage = (props) => {
	return (
		<div id="custom-component">
			<img src={props.record.params.img} alt={props.record.params.title} />
		</div>
	)
}

export default CustomImage