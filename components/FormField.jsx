import InputField from "./InputField";
import styles from "./FormField.module.css";

export default function FormField({ label = "Your name", placeholder = "name", multiline = false, ...rest }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <InputField placeholder={placeholder} multiline={multiline} {...rest} />
    </label>
  );
}
