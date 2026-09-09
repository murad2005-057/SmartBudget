import React from 'react'
import { CustomInput } from '../../common/CustomInput'

export function StepExpenses({ question, value, onChange, onClear, inputId }) {
  return (
    <div className="step-content">
      <h4 className="question-title">{question}</h4>
      <div className="step-input-block">
        <CustomInput
          id={inputId}
          value={value}
          onChange={onChange}
          onClear={onClear}
          placeholder="0"
        />
      </div>
    </div>
  )
}
