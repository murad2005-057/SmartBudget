import React from 'react'
import { CustomInput } from '../../common/CustomInput'

export function StepSavingsGoal({ value, onChange, onClear }) {
  return (
    <div className="step-content">
      <h4 className="question-title">Aylıq qənaət hədəfiniz nə qədərdir?</h4>
      <div className="step-input-block">
        <CustomInput
          id="savings-input"
          value={value}
          onChange={onChange}
          onClear={onClear}
          placeholder="0"
        />
      </div>
    </div>
  )
}
