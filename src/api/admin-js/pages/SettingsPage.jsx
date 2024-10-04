import React from 'react'
import SelectsRepository from '../repositories/SelectsRepository'

const SettingsPage = () => {
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const result = await SelectsRepository.createOptions()
      console.log('result', result)
    } catch (error) {
      console.error('Error saving record:', error)
    }
  }

  return (
    <div id="settings-page">
      <h2>
        <span>Settings</span>
      </h2>
      <br />
      <button type="submit" onClick={handleSubmit}>
        Init
      </button>
    </div>
  )
}

export default SettingsPage
