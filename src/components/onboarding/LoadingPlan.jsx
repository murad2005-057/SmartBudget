import React from 'react'

export function LoadingPlan({ phase }) {
  const subtitle = phase === 1
    ? 'Məlumatlar analiz edilir...'
    : 'Xərclər hesablanır...'

  return (
    <div className="question-card-container loading-plan-card" role="status" aria-live="polite">
      <div className="loading-plan-content">
        <span className="loading-plan-spinner" aria-hidden="true" />
        <h2 className="loading-plan-title">AI planınızı hazırlayır</h2>
        <p className="loading-plan-subtitle">{subtitle}</p>
      </div>
    </div>
  )
}
