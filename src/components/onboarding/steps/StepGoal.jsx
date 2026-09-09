import React from 'react'

export function StepGoal({ selectedGoal, onSelectGoal }) {
  const goals = [
    'Qənaət etmək',
    'Borcları bağlamaq',
    'İnvestisiya etmək',
    'Büdcəni idarə etmək'
  ]

  return (
    <div className="step-content">
      <h4 className="question-title">Büdcə planlamasında əsas məqsədiniz nədir?</h4>
      <div className="goal-options-grid">
        {goals.map((goal) => (
          <button
            key={goal}
            type="button"
            className={`goal-btn ${selectedGoal === goal ? 'is-selected' : ''}`}
            onClick={() => onSelectGoal(goal)}
          >
            <span>{goal}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
