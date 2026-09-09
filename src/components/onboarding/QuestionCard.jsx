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
