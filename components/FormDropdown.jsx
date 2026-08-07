import Dropdown from "./Dropdown";
import styles from "./FormField.module.css";

export default function FormDropdown({ label = "What do you need?", options, name, onChange }) {
  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <Dropdown options={options} name={name} onChange={onChange} />
    </div>
  );
}
