"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StaggeredMenu from "./StaggeredMenu";
import ContactForm from "./ContactForm";
import styles from "./Navbar.module.css";

const LINKS = [
  // TODO: real URLs
  { label: "Instagram", ariaLabel: "Instagram (opens in new tab)", link: "https://instagram.com/" },
  { label: "LinkedIn", ariaLabel: "LinkedIn (opens in new tab)", link: "https://linkedin.com/in/" },
  { label: "GitHub", ariaLabel: "GitHub (opens in new tab)", link: "https://github.com/" },
  // Drop the PDF into public/resume.pdf
  { label: "Resume", ariaLabel: "Resume (opens in new tab)", link: "/resume.pdf" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);

  // Pages with a [data-nav-hero] element only reveal the logo once it's scrolled out of view.
  const hasHero = pathname === "/";

  useEffect(() => {
    const hero = document.querySelector("[data-nav-hero]");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <StaggeredMenu
      items={LINKS}
      logoVisible={!hasHero || pastHero}
      logo={
        <Link href="/" className={styles.logo} aria-label="Dylan Scoble — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-illustration.png" alt="" className={styles.logoImg} draggable={false} />
        </Link>
      }
    >
      <div className={styles.contact}>
        <h3 className={styles.contactHeading}>Or send me a message</h3>
        <ContactForm />
      </div>
    </StaggeredMenu>
  );
}
