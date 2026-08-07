"use client";

import { useState } from "react";
import Icon from "./Icon";
import styles from "./Dropdown.module.css";

export default function Dropdown({
  label = "dropdown",
  options = ["option 01", "option 02", "option 03", "option 04"],
  name,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        aria-expanded={open}
      >
        <span className={styles.value}>{selected ?? label}</span>
        <Icon
          name="chevron-down"
          size={24}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>
      {open && (
        <ul className={styles.options}>
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                className={styles.option}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                  onChange?.(opt);
                }}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
      {name && <input type="hidden" name={name} value={selected ?? ""} readOnly />}
    </div>
  );
}
