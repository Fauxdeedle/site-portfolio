import Link from "next/link";
import HomeCard from "@/components/HomeCard";
import StarStat from "@/components/StarStat";
import ButtonLink from "@/components/ButtonLink";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import ContactForm from "@/components/ContactForm";
import { projects } from "@/lib/projects";
import styles from "./page.module.css";

export default function Home() {
  const [featured, ...rest] = projects;
  const teasers = rest.slice(0, 2);
  const featuredThumbnail = featured.thumbnail;

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
        <StarStat value="12 years" label="in the industry" className={styles.statLeft} />
        <StarStat value="60+" label="projects completed" className={styles.statRight} />
      </section>

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

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Some of my work</h2>
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
            const thumbnail = project.thumbnail;
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
                <div className={styles.teaserBody}>
                  <span className={styles.teaserName}>{project.name}</span>
                  <span className={styles.teaserDescription}>{project.description}</span>
                  <ButtonLink href={`/work/${project.slug}`}>See more</ButtonLink>
                </div>
              </Link>
            );
          })}
        </div>
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
