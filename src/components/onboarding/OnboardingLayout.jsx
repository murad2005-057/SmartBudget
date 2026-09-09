import React from 'react'
import { Header } from './Header'
import { QuestionCard } from './QuestionCard'
import { useOnboardingForm } from '../../hooks/useOnboardingForm'

export function OnboardingLayout({ userName = 'User' }) {
  const onboarding = useOnboardingForm(userName)

  return (
    <div className="onboarding-page-wrapper">
      <Header />
      <main className="onboarding-main-container">
        <QuestionCard onboarding={onboarding} />
      </main>
    </div>
  )
}
