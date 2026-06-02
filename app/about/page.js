import Section from "@/components/Section";
import OfficerCard from "@/components/OfficerCard";
import { officers } from "@/data/officers";

export const metadata = {
  title: "About | Homestead CS Club",
};

export default function AboutPage() {
  return (
    <div className="container-max px-4">
      <Section title="What is CS Club?">
        <div className="space-y-4 max-w-prose text-[var(--foreground)]/90">
          <p>
            Homestead CS Club is a group of passionate and dedicated
            problem-solvers. Officers host workshops which cover fun and
            interesting applicatory topics that correspond to the Intro to Java
            and APCS curriculums.
          </p>
          <p>
            There are annual committee projects (ex: smart mirror using
            RaspberryPi, mobile app using Swift and Android, etc), where
            previous experience is definitely not mandatory to join--any
            necessary knowledge will be provided to complete the project.
          </p>
          <p>
            We also post weekly challenge problems to test our members’ skills
            and prepare them for programming competitions. CS Club includes an
            affiliated chapter of Girls Who Code, in which dedicated officers
            lead an introductory course throughout the school year on a
            programming language, such as Python.
          </p>
          <p>
            Whether you want to use your expertise to make an impact on campus
            or learn the basics, CS Club has a spot for you!
          </p>
        </div>
      </Section>

      <Section title="Meetings">
        <ul className="list-disc pl-6 space-y-2 text-[var(--foreground)]/90">
          <li>General Meetings – Tuesday Lunch in room I5 (weekly)</li>
          <li>Girls Who Code – Monday Lunch in room I5 (weekly)</li>
        </ul>
      </Section>

      <Section title="Contact">
        <p>
          Questions? Comments? Feel free to email us at{" "}
          <a
            className="text-[var(--brand)] hover:underline"
            href="mailto:homesteadprogramming@gmail.com"
          >
            homesteadprogramming@gmail.com
          </a>
          .
        </p>
      </Section>

      <Section title="Officers">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {officers.map((o, idx) => (
            <OfficerCard key={idx} {...o} />
          ))}
        </div>
      </Section>
    </div>
  );
}
