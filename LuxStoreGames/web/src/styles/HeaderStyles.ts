import styled from "styled-components";
import Link from "next/link";

// Container do header
export const Bar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.shadow};
`;

// Título principal
export const Title = styled.h1`
  font-size: 1.75rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.5px;
`;

// Navegação
export const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: 600;
  font-size: 1rem;
  transition: background 0.2s, color 0.2s, text-shadow 0.2s;

  &:hover,
  &.active {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

// Controles de carteira
export const WalletControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: background .2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const Address = styled.span`
  font-family: monospace;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

export const Balance = styled.span`
  font-family: monospace;
  font-size: 0.9rem;
  background: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.surface};
`;

export const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  font-size: 1.4rem;
  margin-left: ${({ theme }) => theme.spacing.md || theme.spacing.sm};
  transition: color .2s;
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;
