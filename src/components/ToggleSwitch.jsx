export default function ToggleSwitch({ checked, onChange, ariaLabel, leftLabel, rightLabel }) {
  return (
    <>
      <span className="text-xs font-mono font-semibold text-muted">{leftLabel}</span>
      <button
        onClick={onChange}
        className="w-9 h-5 rounded-full relative transition-colors duration-200 border-0 cursor-pointer"
        style={{ backgroundColor: checked ? 'var(--accent)' : 'var(--border)' }}
        aria-label={ariaLabel}
      >
        <span
          className="block w-3.5 h-3.5 rounded-full bg-white transition-transform duration-200"
          style={{ transform: checked ? 'translateX(16px)' : 'translateX(1px)' }}
        />
      </button>
      <span className="text-xs font-mono font-semibold text-muted">{rightLabel}</span>
    </>
  )
}
