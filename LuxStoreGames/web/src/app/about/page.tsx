// web/src/app/about/page.tsx
"use client";

import React from "react";
import {
  AboutSection,
  ProfileImage,
  Name,
  Role,
  Bio,
  Skills,
  SkillTag,
  SocialLinks,
  SocialIcon,
  Education,
  Contact,
  ContactLink,
} from "@/styles/AboutStyles";

export default function AboutPage() {
  return (
    <AboutSection>
      <ProfileImage
        src="/images/tales.jpeg"
        alt="Tales Lima"
        width={160}
        height={160}
      />

      <Name>Tales Lima</Name>
      <Role>Blockchain & Full-Stack Developer</Role>

      <Bio>
        Hello! I’m Tales, a developer with solid experience in Web3 and full-stack
        applications:
        <ul>
          <li>👨‍💻 3+ years of JavaScript / TypeScript, React & Next.js</li>
          <li>🔐 Smart contracts in Solidity (ERC-20, OpenZeppelin, Hardhat)</li>
          <li>☁️ Deployed to AWS, Vercel & Sepolia Testnet</li>
          <li>🛠️ Tools: Ethers.js, Hardhat Ignition, styled-components</li>
          <li>📦 Designed and implemented a custom Token Economy (GameToken & GameStore)</li>
        </ul>
      </Bio>

      <Education>
        <h3>Education & Specialization</h3>
        <p>
          🎓 Student at <strong>42 Luxembourg</strong> for one and a half years —
          currently completing the Piscine program and diving into Web & Mobile projects.
        </p>
        <p>
          🚀 Soon starting a specialization in <em>Web Development</em> and{" "}
          <em>Mobile Web Apps</em>.
        </p>
      </Education>

      <Skills>
        {[
          "Solidity",
          "JavaScript / TypeScript",
          "React / Next.js",
          "Hardhat",
          "Node.js",
          "styled-components",
          "GraphQL",
          "PostgreSQL",
        ].map((skill) => (
          <SkillTag key={skill}>{skill}</SkillTag>
        ))}
      </Skills>

      <SocialLinks>
        <SocialIcon
          href="https://github.com/tales1982"
          target="_blank"
          rel="noopener"
        >
          🌐 GitHub
        </SocialIcon>
        <SocialIcon
          href="https://www.linkedin.com/in/tales-lima-de-paula/"
          target="_blank"
          rel="noopener"
        >
          💼 LinkedIn
        </SocialIcon>
        <SocialIcon
          href="https://tales-snowy.vercel.app/"
          target="_blank"
          rel="noopener"
        >
          🖥️ Portfolio
        </SocialIcon>
        <SocialIcon
          href="mailto:tales_lima_1982@hotmail.com"
          target="_blank"
          rel="noopener"
        >
          📧 Email
        </SocialIcon>
      </SocialLinks>

      <Contact>
        <p>Let’s talk!</p>
        <ContactLink href="mailto:tales_lima_1982@hotmail.com">
          Send me an email
        </ContactLink>
      </Contact>
    </AboutSection>
  );
}

