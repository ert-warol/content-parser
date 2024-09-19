import React from 'react'
import { ShowPropertyProps } from 'adminjs'
import { Box } from '@adminjs/design-system'

const CustomTitle = (props) => {
	return (
		<div id="custom-link">
			<span>{props.record.params.title}</span><br/><br/>
			<a href={props.record.params.link} target="_blank" >
				<div style={{
					padding: '5px',
					'background-color': 'darkgray',
					color: 'white',
					'border-radius': '5px',
					'text-align': 'center',
				}}>
					<span>See announcement to https:</span>
					<span>www.mobile.bg</span>
				</div>
			</a>
		</div>
	)
}

export default CustomTitle