/**
 * Team line: name, role, and one sentence.
 */
export function PersonRow({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <li className="person-row">
      <strong className="person-name">{name}</strong>
      <span>{role}</span>
      <p>{bio}</p>
    </li>
  );
}
