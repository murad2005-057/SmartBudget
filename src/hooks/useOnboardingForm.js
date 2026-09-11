import { useState } from 'react'

const EMPTY_CREDIT = () => ({
  monthly: '',
  remaining: '',
  rate: '',
  months: ''
})

const DEFAULT_GOAL_PRIORITY = 'Orta prioritet'

export function useOnboardingForm(initialUserName = 'User') {
  const [currentStep, setCurrentStep] = useState(1)
  const [userName] = useState(initialUserName)

  const [formData, setFormData] = useState({
    salary: '',
    hasExtraIncome: null, // 'Bəli' | 'Xeyr' | null
    extraIncome: '',
    housingType: null,    // 'Özümündür' | 'Kirayədir' | 'İpotekadır' | null
    housingAmount: '',
    hasCredit: null,      // 'Bəli' | 'Xeyr' | null
    credits: [EMPTY_CREDIT()],
    utilities: '',
    groceries: '',
    transport: '',
    monthlyExpenses: {
      market: '',
      utilities: '',
      transport: '',
      restaurant: '',
      clothing: '',
      entertainment: '',
      onlineShopping: '',
      other: ''
    },
    recurringExpenses: [],
    savingsGoal: '',
    savingsGoals: [],
    financialAssessment: '',
    monthlySavingsAbility: '',
    annualBudgetPriority: '',
    hasDebts: null,       // 'Bəli' | 'Xeyr' | null
    debtAmount: '',
    entertainment: '',
    financialGoal: ''
  })

  const totalSteps = 10

  // ── Generic field update ─────────────────────────────────────────────────
  const updateField = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
  }

  const updateMonthlyExpense = (expenseId, value) => {
    setFormData((prev) => ({
      ...prev,
      monthlyExpenses: { ...prev.monthlyExpenses, [expenseId]: value }
    }))
  }

  const clearMonthlyExpense = (expenseId) => {
    updateMonthlyExpense(expenseId, '')
  }

  const toggleRecurringExpense = (expenseId) => {
    setFormData((prev) => {
      const isSelected = prev.recurringExpenses.includes(expenseId)
      const recurringExpenses = isSelected
        ? prev.recurringExpenses.filter((id) => id !== expenseId)
        : [...prev.recurringExpenses, expenseId]

      return { ...prev, recurringExpenses }
    })
  }

  const clearField = (fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: '' }))
  }

  // ── Credits array helpers ────────────────────────────────────────────────
  const addCredit = () => {
    setFormData((prev) => ({
      ...prev,
      credits: [...prev.credits, EMPTY_CREDIT()]
    }))
  }

  const updateCredit = (index, field, value) => {
    setFormData((prev) => {
      const credits = prev.credits.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      )
      return { ...prev, credits }
    })
  }

  const clearCredit = (index, field) => {
    updateCredit(index, field, '')
  }

  const removeCredit = (index) => {
    setFormData((prev) => ({
      ...prev,
      credits: prev.credits.filter((_, i) => i !== index)
    }))
  }

  const updateSavingsGoals = (goals) => {
    const savingsGoal = goals.reduce((total, goal) => total + (Number(goal.amount) || 0), 0).toString()
    updateField('savingsGoals', goals)
    updateField('savingsGoal', savingsGoal)
  }

  const toggleSavingsGoal = (goal) => {
    const isSelected = formData.savingsGoals.some((selectedGoal) => selectedGoal.id === goal.id)
    const goals = isSelected
      ? formData.savingsGoals.filter((selectedGoal) => selectedGoal.id !== goal.id)
      : [...formData.savingsGoals, { ...goal, priority: DEFAULT_GOAL_PRIORITY, amount: '' }]

    updateSavingsGoals(goals)
  }

  const updateSavingsGoal = (goalId, field, value) => {
    const goals = formData.savingsGoals.map((goal) =>
      goal.id === goalId ? { ...goal, [field]: value } : goal
    )
    updateSavingsGoals(goals)
  }

  // ── Navigation ───────────────────────────────────────────────────────────
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

  // ── Per-step validation ──────────────────────────────────────────────────
  const isCreditRowValid = (c) =>
    c.monthly.trim() !== '' &&
    c.remaining.trim() !== '' &&
    c.rate.trim() !== '' &&
    c.months.trim() !== ''

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
        if (!formData.housingType) return false
        if (formData.housingType !== 'Özümündür') {
          return formData.housingAmount !== '' && !isNaN(Number(formData.housingAmount))
        }
        return true
      case 4:
        if (!formData.hasCredit) return false
        if (formData.hasCredit === 'Bəli') {
          return formData.credits.length > 0 && formData.credits.every(isCreditRowValid)
        }
        return true
      case 5:
        return formData.savingsGoals.length > 0 && formData.savingsGoals.every((goal) =>
          goal.amount !== '' && !isNaN(Number(goal.amount))
        )
      case 6:
        return Object.values(formData.monthlyExpenses).every(
          (value) => value !== '' && !isNaN(Number(value))
        )
      case 7:
        return formData.recurringExpenses.length > 0
      case 8:
        return formData.financialAssessment !== ''
      case 9:
        return formData.monthlySavingsAbility !== ''
      case 10:
        return formData.annualBudgetPriority !== ''
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
    updateMonthlyExpense,
    clearMonthlyExpense,
    toggleRecurringExpense,
    clearField,
    addCredit,
    updateCredit,
    clearCredit,
    removeCredit,
    toggleSavingsGoal,
    updateSavingsGoal,
    nextStep,
    prevStep,
    isCurrentStepValid: isCurrentStepValid()
  }
}
