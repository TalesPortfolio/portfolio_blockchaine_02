// src/styles/HomeStyles.ts
import styled from "styled-components";
import Link from "next/link";

// Container geral da página
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.background};
`;

// Seção hero com título e CTA
export const Hero = styled.section`
  text-align: center;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 2rem;
  line-height: 1.5;
`;

export const CTAButton = styled(Link)`
  display: inline-block;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.surface};
  padding: 0.75rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  text-decoration: none;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

// Seção de passos / features
export const Features = styled.section`
  display: grid;
  gap: 2rem;
  width: 100%;
  margin-bottom: 4rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 2rem 1.5rem;
  box-shadow: 0 2px 6px ${({ theme }) => theme.colors.shadow};
  text-align: center;
  transition: box-shadow 0.2s, background 0.2s;
  &:hover {
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadowHover};
    background: ${({ theme }) => theme.colors.primaryDark}20;
  }
`;

export const FeatureIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.accent};
`;

export const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const FeatureText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.4;
`;

// Seção Sobre
export const About = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  padding: 3rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
`;

export const AboutTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const AboutText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
`;
