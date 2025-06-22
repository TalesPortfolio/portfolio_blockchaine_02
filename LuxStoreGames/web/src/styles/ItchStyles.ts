import styled from "styled-components";

// Breakpoints
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
};

export const Section = styled.section`
  padding: 2rem 1rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 1.5rem 0.75rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem 0.5rem;
  }
`;

export const H2 = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.75rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

export const DivCard = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
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

  @media (max-width: ${breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xs};
    margin: 0.75rem auto;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Instructions = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};

  /* allow wallet addresses and code to break properly */
  word-break: break-all;
  overflow-wrap: anywhere;

  code {
    background: ${({ theme }) => theme.colors.secondary};
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
    /* enable wrapping inside code blocks */
    white-space: pre-wrap;
    word-break: break-all;
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.xs};
  }
`;
