import React from "react";

export function EmptyProjects() {
  return (
    <div className="empty-projects">
      <div>
        <svg
          className="empty-illustration"
          viewBox="0 0 96 72"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M14 61h68"
            stroke="var(--art-baseline)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect
            x="25"
            y="9"
            width="47"
            height="47"
            rx="13"
            fill="var(--art-paper)"
            stroke="var(--art-stroke)"
            strokeWidth="1.5"
          />
          <path d="M55 9h9v22l-4.5-3.3L55 31V9Z" fill="var(--accent)" />
          <path
            d="M37 39h15M37 45h10"
            stroke="var(--art-stroke)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <h3 className="empty-title">Nothing here just yet.</h3>
        <p className="empty-copy">
          When a tool is ready, you&apos;ll find it here.
        </p>
      </div>
    </div>
  );
}
