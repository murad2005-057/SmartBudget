import React from 'react'
import { CustomInput } from '../../common/CustomInput'

export function StepHousing({ value, onChange, onClear }) {
  return (
    <div className="step-content">
      <h4 className="question-title">Aylıq kirayə və ya ipoteka xərciniz nə qədərdir?</h4>
      <div className="step-input-block">
        <CustomInput
          id="housing-input"
          value={value}
          onChange={onChange}
          onClear={onClear}
          placeholder="0"
        />
      </div>
    </div>
  )
}
