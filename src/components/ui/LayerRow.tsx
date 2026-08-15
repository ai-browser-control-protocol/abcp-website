/**
 * Named layer plus one-sentence explanation.
 */
export function LayerRow({ name, body }: { name: string; body: string }) {
  return (
    <li className="layer-row">
      <strong className="layer-name">{name}</strong>
      <p>{body}</p>
    </li>
  );
}
