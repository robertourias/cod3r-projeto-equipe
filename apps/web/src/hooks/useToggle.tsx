import { useState } from "react";

export default function useToggle(value: boolean) {
  const [active, setActive] = useState(value ?? false);

  function toggleActive() {
    setActive(!active);
  }

  const r: [boolean, () => void] = [active, toggleActive];

  return r;
}