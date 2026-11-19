import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { guideProviders } from "./guide-providers";

const providers = Object.keys(guideProviders);

export function ProviderPicker({ value, onChange, label }: {
  value: string;
  onChange: (provider: string) => void;
  label: string;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const search = useRef({ prefix: "", time: 0 });
  const [active, setActive] = useState<number | null>(null);
  const [above, setAbove] = useState(false);
  const open = active !== null;

  function show(index = providers.indexOf(value)) {
    const rect = root.current!.getBoundingClientRect();
    const below = window.innerHeight - rect.bottom;
    setAbove(below < Math.min(260, window.innerHeight * 0.4) && rect.top > below);
    setActive(index);
  }

  function choose(next: string) {
    if (next !== value) onChange(next);
    setActive(null);
  }

  useEffect(() => {
    if (!open) return;
    function dismissOutside(event: Event) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setActive(null);
    }
    document.addEventListener("pointerdown", dismissOutside, true);
    document.addEventListener("focusin", dismissOutside);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside, true);
      document.removeEventListener("focusin", dismissOutside);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (active === null || !list.current) return;
    const menu = list.current;
    const row = menu.children[active] as HTMLElement;
    const top = row.offsetTop;
    if (top < menu.scrollTop) menu.scrollTop = top;
    else if (top + row.offsetHeight > menu.scrollTop + menu.clientHeight) {
      menu.scrollTop = top + row.offsetHeight - menu.clientHeight;
    }
  }, [active]);

  function handleKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.ctrlKey || event.metaKey || event.nativeEvent.isComposing) return;
    const index = active ?? providers.indexOf(value);
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        const offset = event.key === "ArrowDown" ? 1 : -1;
        if (open) setActive(Math.max(0, Math.min(providers.length - 1, index + offset)));
        else show();
        break;
      }
      case "Home": show(0); break;
      case "End": show(providers.length - 1); break;
      case "Enter":
      case " ":
        if (open) choose(providers[index]);
        else show();
        break;
      case "Escape":
        if (!open) return;
        setActive(null);
        break;
      case "Tab":
        if (open) choose(providers[index]);
        return;
      default: {
        if (event.altKey || event.key.length !== 1) return;
        const now = Date.now();
        const key = event.key.toLowerCase();
        const previous = now - search.current.time < 700 ? search.current.prefix : "";
        const prefix = previous === key ? key : previous + key;
        search.current = { prefix, time: now };
        const start = prefix.length === 1 ? index + 1 : index;
        const match = [...providers.slice(start), ...providers.slice(0, start)].find(p => p.startsWith(prefix));
        if (match) show(providers.indexOf(match));
      }
    }
    event.preventDefault();
  }

  return (
    <div ref={root} className="provider-picker">
      <button id="guide-provider" type="button" role="combobox" aria-label={label}
        aria-haspopup="listbox" aria-expanded={open} aria-controls={id}
        aria-activedescendant={open ? `${id}-${active}` : undefined}
        onKeyDown={handleKey} onClick={() => open ? setActive(null) : show()}>
        {value}
      </button>
      <ul ref={list} id={id} role="listbox" aria-label={label} hidden={!open} data-above={above}>
        {providers.map((provider, index) => (
          <li key={provider} id={`${id}-${index}`} role="option" aria-selected={provider === value}
            data-active={index === active} onMouseDown={event => event.preventDefault()} onClick={() => choose(provider)}>
            {provider}{provider === value && <span aria-hidden="true">✓</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
