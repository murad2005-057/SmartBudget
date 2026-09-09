import React from 'react'

export function Header() {
  return (
    <header className="onboarding-header">
      <div className="onboarding-logo-container">
        {/* Piggy Bank SVG Icon in Orange */}
        <div className="piggy-icon-box" aria-hidden="true">
          <svg
            viewBox="0 0 64 64"
            className="piggy-svg"
            fill="none"
          >
            <path
              d="M52 28c0-8.837-8.954-16-20-16S12 19.163 12 28c0 4.14 1.956 7.9 5.166 10.74L16 48l8-4c2.464 1.28 5.143 2 8 2s5.536-.72 8-4l8 4-1.166-9.26C50.044 35.9 52 32.14 52 28z"
              fill="#FF7A00"
            />
            <circle cx="24" cy="24" r="2.5" fill="#FFFFFF" />
            <path d="M52 26h4v6h-4z" fill="#FF7A00" />
            <path d="M28 12c.5-3 3-5 5-5" stroke="#FF7A00" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="onboarding-brand-title">SmartBudget AI</span>
      </div>
    </header>
  )
}
