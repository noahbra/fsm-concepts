export function SkipLink({ target = '#main', label = 'Skip to main content' }: { target?: string; label?: string }) {
  return <a className="skip-link" href={target}>{label}</a>;
}
