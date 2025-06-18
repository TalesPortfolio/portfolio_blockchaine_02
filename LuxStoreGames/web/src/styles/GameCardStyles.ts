// src/styles/GameCardStyles.ts
"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

// Container do card
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.shadow};
  transition: box-shadow .2s, background .2s;
  width: 100%;
  max-width: 300px;

  @media (max-width: 480px) {
    max-width: 100%;
  }
  @media (min-width: 481px) and (max-width: 768px) {
    max-width: 45%;
  }
  @media (min-width: 769px) and (max-width: 1023px) {
    max-width: 30%;
  }

  &:hover {
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadowHover};
    background: ${({ theme }) => theme.colors.primaryDark}10;
  }
`;

// Wrapper da imagem, mantém proporção 16:9
export const CoverWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: ${({ theme }) => theme.colors.background};
`;

// Próprio componente de imagem, usando Next/Image
export const StyledImage = styled(Image)`
  object-fit: cover;
`;

// Conteúdo textual do card
export const Content = styled.div`
  flex: 1;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
`;

// Título do jogo
export const Title = styled.h3`
  font-size: 1rem;
  line-height: 1.2;
  margin: 0 0 0.5rem;
  height: 2.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: ${({ theme }) => theme.colors.text};
`;

// Preço exibido antes da compra
export const PriceTag = styled.p`
  margin-bottom: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

// Botão de compra
export const BuyButton = styled.button`
  width: 100%;
  padding: 0.5rem 0;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Link de download após a compra
export const DownloadLink = styled(Link)`
  display: inline-block;
  width: 100%;
  text-align: center;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.surface};
  padding: 0.5rem 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;


export const DetailsButton = styled.button`
  margin-top: auto;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  text-align: center;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background .2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;