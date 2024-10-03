// import React, { useEffect } from 'react'
// import { useRecords } from 'adminjs'
// import { api } from '../../services/api-service'

const CustomActionHeader = props => {
  // useEffect(() => {
  //   api().get('admin/api/resources/announcements/actions/list?perPage=9999')
  // }, [])
  // console.log('props', props)
  // console.log('useRecords(props.resource.id)', useRecords(props.resource.id))
  return props.OriginalComponent(props)
}

export default CustomActionHeader
