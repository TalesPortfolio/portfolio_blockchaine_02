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
  questionEn: string;
  options: { value: string; label: string }[];
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

  // Embaralhador simples
  function shuffle<T>(arr: T[]): T[] {
    return arr
      .map((v) => [Math.random(), v] as [number, T])
      .sort((a, b) => a[0] - b[0])
      .map(([, v]) => v);
  }

  // Carrega perguntas do Open Trivia DB
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(
          "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986"
        );
        const data = await res.json();
        const items: TriviaAPIQuestion[] = data.results.map((q: any) => ({
          question: decodeURIComponent(q.question),
          correct_answer: decodeURIComponent(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((a: string) =>
            decodeURIComponent(a)
          ),
        }));

        // Mapeia para nosso formato
        const mapped: Question[] = items.map((q) => {
          // junta correto + incorretos e remove duplicados
          const raw = [q.correct_answer, ...q.incorrect_answers];
          const unique = Array.from(new Set(raw));
          const all = shuffle(unique);

          return {
            questionEn: q.question,
            options: all.map((opt) => ({
              value: opt,
              label: opt,
            })),
            correct: q.correct_answer,
          };
        });

        setQuestions(mapped);
        setAnswers(Array(mapped.length).fill(""));
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  // Marca uma resposta
  function selectAnswer(idx: number, value: string) {
    if (submitted) return;
    const tmp = [...answers];
    tmp[idx] = value;
    setAnswers(tmp);
  }

  // Envia e pontua
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

  // Se não conectado, pede MetaMask
  if (!address) {
    return (
      <QuizContainer>
        <Instructions>
          <p>Please install or connect MetaMask to take the quiz.</p>
        </Instructions>
        <ConnectButton onClick={connect}>
          Install / Connect MetaMask
        </ConnectButton>
      </QuizContainer>
    );
  }

  // Enquanto carrega perguntas
  if (loading) {
    return <QuizContainer>Loading quiz…</QuizContainer>;
  }

  // Render final
  return (
    <QuizContainer>
      <Title>Current Affairs Quiz</Title>

      {questions.map((q, i) => (
        <QuestionBlock key={i}>
          <QuestionText>
            Q{i + 1}. {q.questionEn}
          </QuestionText>
          {q.options.map((opt) => (
            <OptionLabel key={opt.value}>
              <input
                type="radio"
                name={`q${i}`}
                value={opt.value}
                checked={answers[i] === opt.value}
                onChange={() => selectAnswer(i, opt.value)}
                disabled={submitted}
              />
              {opt.label}
            </OptionLabel>
          ))}
        </QuestionBlock>
      ))}

      {!submitted ? (
        <SubmitButton onClick={handleSubmit}>
          Submit
        </SubmitButton>
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
