import React from 'react'
import { OptionButton } from '../../common/OptionButton'
import { CustomInput } from '../../common/CustomInput'

export function StepDebts({
  hasDebts,
  debtAmount,
  onSelectOption,
  onAmountChange,
  onAmountClear
}) {
  return (
    <div className="step-content">
      <h4 className="question-title">Borc və ya kredit ödənişiniz var mı?</h4>

      <div className="option-buttons-row">
        <OptionButton
          label="Bəli"
          selected={hasDebts === 'Bəli'}
          onClick={() => onSelectOption('Bəli')}
        />
        <OptionButton
          label="Xeyr"
          selected={hasDebts === 'Xeyr'}
          onClick={() => onSelectOption('Xeyr')}
        />
      </div>

      {hasDebts === 'Bəli' && (
        <div className="conditional-input-container">
          <label htmlFor="debt-amount-input" className="sub-label">
            Məbləği daxil edin:
          </label>
          <CustomInput
            id="debt-amount-input"
            value={debtAmount}
            onChange={onAmountChange}
            onClear={onAmountClear}
            placeholder="0"
          />
        </div>
      )}
    </div>
  )
}
