import React from 'react'
import { ProgressBar } from './ProgressBar'
import { FormNavigation } from './FormNavigation'
import { StepSalary } from './steps/StepSalary'
import { StepExtraIncome } from './steps/StepExtraIncome'
import { StepHousing } from './steps/StepHousing'
import { StepExpenses } from './steps/StepExpenses'
import { StepSavingsGoal } from './steps/StepSavingsGoal'
import { StepDebts } from './steps/StepDebts'
import { StepGoal } from './steps/StepGoal'
import { StepSummary } from './steps/StepSummary'

export function QuestionCard({ onboarding }) {
  const {
    currentStep,
    totalSteps,
    userName,
    formData,
    updateField,
    clearField,
    nextStep,
    prevStep,
    isCurrentStepValid
  } = onboarding

  const isCompleted = currentStep > totalSteps

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepSalary
            salary={formData.salary}
            onChange={(val) => updateField('salary', val)}
            onClear={() => clearField('salary')}
          />
        )
      case 2:
        return (
          <StepExtraIncome
            hasExtraIncome={formData.hasExtraIncome}
            extraIncome={formData.extraIncome}
            onSelectOption={(option) => updateField('hasExtraIncome', option)}
            onAmountChange={(val) => updateField('extraIncome', val)}
            onAmountClear={() => clearField('extraIncome')}
          />
        )
      case 3:
        return (
          <StepHousing
            value={formData.housing}
            onChange={(val) => updateField('housing', val)}
            onClear={() => clearField('housing')}
          />
        )
      case 4:
        return (
          <StepExpenses
            question="Kommunal xərcləriniz nə qədərdir?"
            inputId="utilities-input"
            value={formData.utilities}
            onChange={(val) => updateField('utilities', val)}
            onClear={() => clearField('utilities')}
          />
        )
      case 5:
        return (
          <StepExpenses
            question="Qida və market xərcləriniz nə qədərdir?"
            inputId="groceries-input"
            value={formData.groceries}
            onChange={(val) => updateField('groceries', val)}
            onClear={() => clearField('groceries')}
          />
        )
      case 6:
        return (
          <StepExpenses
            question="Nəqliyyat xərcləriniz nə qədərdir?"
            inputId="transport-input"
            value={formData.transport}
            onChange={(val) => updateField('transport', val)}
            onClear={() => clearField('transport')}
          />
        )
      case 7:
        return (
          <StepSavingsGoal
            value={formData.savingsGoal}
            onChange={(val) => updateField('savingsGoal', val)}
            onClear={() => clearField('savingsGoal')}
          />
        )
      case 8:
        return (
          <StepDebts
            hasDebts={formData.hasDebts}
            debtAmount={formData.debtAmount}
            onSelectOption={(option) => updateField('hasDebts', option)}
            onAmountChange={(val) => updateField('debtAmount', val)}
            onAmountClear={() => clearField('debtAmount')}
          />
        )
      case 9:
        return (
          <StepExpenses
            question="Əyləncə və istirahət xərcləriniz nə qədərdir?"
            inputId="entertainment-input"
            value={formData.entertainment}
            onChange={(val) => updateField('entertainment', val)}
            onClear={() => clearField('entertainment')}
          />
        )
      case 10:
        return (
          <StepGoal
            selectedGoal={formData.financialGoal}
            onSelectGoal={(goal) => updateField('financialGoal', goal)}
          />
        )
      default:
        return (
          <StepSummary
            formData={formData}
            userName={userName}
            onReset={() => window.location.reload()}
          />
        )
    }
  }

  return (
    <div className="question-card-container">
      {!isCompleted && (
        <div className="question-card-header">
          <div className="header-text-block">
            <h3 className="user-greeting">Salam, {userName}!</h3>
            <p className="subtitle-text">10 suala cavab ver, planınızı başlayaq.</p>
          </div>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      )}

      <div className="question-card-body">
        {renderStepContent()}
      </div>

      {!isCompleted && (
        <div className="question-card-footer">
          <FormNavigation
            onNext={nextStep}
            onPrev={prevStep}
            showBack={currentStep > 1}
            disableNext={!isCurrentStepValid}
            nextLabel="Növbəti"
          />
        </div>
      )}
    </div>
  )
}
