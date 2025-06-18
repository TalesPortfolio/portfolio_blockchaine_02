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
        Hello!Sou Tales, a developer with solid web3 experience and applications full-stack:
        <ul>
          <li>👨‍💻 +3 years ofJavaScript / TypeScript, React & Next.js</li>
          <li>🔐 Smart contracts in Solidity (ERC-20, OpenZeppelin, Hardhat)</li>
          <li>☁️ Deploy in AWS, Vercel, Sepolia Testnet</li>
          <li>🛠️ Tools: Ethers.js, Hardhat Ignition, styled-components</li>
          <li>📦 I designed and implemented your own Token Economy (GameToken & GameStore)</li>
        </ul>
      </Bio>

      <Education>
        <h3>Training and Specialization</h3>
        <p>
          🎓 Student in <strong>42 Luxembourg</strong> 1 and a half years ago — 
          currently finalizing the Piscine program and plunging into Web & Mobile.
        </p>
        <p>
          🚀 Soon I will start specialization in <em>Web Development</em> e 
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
        <p>Let's talk?</p>
        <ContactLink href="mailto:tales_lima_1982@hotmail.com">
          Send me an email
        </ContactLink>
      </Contact>
    </AboutSection>
  );
}
