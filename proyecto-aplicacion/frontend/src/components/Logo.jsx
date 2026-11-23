export default function Logo({ light = false }) {
  return (
    <span className="inline-flex items-center gap-2 font-display font-bold text-xl">
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
        <rect width="34" height="34" rx="8" fill="#0e7490" />
        <path d="M6 15h22M9 15l2-6h12l2 6" stroke="#fff" strokeWidth="2" fill="none" />
        <circle cx="12" cy="21" r="3" fill="#f59e0b" /><circle cx="22" cy="21" r="3" fill="#f59e0b" />
      </svg>
      <span className={light ? 'text-white' : 'text-ink'}>Incognito<span className="text-brand">Tech</span></span>
    </span>
  )
}
