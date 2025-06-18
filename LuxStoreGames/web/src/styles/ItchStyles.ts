// web/src/styles/ItchStyles.ts
import styled from "styled-components";

export const Section = styled.section`
  padding: 2rem 1rem;
  max-width: 1000px;
  margin: 0 auto;
`;

export const H2 = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const DivCard = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

export const ConnectButton = styled.button`
  display: block;
  margin: 1rem auto;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const Instructions = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
  code {
    background: ${({ theme }) => theme.colors.secondary};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
  }
`;
