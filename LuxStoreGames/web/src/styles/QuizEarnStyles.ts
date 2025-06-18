// web/src/styles/QuizEarnStyles.ts
import styled from 'styled-components';

export const QuizContainer = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface};   /* em vez de theme.cardBg */
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 2px 10px ${({ theme }) => theme.colors.shadow};
`;


export const Title = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};        /* em vez de theme.primary */
`;

export const QuestionBlock = styled.div`
  margin-bottom: 1.5rem;
`;

export const QuestionText = styled.p`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const OptionLabel = styled.label`
  display: block;
  margin: 0.25rem 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textLight};

  input {
    margin-right: 0.5rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const SubmitButton = styled.button`
  display: block;
  margin: 1rem auto;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Result = styled.div`
  text-align: center;
  margin-top: 1.5rem;

  p {
    font-size: 1.2rem;
    margin: 0.5rem 0;
    color: ${({ theme }) => theme.colors.text};
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

export const LanguageToggle = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  button {
    background: ${({ theme }) => theme.colors.secondary};
    border: none;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    cursor: pointer;
    border-radius: ${({ theme }) => theme.borderRadius};

    &.active {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.surface};
    }
  }
`;
