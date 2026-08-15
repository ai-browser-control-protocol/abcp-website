/**
 * Monospace annotation line used in the rail.
 */
export function TraceLine({
  time,
  label,
  hold = false,
}: {
  time?: string;
  label: string;
  hold?: boolean;
}) {
  return (
    <li className={`trace-line${hold ? " is-hold" : ""}`}>
      {time ? <time>{time}</time> : null}
      <span>{label}</span>
    </li>
  );
}
