import Dropdown from "./Dropdown";
import styles from "./FormField.module.css";

export default function FormDropdown({
  label = "What do you need?",
  options,
  name,
  onChange,
  className = "",
  ...rest
}) {
  return (
    <div className={`${styles.field} ${className}`}>
      <span className={styles.label}>{label}</span>
      <Dropdown options={options} name={name} onChange={onChange} {...rest} />
    </div>
  );
}
