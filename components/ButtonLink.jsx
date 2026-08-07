import Link from "next/link";
import styles from "./Button.module.css";

export default function ButtonLink({ children = "Button", size = "md", className = "", href, ...rest }) {
  return (
    <Link href={href} className={`${styles.button} ${styles[size]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
