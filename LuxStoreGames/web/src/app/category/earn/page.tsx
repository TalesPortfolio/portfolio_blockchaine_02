"use client";

import React, { useState } from "react";
import { useWallet } from "../../../hooks/useWallet";
import { getTokenContract } from "../../../lib/contracts";
import { ethers } from "ethers";
import QuizEarn from "@/components/QuizEarn";

export default function Earn() {
  const { address, provider } = useWallet();
  const [earned, setEarned] = useState(false);

  const mintTokens = async () => {
    if (!provider || !address) return;
    try {
      // Aguarda o signer ser obtido
      const signer = await provider.getSigner();
      // Instancia o contrato com o signer
      const token = getTokenContract(signer);
      // Mint: envia a transação e aguarda confirmação
      const tx = await token.mint(address, ethers.parseUnits("10", 18));
      await tx.wait();
      setEarned(true);
    } catch (error) {
      console.error("Error to pose tokens:", error);
    }
  };

  return (
    <div>
      <QuizEarn/>
    </div>
  );
}
