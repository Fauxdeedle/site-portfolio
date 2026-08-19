import Link from "next/link";
import HomeCard from "@/components/HomeCard";
import ButtonLink from "@/components/ButtonLink";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import ContactForm from "@/components/ContactForm";
import { projects } from "@/lib/projects";
import styles from "./page.module.css";

export default function Home() {
  const [featured, ...rest] = projects;
  const teasers = rest.slice(0, 2);
  const featuredThumbnail = featured.thumbnail ?? featured.heroImage;

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-illustration.png" alt="" className={styles.heroImage} />
        <div className={styles.heroCopy}>
          <span className={styles.name}>Dylan Scoble</span>
          <span className={styles.role}>Graphic - Branding - Web design</span>
          <span className={styles.pitch}>
            I help businesses build visual identities and digital experiences that are
            impossible to ignore — from first logo to full website.
          </span>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>10 years</span>
            <span className={styles.statLabel}>in the industry</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>60+</span>
            <span className={styles.statLabel}>Projects completed</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.sectionHeading}>What I do</span>
        <div className={styles.cards}>
          <HomeCard icon="graphic" title="Graphic & Print" description="Bringing your brand to life." />
          <HomeCard icon="branding" title="Branding" description="Bringing your brand to life." />
          <HomeCard icon="websites" title="Websites" description="Bringing your brand to life." />
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.sectionHeading}>Some of my work</span>
        <Link href={`/work/${featured.slug}`} className={styles.featured}>
          {featuredThumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={featuredThumbnail}
              alt={`${featured.name} work sample`}
              className={styles.featuredImage}
            />
          ) : (
            <div className={styles.featuredImagePlaceholder}>
              <ImagePlaceholder label={`${featured.name} cover`} />
            </div>
          )}
          <div className={styles.featuredBody}>
            <span className={styles.featuredCategory}>{featured.name}</span>
            <span className={styles.featuredTag}>{featured.category}</span>
            <span className={styles.featuredDescription}>{featured.description}</span>
            <ButtonLink href={`/work/${featured.slug}`}>See more</ButtonLink>
          </div>
        </Link>
        <div className={styles.teasers}>
          {teasers.map((project) => {
            const thumbnail = project.thumbnail ?? project.heroImage;
            return (
              <Link key={project.slug} href={`/work/${project.slug}`} className={styles.teaser}>
                <div className={styles.teaserImage}>
                  {thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumbnail}
                      alt={`${project.name} work sample`}
                      className={styles.teaserImageImg}
                    />
                  ) : (
                    <ImagePlaceholder label={`Drop ${project.name.toLowerCase()} image`} />
                  )}
                </div>
                <span className={styles.teaserName}>{project.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={`${styles.section} ${styles.about}`}>
        <div className={styles.aboutCopy}>
          <span className={styles.sectionHeading}>About me</span>
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
          <span className={styles.sectionHeading}>Let&apos;s work together!</span>
          <span className={styles.contactBody}>
            Have a project in mind? Tell me a bit about it and I&apos;ll get back to you
            within a couple of days.
          </span>
        </div>
      </section>
    </div>
  );
}
