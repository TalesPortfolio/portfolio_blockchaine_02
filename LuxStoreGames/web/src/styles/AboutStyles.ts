// web/src/styles/AboutStyles.ts
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const AboutSection = styled.section`
  max-width: 800px;
  margin: 4rem auto;
  padding: 0 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const ProfileImage = styled(Image)`
  border-radius: 50%;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Name = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.primary};
`;

export const Role = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textLight};
`;

export const Bio = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  ul {
    margin-top: ${({ theme }) => theme.spacing.sm};
    list-style: disc;
    padding-left: 1.25rem;
  }
`;

export const Education = styled.div`
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  h3 {
    font-size: 1.25rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  p {
    margin: ${({ theme }) => theme.spacing.xs} 0;
    line-height: 1.4;
  }
`;

export const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SkillTag = styled.span`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.4rem 0.8rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 0.9rem;
`;

export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SocialIcon = styled(Link)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Contact = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const ContactLink = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-decoration: none;
  font-weight: bold;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;
