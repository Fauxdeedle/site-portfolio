"use client";

import styles from "./Switcher.module.css";

export default function Switcher({
  options = ["Product", "Graphic"],
  value,
  onChange,
  className = "",
  ...rest
}) {
  const activeIndex = Math.max(options.indexOf(value), 0);

  return (
    <div
      className={`${styles.switcher} ${className}`}
      style={{ "--option-count": options.length }}
      {...rest}
    >
      <div className={styles.knob} style={{ transform: `translateX(${activeIndex * 100}%)` }} />
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`${styles.option} ${option === value ? styles.optionActive : ""}`}
          aria-pressed={option === value}
          onClick={() => onChange?.(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
