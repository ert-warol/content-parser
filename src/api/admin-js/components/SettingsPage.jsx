import React from 'react'

const SettingsPage = props => {
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/options/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
      console.log('Record saved:', response.data)
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
