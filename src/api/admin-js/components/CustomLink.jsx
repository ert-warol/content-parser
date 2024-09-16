import React from 'react'
import { ShowPropertyProps } from 'adminjs'
import { Box } from '@adminjs/design-system'

const CustomLink = (props) => {
	return (
		<div id="custom-link">
			<a href={props.record.params.link} >See announcement to https://www.mobile.bg/</a>
		</div>
	)
}

export default CustomLink