import HomeCard from "@/components/HomeCard";
import ContactForm from "@/components/ContactForm";
import Marquee from "@/components/Marquee";
import WorkShowcase from "@/components/WorkShowcase";
import { projects } from "@/lib/projects";
import styles from "./page.module.css";

const SKILLS = [
  "Graphic Design",
  "Branding",
  "Web Design",
  "Print",
  "Illustration",
  "UX/UI",
  "Product Design",
  "Design Systems",
];

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-illustration.png" alt="" className={styles.heroImage} />
        <div className={styles.heroCopy}>
          <h1 className={styles.name}>Dylan Scoble</h1>
          <span className={styles.role}>Graphic - Branding - Web design</span>
          <span className={styles.pitch}>
            I help businesses build visual identities and digital experiences that are
            impossible to ignore — from first logo to full website.
          </span>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <h4 className={styles.statNumber}>10 years</h4>
            <span className={styles.statLabel}>in the industry</span>
          </div>
          <div className={styles.stat}>
            <h4 className={styles.statNumber}>60+</h4>
            <span className={styles.statLabel}>Projects completed</span>
          </div>
        </div>
      </section>

      <Marquee items={SKILLS} />

      {/* "What I do" section hidden for now
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>What I do</h2>
        <div className={styles.cards}>
          <HomeCard
            icon="graphic"
            title="Graphic & Print"
            description="Bringing your brand to life."
            items={["Business cards", "Brochures", "Packaging & Labels", "Posters & Signages"]}
          />
          <HomeCard
            icon="branding"
            title="Branding"
            description="Bringing your brand to life."
            items={["Logo design", "Style guides", "Color & type systems", "Brand collateral"]}
          />
          <HomeCard
            icon="websites"
            title="Websites"
            description="Bringing your brand to life."
            items={["Landing pages", "E-commerce", "CMS integrations", "Ongoing support"]}
          />
        </div>
      </section>
      */}

      <section className={styles.section}>
        <WorkShowcase projects={projects} />
      </section>

      <section className={`${styles.section} ${styles.about}`}>
        <div className={styles.aboutCopy}>
          <h2 className={styles.sectionHeading}>About me</h2>
          <span className={styles.aboutBody}>
            Ten years in, I still get a kick out of the first sketch turning into a finished
            brand. I work end to end — identity, print, and the website that ties it all
            together.
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/about-photo.png" alt="Dylan Scoble" className={styles.aboutPhoto} />
      </section>

      <section className={`${styles.section} ${styles.contact}`}>
        <div className={styles.contactForm}>
          <ContactForm />
        </div>
        <div className={styles.contactCopy}>
          <h2 className={styles.sectionHeading}>Let&apos;s work together!</h2>
          <span className={styles.contactBody}>
            Have a project in mind? Tell me a bit about it and I&apos;ll get back to you
            within a couple of days.
          </span>
        </div>
      </section>
    </div>
  );
}
