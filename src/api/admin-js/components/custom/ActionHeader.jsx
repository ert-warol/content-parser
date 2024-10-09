import React, { useEffect, useState, memo } from 'react'
import { createRoot } from 'react-dom/client'

import AnnouncementsRepository from '../../repositories/AnnouncementsRepository'

const CustomActionHeader = props => {
  const [prices, setPrices] = useState({})

  useEffect(() => {
    AnnouncementsRepository.getPrices({
      onSuccess: res => setPrices(res?.data || {}),
    }).catch(console.error)
  }, [])

  useEffect(() => {
    if (Object.keys(prices).length && props.action.name === 'list') {
      const selfElement = document.querySelector(
        'section[data-css="announcements-list-action-header"]',
      )
      const elem = selfElement.appendChild(document.createElement('div'))
      createRoot(elem).render(<Prices prices={prices} />)
    }
  }, [prices])

  return props.OriginalComponent(props)
}

const Prices = memo(function Prices({ prices }) {
  return (
    <div className="flex gap-20 mb-8 text-xl">
      <div>
        <span>Minimal price:</span>{' '}
        <span className="font-bold">{prices?.min_price || 0}</span>
      </div>
      <div>
        <span>Maximal price:</span>{' '}
        <span className="font-bold">{prices?.max_price || 0}</span>
      </div>
      <div>
        <span>Average price:</span>{' '}
        <span className="font-bold">{prices?.avg_price || 0}</span>
      </div>
    </div>
  )
})

export default CustomActionHeader
