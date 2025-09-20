"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { quizQuestions } from "@/data/questions";
import { QuizAnswer, SkinDiagnosisData } from "@/types";

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showDiagnosisInput, setShowDiagnosisInput] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [skinDiagnosisData, setSkinDiagnosisData] = useState<SkinDiagnosisData>(
    {
      moisture: 50,
      sebum: 50,
      elasticity: 50,
      pigmentation: 50,
      pores: 50,
    }
  );

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Get current answer if exists
  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion.id
  )?.answer;

  // 질문이 바뀔 때마다 모든 상태 초기화
  useEffect(() => {
    const timer = setTimeout(() => {
      // 모든 라디오 버튼과 라벨의 상태 초기화
      const allRadios = document.querySelectorAll('.premium-quiz__option-input');
      const allLabels = document.querySelectorAll('.premium-quiz__option-label');

      allRadios.forEach(radio => {
        if (radio instanceof HTMLElement) {
          radio.blur();
        }
      });

      allLabels.forEach(label => {
        if (label instanceof HTMLElement) {
          label.blur();
          // 인라인 스타일 제거하여 CSS로 다시 제어
          label.style.removeProperty('background');
          label.style.removeProperty('border-color');
          label.style.removeProperty('transform');
        }
      });

      // 현재 활성 요소의 focus 제거
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  const handleAnswer = useCallback(
    (answer: string | number | boolean) => {
      setAnswers((prev) => {
        const filtered = prev.filter(
          (a) => a.questionId !== currentQuestion.id
        );
        return [...filtered, { questionId: currentQuestion.id, answer }];
      });

      // Focus 제거 및 모든 hover 상태 초기화
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      // 모든 라디오 버튼과 라벨의 상태 초기화
      setTimeout(() => {
        const allRadios = document.querySelectorAll('.premium-quiz__option-input');
        const allLabels = document.querySelectorAll('.premium-quiz__option-label');

        allRadios.forEach(radio => {
          if (radio instanceof HTMLElement) {
            radio.blur();
          }
        });

        allLabels.forEach(label => {
          if (label instanceof HTMLElement) {
            label.blur();
            // CSS 클래스를 강제로 재설정
            label.style.background = '';
            label.style.borderColor = '';
            label.style.transform = '';
          }
        });
      }, 100);

      // 답변 후 자동으로 다음 질문으로 이동
      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          if (isLastQuestion) {
            setShowDiagnosisInput(true);
          } else {
            setCurrentQuestionIndex((prev) => prev + 1);
          }
          setIsTransitioning(false);
        }, 250);
      }, 300); // 답변 선택 후 잠깐 대기
    },
    [currentQuestion.id, isLastQuestion]
  );


  const handleBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev - 1);
        setIsTransitioning(false);
      }, 250);
    }
  }, [currentQuestionIndex]);

  // Choose layout based on question index (alternating or based on question type)
  const useLayoutB = currentQuestionIndex % 2 === 1;

  // Photo array for questions (you can customize per question)
  const getQuestionPhoto = (index: number) => {
    const photos = [
      "/images/bg_1.jpg",
      "/images/bg_2.jpg",
      "/images/bg_3.jpg",
      "/images/bg_4.jpg",
      "/images/bg_5.jpg",
      "/images/bg_6.jpg",
      "/images/bg_7.jpg",
      "/images/bg_8.jpg",
    ];
    return photos[index % photos.length];
  };

  const handleSubmit = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("answers", JSON.stringify(answers));
    if (showDiagnosisInput) {
      queryParams.set("diagnosis", JSON.stringify(skinDiagnosisData));
    }
    router.push(`/result?${queryParams.toString()}`);
  };

  const skipDiagnosis = () => {
    handleSubmit();
  };

  if (showDiagnosisInput) {
    return (
      <div className="premium-bg" style={{ paddingTop: '40px' }}>
        <div className="container-xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4 heading-serif">
              피부 진단 데이터{" "}
              <span className="text-lg text-slate-600 korean-text">
                (선택사항)
              </span>
            </h2>
            <p className="text-base text-slate-600 mb-8 leading-relaxed">
              오프라인 매장에서 측정한 피부 진단 수치가 있다면 입력해주세요. 더
              최적화된 제품을 추천받을 수 있습니다.
            </p>

            <div className="space-y-6">
              {[
                { key: "moisture", label: "수분", unit: "%" },
                { key: "sebum", label: "유분", unit: "%" },
                { key: "elasticity", label: "탄력", unit: "%" },
                { key: "pigmentation", label: "색소", unit: "%" },
                { key: "pores", label: "모공", unit: "%" },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-4">
                  <label className="text-base text-slate-700 font-medium w-16 korean-text">
                    {item.label}
                  </label>
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={
                        skinDiagnosisData[item.key as keyof SkinDiagnosisData]
                      }
                      onChange={(e) =>
                        setSkinDiagnosisData((prev) => ({
                          ...prev,
                          [item.key]: parseInt(e.target.value) || 0,
                        }))
                      }
                      className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      placeholder="0-100"
                    />
                    <span className="text-base text-slate-600 w-8 text-right">
                      {item.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={skipDiagnosis}
                className="btn btn--secondary flex-1"
              >
                건너뛰기
              </button>
              <button
                onClick={handleSubmit}
                className="btn btn--primary flex-1"
              >
                결과 확인하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "var(--surface-primary)",
        paddingTop: "var(--top-safe)",
        paddingBottom: "var(--bottom-safe)",
        paddingLeft: "var(--left-safe)",
        paddingRight: "var(--right-safe)",
      }}
    >
      {/* Premium App Bar with Progress */}
      <header className="premium-app-bar">
        <Link href="/" className="premium-app-bar__logo">
          <Image
            src="/images/logo.png"
            alt="EVE LOM"
            width={120}
            height={45}
            style={{ objectFit: 'contain' }}
          />
        </Link>
        <div className="premium-app-bar__progress">
          <span>
            {currentQuestionIndex + 1}/{totalQuestions}
          </span>
          <div className="premium-app-bar__progress-bar">
            <div
              className="premium-app-bar__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <button className="premium-app-bar__help" aria-label="도움말">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </header>

      {/* Single Question Layout with Photo */}
      <main
        className={`premium-quiz ${useLayoutB ? "premium-quiz--layout-b" : ""}`}
      >
        {/* Large Photo Section */}
        <section className="premium-quiz__photo">
          <Image
            src={getQuestionPhoto(currentQuestionIndex)}
            alt={`EVE LOM Quiz Step ${currentQuestionIndex + 1}`}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </section>

        {/* Question Panel */}
        <section
          className={`premium-quiz__panel ${
            isTransitioning
              ? "premium-quiz__slide--entering"
              : "premium-quiz__slide"
          }`}
        >
          <h1
            className="premium-quiz__question"
            style={{ fontFamily: "var(--font-kr)" }}
          >
            {currentQuestion.question}
          </h1>

          <div className="premium-quiz__options">
            {currentQuestion.type === "yesno" && (
              <>
                {[
                  { label: "예", value: true },
                  { label: "아니오", value: false },
                ].map((option) => (
                  <label
                    key={String(option.value)}
                    className="premium-quiz__option"
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={String(option.value)}
                      checked={currentAnswer === option.value}
                      onChange={() => handleAnswer(option.value)}
                      className="premium-quiz__option-input"
                    />
                    <span className="premium-quiz__option-label">
                      {option.label}
                    </span>
                  </label>
                ))}
              </>
            )}

            {(currentQuestion.type === "scale" ||
              currentQuestion.type === "choice") &&
              currentQuestion.options?.map((option, optionIndex) => (
                <label key={optionIndex} className="premium-quiz__option">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={
                      currentQuestion.type === "scale" ? optionIndex : option
                    }
                    checked={
                      currentQuestion.type === "scale"
                        ? currentAnswer === optionIndex
                        : currentAnswer === option
                    }
                    onChange={() =>
                      handleAnswer(
                        currentQuestion.type === "scale" ? optionIndex : option
                      )
                    }
                    className="premium-quiz__option-input"
                  />
                  <span className="premium-quiz__option-label">{option}</span>
                </label>
              ))}
          </div>
        </section>

        {/* Fixed Action Bar */}
        <div className="premium-quiz__actions">
          <button
            className="premium-quiz__back"
            onClick={currentQuestionIndex === 0 ? undefined : handleBack}
            disabled={currentQuestionIndex === 0}
            style={{ opacity: currentQuestionIndex === 0 ? 0.4 : 1 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
              />
            </svg>
            이전
          </button>

        </div>
      </main>
    </div>
  );
}
