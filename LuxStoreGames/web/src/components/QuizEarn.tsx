// web/src/components/QuizEarn.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/hooks/useWallet";
import {
  QuizContainer,
  Title,
  QuestionBlock,
  QuestionText,
  OptionLabel,
  SubmitButton,
  Result,
  ConnectButton,
  Instructions,
} from "@/styles/QuizEarnStyles";

interface TriviaAPIQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface Question {
  question: string;
  options: string[];
  correct: string;
}

export default function QuizEarn() {
  const { address, connect } = useWallet();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [earned, setEarned] = useState(false);

  // helper para embaralhar
  const shuffle = <T,>(arr: T[]): T[] =>
    arr
      .map((v) => [Math.random(), v] as [number, T])
      .sort((a, b) => a[0] - b[0])
      .map(([, v]) => v);

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      try {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=10&type=multiple",
          { mode: "cors" }
        );
        if (!res.ok) {
          console.error("Trivia API HTTP error:", res.status);
          return;
        }
        const data = await res.json();
        if (!Array.isArray(data.results)) {
          console.error("Trivia API retornou formato inesperado:", data);
          return;
        }

        const mapped: Question[] = data.results.map((q: any) => {
          // decodifica entidades HTML simples
          const decode = (s: string) =>
            s.replace(/&quot;/g, '"')
             .replace(/&#039;/g, "'")
             .replace(/&amp;/g, "&")
             .replace(/&eacute;/g, "é")
             .replace(/&uuml;/g, "ü");
          const question = decode(q.question);
          const correct = decode(q.correct_answer);
          const incorrects = q.incorrect_answers.map((a: string) => decode(a));
          const options = shuffle([correct, ...incorrects]);
          return { question, options, correct };
        });

        setQuestions(mapped);
        setAnswers(Array(mapped.length).fill(""));
      } catch (err) {
        console.error("Erro ao buscar questões de quiz:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  function selectAnswer(idx: number, value: string) {
    if (submitted) return;
    const tmp = [...answers];
    tmp[idx] = value;
    setAnswers(tmp);
  }

  async function handleSubmit() {
    let correctCount = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) correctCount++;
    });
    const total = correctCount * 2;
    setScore(total);
    setSubmitted(true);

    if (total > 0) {
      const amount = ethers.parseUnits(total.toString(), 18).toString();
      const res = await fetch("/api/earn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: (window as any).ethereum.selectedAddress,
          amount,
          secret: process.env.NEXT_PUBLIC_EARN_API_SECRET,
        }),
      });
      const data = await res.json();
      if (data.txHash) {
        setEarned(true);
        window.dispatchEvent(new Event("balanceChanged"));
      }
    }
  }

  if (!address) {
    return (
      <QuizContainer>
        <Instructions>
          <p>Please install or connect MetaMask to take the quiz:</p>
        </Instructions>
        <ConnectButton onClick={connect}>
          Install / Connect MetaMask
        </ConnectButton>
      </QuizContainer>
    );
  }

  if (loading) {
    return <QuizContainer>Loading quiz…</QuizContainer>;
  }

  return (
    <QuizContainer>
      <Title>Current Affairs Quiz</Title>

      {questions.map((q, i) => (
        <QuestionBlock key={i}>
          <QuestionText>
            Q{i + 1}. {q.question}
          </QuestionText>
          {q.options.map((opt) => (
            <OptionLabel key={opt}>
              <input
                type="radio"
                name={`q${i}`}
                value={opt}
                checked={answers[i] === opt}
                onChange={() => selectAnswer(i, opt)}
                disabled={submitted}
              />
              {opt}
            </OptionLabel>
          ))}
        </QuestionBlock>
      ))}

      {!submitted ? (
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      ) : (
        <Result>
          <p>
            Score: {score} / {questions.length * 2}
          </p>
          {earned ? (
            <p>Reward tokens credited: {score} GAM</p>
          ) : (
            <p>No token credited</p>
          )}
        </Result>
      )}
    </QuizContainer>
  );
}
