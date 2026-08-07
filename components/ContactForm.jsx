"use client";

import { useState } from "react";
import FormField from "./FormField";
import FormDropdown from "./FormDropdown";
import Button from "./Button";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.success}>
        <span className={styles.successText}>
          Thanks — I&apos;ll get back to you within a couple of days.
        </span>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <FormField label="Your name" placeholder="name" name="name" required />
      <FormField
        label="Email address"
        placeholder="example@email.com"
        name="email"
        type="email"
        required
      />
      <FormDropdown label="What do you need?" options={["Branding", "Print", "Website"]} name="need" />
      <FormField
        label="Tell me about the project"
        placeholder="tell me a bit about the project"
        name="message"
        multiline
        required
      />
      <Button type="submit">Send</Button>
    </form>
  );
}
