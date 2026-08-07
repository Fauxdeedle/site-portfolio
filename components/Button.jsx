import styles from "./Button.module.css";

export default function Button({ children = "Button", size = "md", className = "", ...rest }) {
  return (
    <button className={`${styles.button} ${styles[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
