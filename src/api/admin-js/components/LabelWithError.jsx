import React from 'react'
import { ErrorMessage } from 'formik'

const LabelWithError = ({ label, field }) => {
  return (
    <p className="custom-label">
      <span>{label}</span>
      <ErrorMessage name={field} component="span" className="error-message" />
    </p>
  )
}

export default LabelWithError
