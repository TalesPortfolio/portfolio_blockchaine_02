// src/app/page.tsx
"use client";
import React from "react";
import {
  Container,
  Hero,
  Title,
  Subtitle,
  CTAButton,
  Features,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureText,
  About,
  AboutTitle,
  AboutText,
} from "@/styles/HomeStyles";

export default function Home() {
  return (
    <Container>
      <Hero>
        <Title>Lux Store Games</Title>
        <Subtitle>
          Play for free an incredible selection of independent games with our
          token <strong>GAM</strong>. Win gam by responding to quizs,
          participate in the community And unlock exclusive links to download
          your favorite titles.
        </Subtitle>
        <CTAButton href="/category/earn">Win your first GAM</CTAButton>
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureIcon>🎮</FeatureIcon>
          <FeatureTitle>explorer</FeatureTitle>
          <FeatureText>
            Browse free game categories on Itch.io, Steam and Epic. Choose your
            favorites and prepare to play.
          </FeatureText>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>💰</FeatureIcon>
          <FeatureTitle>Win Tokens</FeatureTitle>
          <FeatureText>
            Answer simple quizs in the "win gam" section To receive tokens
            directly on your Metamask wallet.
          </FeatureText>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>🔓</FeatureIcon>
          <FeatureTitle>Unlock</FeatureTitle>
          <FeatureText>
            Use your gam to unlock download links. Your token serves as an
            access key!
          </FeatureText>
        </FeatureCard>
      </Features>

      <About>
        <AboutTitle>About this project</AboutTitle>
        <AboutText>
          This DAPP was developed as part of my portfolio: I use Next.js and
          solidity to create a decentralized game shop free.Here, ERC-20 tokens
          (GAM) are used as a means of Symbolic payment to unlock content in a
          fun and secure manner.
        </AboutText>
      </About>
    </Container>
  );
}
