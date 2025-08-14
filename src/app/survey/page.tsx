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
      <div className="min-h-screen gradient-bg py-4 sm:py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center text-[#4a7c59] hover:text-[#3d6549] mb-8"
          >
            ← 홈으로 돌아가기
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-medium text-gray-800 mb-2">
              피부 진단 데이터 (선택사항)
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              오프라인 매장에서 측정한 피부 진단 수치가 있다면 입력해주세요. 더
              정확한 추천을 받을 수 있습니다.
            </p>

            <div className="space-y-4 sm:space-y-6">
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
                  <label className="text-sm sm:text-base text-gray-700 font-medium w-16 sm:w-20">
                    {item.label}
                  </label>
                  <div className="flex items-center space-x-2 sm:space-x-4 flex-1 ml-2 sm:ml-4">
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
                      className="flex-1 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent text-sm sm:text-base"
                      placeholder="0-100"
                    />
                    <span className="text-sm sm:text-base text-gray-600 w-6 sm:w-8 text-right">
                      {item.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8 sm:mt-12">
              <button
                onClick={skipDiagnosis}
                className="flex-1 py-3 text-sm sm:text-base text-gray-600 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                건너뛰기
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 text-sm sm:text-base bg-[#4a7c59] text-white rounded-full hover:bg-[#3d6549] transition-colors"
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
    <div className="min-h-screen gradient-bg py-4 sm:py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center text-[#4a7c59] hover:text-[#3d6549] mb-8"
        >
          ← 홈으로 돌아가기
        </Link>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">진행상황</span>
            <span className="text-sm text-gray-600">
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
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <h2 className="text-lg sm:text-xl font-medium text-gray-800 mb-6 sm:mb-8">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.type === "yesno" && (
              <>
                <button
                  onClick={() => handleAnswer(true)}
                  className="w-full p-3 sm:p-4 text-left text-sm sm:text-base rounded-xl border border-gray-200 hover:border-[#4a7c59] hover:bg-[#4a7c59]/5 transition-all"
                >
                  예
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="w-full p-3 sm:p-4 text-left text-sm sm:text-base rounded-xl border border-gray-200 hover:border-[#4a7c59] hover:bg-[#4a7c59]/5 transition-all"
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
                  className="w-full p-3 sm:p-4 text-left text-sm sm:text-base rounded-xl border border-gray-200 hover:border-[#4a7c59] hover:bg-[#4a7c59]/5 transition-all"
                >
                  {option}
                </button>
              ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-4 sm:px-6 py-2 text-sm sm:text-base text-gray-600 disabled:text-gray-400 hover:text-[#4a7c59] transition-colors disabled:cursor-not-allowed"
          >
            이전
          </button>
          <span className="text-xs sm:text-sm text-gray-500">
            {currentQuestionIndex + 1} / {quizQuestions.length}
          </span>
        </div>
      </div>
    </div>
  );
}
