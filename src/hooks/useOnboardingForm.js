import { useState } from 'react'

export function useOnboardingForm(initialUserName = 'User') {
  const [currentStep, setCurrentStep] = useState(1)
  const [userName] = useState(initialUserName)

  const [formData, setFormData] = useState({
    salary: '0',
    hasExtraIncome: null, // 'Bəli' | 'Xeyr' | null
    extraIncome: '0',
    housing: '0',
    utilities: '0',
    groceries: '0',
    transport: '0',
    savingsGoal: '0',
    hasDebts: null, // 'Bəli' | 'Xeyr' | null
    debtAmount: '0',
    entertainment: '0',
    financialGoal: ''
  })

  const totalSteps = 10

  const updateField = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const clearField = (fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: '0'
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps + 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  // Validation per step to enable/disable "Növbəti >" button
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.salary !== '' && !isNaN(Number(formData.salary))
      case 2:
        if (!formData.hasExtraIncome) return false
        if (formData.hasExtraIncome === 'Bəli') {
          return formData.extraIncome !== '' && !isNaN(Number(formData.extraIncome))
        }
        return true
      case 3:
        return formData.housing !== '' && !isNaN(Number(formData.housing))
      case 4:
        return formData.utilities !== '' && !isNaN(Number(formData.utilities))
      case 5:
        return formData.groceries !== '' && !isNaN(Number(formData.groceries))
      case 6:
        return formData.transport !== '' && !isNaN(Number(formData.transport))
      case 7:
        return formData.savingsGoal !== '' && !isNaN(Number(formData.savingsGoal))
      case 8:
        if (!formData.hasDebts) return false
        if (formData.hasDebts === 'Bəli') {
          return formData.debtAmount !== '' && !isNaN(Number(formData.debtAmount))
        }
        return true
      case 9:
        return formData.entertainment !== '' && !isNaN(Number(formData.entertainment))
      case 10:
        return formData.financialGoal !== ''
      default:
        return true
    }
  }

  return {
    currentStep,
    totalSteps,
    userName,
    formData,
    updateField,
    clearField,
    nextStep,
    prevStep,
    isCurrentStepValid: isCurrentStepValid()
  }
}
