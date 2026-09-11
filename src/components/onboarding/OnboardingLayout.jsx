import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { QuestionCard } from './QuestionCard'
import { LoadingPlan } from './LoadingPlan'
import { useOnboardingForm } from '../../hooks/useOnboardingForm'

export function OnboardingLayout({ userName = 'User' }) {
  const onboarding = useOnboardingForm(userName)
  const [loadingPhase, setLoadingPhase] = useState(null)
  const [submittedFormData, setSubmittedFormData] = useState(null)

  useEffect(() => {
    if (loadingPhase === null) return undefined

    const phaseTimer = window.setTimeout(() => setLoadingPhase(2), 2500)
    const completionTimer = window.setTimeout(() => {
      setLoadingPhase(null)
      onboarding.nextStep()
    }, 5000)

    return () => {
      window.clearTimeout(phaseTimer)
      window.clearTimeout(completionTimer)
    }
  }, [loadingPhase])

  const handleComplete = (formData) => {
    setSubmittedFormData({ ...formData })
    setLoadingPhase(1)
  }

  return (
    <div className="onboarding-page-wrapper">
      <Header />
      <main className={`onboarding-main-container${loadingPhase !== null ? ' loading-main-container' : ''}`}>
        {loadingPhase === null ? (
          <QuestionCard
            onboarding={onboarding}
            submittedFormData={submittedFormData}
            onComplete={handleComplete}
          />
        ) : (
          <LoadingPlan phase={loadingPhase} />
        )}
      </main>
    </div>
  )
}
