export function LogoStrip() {
  return (
    <div className="flex items-center justify-center gap-8 opacity-80">
      <Triangle />
      <Wave />
      <BlockF />
      <CircleN />
    </div>
  )
}

function Triangle() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4l8 14H4L12 4Z" stroke="currentColor" />
    </svg>
  )
}

function Wave() {
  return (
    <svg width="36" height="28" viewBox="0 0 36 24" fill="none" aria-hidden="true">
      <path d="M2 12c4-6 8 6 12 0s8 6 12 0 8 6 8 6" stroke="currentColor" />
    </svg>
  )
}

function BlockF() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6h12v12H6z" stroke="currentColor" />
      <path d="M9 9h6M9 12h4" stroke="currentColor" />
    </svg>
  )
}

function CircleN() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" />
      <path d="M8 16V8l8 8V8" stroke="currentColor" />
    </svg>
  )
}
