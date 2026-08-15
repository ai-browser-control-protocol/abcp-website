/**
 * Queue row: live rule, title, and status word.
 */
export function QueueItem({
  title,
  deck,
}: {
  title: string;
  deck: string;
}) {
  return (
    <>
      <span className="queue-item-title">{title}</span>
      <small className="queue-item-deck">{deck}</small>
    </>
  );
}
