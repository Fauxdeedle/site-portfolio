import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import ContactForm from "@/components/ContactForm";
import Dropdown from "@/components/Dropdown";
import FormDropdown from "@/components/FormDropdown";
import FormField from "@/components/FormField";
import HighlightCard from "@/components/HighlightCard";
import InfoTile from "@/components/InfoTile";
import HomeCard from "@/components/HomeCard";
import Icon from "@/components/Icon";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import InputField from "@/components/InputField";
import KeyDecisionCard from "@/components/KeyDecisionCard";
import ProcessStep from "@/components/ProcessStep";
import StatTile from "@/components/StatTile";

import styles from "./page.module.css";

const ICON_NAMES = ["graphic", "branding", "websites", "chevron-down"];

const HEADINGS = [
  { tag: "h1", className: "h1", size: "text-display-lg / 64px" },
  { tag: "h2", className: "h2", size: "text-display-md / 32px" },
  { tag: "h3", className: "h3", size: "text-heading-lg / 32px" },
  { tag: "h4", className: "h4", size: "text-heading-md / 24px" },
  { tag: "h5", className: "h5", size: "text-heading-sm / 20px" },
  { tag: "h6", className: "h6", size: "text-subhead / 22px" },
];

const BODY_STYLES = [
  { label: "Body LG", className: "bodyLg", size: "text-body-lg / 20px" },
  { label: "Body MD", className: "bodyMd", size: "text-body-md / 16px" },
  { label: "Body SM", className: "bodySm", size: "text-body-sm / 12px" },
];

const SPACING_SCALE = [
  { name: "space-1", value: "8px" },
  { name: "space-2", value: "10px" },
  { name: "space-3", value: "12px" },
  { name: "space-4", value: "16px" },
  { name: "space-5", value: "19px" },
  { name: "space-6", value: "24px" },
  { name: "space-7", value: "32px" },
  { name: "space-8", value: "72px" },
  { name: "space-9", value: "120px" },
];

const COLORS = [
  { name: "ink", value: "rgb(29, 27, 27)" },
  { name: "ink-black", value: "rgb(0, 0, 0)" },
  { name: "paper", value: "rgb(255, 253, 250)" },
  { name: "white", value: "rgb(255, 255, 255)" },
  { name: "gray-ink", value: "rgb(51, 48, 48)" },
  { name: "gray-input", value: "rgb(217, 217, 217)" },
  { name: "gray-warm", value: "rgb(217, 214, 210)" },
  { name: "gray-solid", value: "rgb(83, 83, 83)" },
  { name: "shadow-hard", value: "rgb(30, 30, 30)" },
];

function Section({ title, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>
      <div className={styles.row}>{children}</div>
    </section>
  );
}

export default function StyleGuidePage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.pageTitle}>Style Guide</h1>

      <Section title="Typography">
        <div className={styles.typeRow}>
          {HEADINGS.map(({ tag: Tag, className, size }) => (
            <div key={className} className={styles.typeSample}>
              <span className={styles.typeLabel}>{Tag}</span>
              <Tag className={styles[className]}>The quick brown fox</Tag>
              <span className={styles.typeMeta}>{size}</span>
            </div>
          ))}
          {BODY_STYLES.map(({ label, className, size }) => (
            <div key={className} className={styles.typeSample}>
              <span className={styles.typeLabel}>{label}</span>
              <p className={styles[className]}>The quick brown fox jumps over the lazy dog.</p>
              <span className={styles.typeMeta}>{size}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Spacing">
        <div className={styles.spacingList}>
          {SPACING_SCALE.map(({ name, value }) => (
            <div key={name} className={styles.spacingRow}>
              <span className={styles.spacingLabel}>--{name}</span>
              <div className={styles.spacingBar} style={{ width: value }} />
              <span className={styles.spacingValue}>{value}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Colors">
        {COLORS.map(({ name, value }) => (
          <div key={name} className={styles.colorSwatch}>
            <div className={styles.colorBlock} style={{ background: value }} />
            <span className={styles.colorName}>--{name}</span>
            <span className={styles.colorValue}>{value}</span>
          </div>
        ))}
      </Section>

      <Section title="Button">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
      </Section>

      <Section title="ButtonLink">
        <ButtonLink href="#" size="md">
          Link button
        </ButtonLink>
      </Section>

      <Section title="InputField">
        <InputField placeholder="Your name" />
        <InputField placeholder="Tell me about the project" multiline />
      </Section>

      <Section title="FormField">
        <FormField label="Your name" placeholder="name" />
        <FormField label="Tell me about the project" placeholder="tell me a bit about the project" multiline />
      </Section>

      <Section title="Dropdown">
        <Dropdown label="Pick one" options={["Option 01", "Option 02", "Option 03"]} />
      </Section>

      <Section title="FormDropdown">
        <FormDropdown label="What do you need?" options={["Branding", "Print", "Website"]} />
      </Section>

      <Section title="ContactForm">
        <ContactForm />
      </Section>

      <Section title="HomeCard">
        <HomeCard icon="graphic" title="Graphic & Print" description="Bringing your brand to life." />
        <HomeCard icon="branding" title="Branding" description="A voice that sticks." />
        <HomeCard icon="websites" title="Websites" description="Built to convert." />
      </Section>

      <Section title="KeyDecisionCard">
        <KeyDecisionCard
          title="Why we chose this"
          description="A short explanation of the decision and its impact on the project."
        />
      </Section>

      <Section title="HighlightCard">
        <HighlightCard
          items={[
            {
              label: "The problem",
              body: "Users couldn't find the pricing page and dropped off before signing up.",
            },
            {
              label: "The goal",
              body: "Surface pricing earlier in the flow and cut sign-up drop-off in half.",
            },
          ]}
        />
        <HighlightCard
          items={[
            {
              label: "The takeaway",
              body: "A single highlighted block, for anywhere one callout needs to stand out on its own.",
            },
          ]}
        />
      </Section>

      <Section title="InfoTile">
        <InfoTile label="Role" value="Product Designer" />
        <InfoTile label="Year" value="2026" />
        <InfoTile label="Timeline" value="8 weeks" />
      </Section>

      <Section title="StatTile">
        <StatTile value="42%" label="Increase in signups" />
        <StatTile value="3.2s" label="Faster load time" />
        <StatTile value="12" label="Projects shipped" />
      </Section>

      <Section title="ProcessStep">
        <ProcessStep title="Discover" description="Understand the problem and the audience." />
        <ProcessStep
          title="Design"
          description="Explore directions and narrow to one."
          image="/images/hero-illustration.png"
        />
      </Section>

      <Section title="Icon">
        {ICON_NAMES.map((name) => (
          <div key={name} className={styles.iconSample}>
            <Icon name={name} size={32} />
            <span>{name}</span>
          </div>
        ))}
      </Section>

      <Section title="ImagePlaceholder">
        <ImagePlaceholder />
        <ImagePlaceholder label="Custom radius" radius={4} />
      </Section>
    </main>
  );
}
