import styles from "./InputField.module.css";

export default function InputField({ placeholder = "name", multiline = false, className = "", ...rest }) {
  if (multiline) {
    return (
      <textarea
        placeholder={placeholder}
        className={`${styles.shared} ${styles.textarea} ${className}`}
        {...rest}
      />
    );
  }
  return (
    <input
      placeholder={placeholder}
      className={`${styles.shared} ${styles.input} ${className}`}
      {...rest}
    />
  );
}
