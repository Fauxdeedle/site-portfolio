import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import ContactForm from "@/components/ContactForm";
import Dropdown from "@/components/Dropdown";
import FormDropdown from "@/components/FormDropdown";
import FormField from "@/components/FormField";
import HighlightCard from "@/components/HighlightCard";
import HomeCard from "@/components/HomeCard";
import Icon from "@/components/Icon";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import InputField from "@/components/InputField";
import KeyDecisionCard from "@/components/KeyDecisionCard";
import ProcessStep from "@/components/ProcessStep";
import StatTile from "@/components/StatTile";

import styles from "./page.module.css";

const ICON_NAMES = ["graphic", "branding", "websites", "chevron-down"];

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
