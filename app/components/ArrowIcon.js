export default function ArrowIcon({ direction = "up-right" }) {
  return (
    <span className={`arrow-icon arrow-icon-${direction}`} aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        {direction === "up" ? (
          <path d="M8 13V3M4 7l4-4 4 4" />
        ) : (
          <path d="M4 12 12 4M6 4h6v6" />
        )}
      </svg>
    </span>
  );
}
