import type { ReactNode } from 'react'

interface ActionButtonProps {
  onClick: () => void
  disabled?: boolean
  isActive: boolean
  activeIcon: ReactNode
  activeLabel: string
  defaultIcon: ReactNode
  defaultLabel: string
  defaultClassName?: string
  activeClassName?: string
}

export default function ActionButton({
  onClick,
  disabled = false,
  isActive,
  activeIcon,
  activeLabel,
  defaultIcon,
  defaultLabel,
  defaultClassName = 'btn-primary',
  activeClassName = 'btn-success',
}: ActionButtonProps) {
  return (
    <button
      className={`btn btn-sm ${isActive ? activeClassName : defaultClassName}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isActive ? (
        <>
          {activeIcon}
          {activeLabel}
        </>
      ) : (
        <>
          {defaultIcon}
          {defaultLabel}
        </>
      )}
    </button>
  )
}
