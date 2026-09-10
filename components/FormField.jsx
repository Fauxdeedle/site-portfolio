import InputField from "./InputField";
import styles from "./FormField.module.css";

export default function FormField({
  label = "Your name",
  placeholder = "name",
  multiline = false,
  className = "",
  ...rest
}) {
  return (
    <label className={`${styles.field} ${className}`}>
      <span className={styles.label}>{label}</span>
      <InputField placeholder={placeholder} multiline={multiline} {...rest} />
    </label>
  );
}
