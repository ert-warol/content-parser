import React from 'react'
import { useFormikContext, Field } from 'formik'
import { Icon } from '@adminjs/design-system'
import { styled } from '@adminjs/design-system/styled-components'

const DeleteIcon = styled(Icon)`
  position: absolute;
  top: 30%;
  right: 24px;
  z-index: 10;
  cursor: pointer;
`
const Select = ({
  name,
  onChange,
  optionValues = [],
  clearable,
  placeholder = '',
  flex = true,
}) => {
  const { values, setFieldValue } = useFormikContext()
  const defaultOnChange = e => {
    setFieldValue(name, e.target.value)
  }

  return (
    <div className={['relative', flex ? 'flex-1' : ''].join(' ')}>
      <Field
        as="select"
        name={name}
        className={[
          !values[name] ? 'text-gray' : '',
          'w-full',
          'custom-field',
        ].join(' ')}
        onChange={onChange || defaultOnChange}
      >
        <option disabled hidden value="">
          {placeholder}
        </option>
        {optionValues.map(v => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </Field>
      {clearable && values[name] && (
        <DeleteIcon
          icon="X"
          size={14}
          className="select-icon"
          onClick={() => setFieldValue(name, '')}
        />
      )}
    </div>
  )
}

export default Select
