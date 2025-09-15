"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { quizQuestions } from "@/data/questions";
import { QuizAnswer, SkinDiagnosisData } from "@/types";

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showDiagnosisInput, setShowDiagnosisInput] = useState(false);
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
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleAnswer = (answer: string | number | boolean) => {
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      answer,
    };

    const updatedAnswers = answers.filter(
      (a) => a.questionId !== currentQuestion.id
    );
    updatedAnswers.push(newAnswer);
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      setShowDiagnosisInput(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
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
      <div className="min-h-screen gradient-bg py-2 sm:py-4">
        <div className="max-w-6xl mx-auto px-1 sm:px-2 lg:px-2 xl:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-base lg:text-xl text-[#4a7c59] hover:text-[#3d6549] mb-3 lg:mb-4"
          >
            ← 홈으로 돌아가기
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-800 mb-3 lg:mb-4">
              피부 진단 데이터 (선택사항)
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6">
              오프라인 매장에서 측정한 피부 진단 수치가 있다면 입력해주세요. 더
              정확한 추천을 받을 수 있습니다.
            </p>

            <div className="space-y-3 sm:space-y-4 lg:space-y-4">
              {[
                { key: "moisture", label: "수분", unit: "%" },
                { key: "sebum", label: "유분", unit: "%" },
                { key: "elasticity", label: "탄력", unit: "%" },
                { key: "pigmentation", label: "색소", unit: "%" },
                { key: "pores", label: "모공", unit: "%" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between"
                >
                  <label className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium w-16 sm:w-20 lg:w-24">
                    {item.label}
                  </label>
                  <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-1 ml-2 sm:ml-3 lg:ml-4">
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
                      className="flex-1 px-2 sm:px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent text-sm sm:text-base lg:text-lg"
                      placeholder="0-100"
                    />
                    <span className="text-sm sm:text-base lg:text-lg text-gray-600 w-6 sm:w-8 lg:w-10 text-right">
                      {item.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
              <button
                onClick={skipDiagnosis}
                className="flex-1 py-3 lg:py-4 text-sm sm:text-base lg:text-lg text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                건너뛰기
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 lg:py-4 text-sm sm:text-base lg:text-lg bg-[#4a7c59] text-white rounded-full hover:bg-[#3d6549] transition-colors"
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
    <div className="min-h-screen gradient-bg py-2 sm:py-4">
      <div className="quiz-container max-w-6xl mx-auto px-1 sm:px-2 lg:px-2 xl:px-8">
        <Link
          href="/"
          className="inline-flex items-center text-lg lg:text-2xl text-[#4a7c59] hover:text-[#3d6549] mb-4 lg:mb-6"
        >
          ← 홈으로 돌아가기
        </Link>

        {/* Progress Bar */}
        <div className="progress-container mb-4 lg:mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-base lg:text-xl text-gray-600">진행상황</span>
            <span className="text-base lg:text-xl text-gray-600">
              {currentQuestionIndex + 1} / {quizQuestions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#4a7c59] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="quiz-question-card bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 lg:p-10 xl:p-8 mb-6">
          <h2 className="quiz-question-title text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-3xl font-medium text-gray-800 mb-6 sm:mb-8 lg:mb-10 xl:mb-6">
            {currentQuestion.question}
          </h2>

          <div className="quiz-options space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-4">
            {currentQuestion.type === "yesno" && (
              <>
                <button
                  onClick={() => handleAnswer(true)}
                  className="quiz-option-button w-full p-4 sm:p-5 md:p-8 lg:p-12 xl:p-6 text-left text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-xl rounded-xl border border-gray-200 hover:border-[#4a7c59] hover:bg-[#4a7c59]/5 transition-all"
                >
                  예
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="quiz-option-button w-full p-4 sm:p-5 md:p-8 lg:p-12 xl:p-6 text-left text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-xl rounded-xl border border-gray-200 hover:border-[#4a7c59] hover:bg-[#4a7c59]/5 transition-all"
                >
                  아니오
                </button>
              </>
            )}

            {(currentQuestion.type === "scale" ||
              currentQuestion.type === "choice") &&
              currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswer(
                      currentQuestion.type === "scale" ? index : option
                    )
                  }
                  className="quiz-option-button w-full p-4 sm:p-5 md:p-8 lg:p-12 xl:p-6 text-left text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-xl rounded-xl border border-gray-200 hover:border-[#4a7c59] hover:bg-[#4a7c59]/5 transition-all"
                >
                  {option}
                </button>
              ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="navigation-container flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-8 py-3 md:py-4 lg:py-5 xl:py-3 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-lg text-gray-600 disabled:text-gray-400 hover:text-[#4a7c59] transition-colors disabled:cursor-not-allowed"
          >
            이전
          </button>
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-lg text-gray-500">
            {currentQuestionIndex + 1} / {quizQuestions.length}
          </span>
        </div>
      </div>
    </div>
  );
}
