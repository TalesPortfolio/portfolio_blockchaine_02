"use client";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ variant: "primary"|"secondary" }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  transition: background .2s;
  ${({ variant }) => variant === "primary"
    ? `
      background: #0070f3;
      color: #fff;
      border: none;
      &:hover { background: #005bb5; }
    `
    : `
      background: #eee;
      color: #333;
      border: 1px solid #ccc;
      &:hover { background: #ddd; }
    `
  }
`;

export default function Button({ children, variant = "primary", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"secondary" }) {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}
