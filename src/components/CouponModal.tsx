"use client";

import { useState } from "react";
import { useCouponStore } from "@/store/couponStore";
import {
  checkPhoneNumberExists,
  createCustomerCoupon,
  updateCouponUsage,
} from "@/lib/couponApi";

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendedProduct: string;
}

type ModalState = "form" | "success";

export default function CouponModal({
  isOpen,
  onClose,
  recommendedProduct,
}: CouponModalProps) {
  const {
    setCurrentCustomer,
    setLoading,
    setError,
    isLoading,
    error,
    currentCustomer,
  } = useCouponStore();
  const [modalState, setModalState] = useState<ModalState>("form");
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const resetModal = () => {
    setModalState("form");
    setFormData({ name: "", phoneNumber: "" });
    setAgreePrivacy(false);
    setError(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^(010|011|016|017|018|019)-?\d{3,4}-?\d{4}$/;
    return phoneRegex.test(phone.replace(/-/g, ""));
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phoneNumber: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("이름을 입력해주세요.");
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      setError("올바른 전화번호를 입력해주세요.");
      return;
    }

    if (!agreePrivacy) {
      setError("개인정보처리방침에 동의해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const phoneExists = await checkPhoneNumberExists(formData.phoneNumber);

      if (phoneExists) {
        setError(
          "이미 참여하신 전화번호입니다. 전화번호당 1회만 참여 가능합니다."
        );
        setLoading(false);
        return;
      }

      const customerData = {
        name: formData.name,
        phone_number: formData.phoneNumber,
        recommended_product: recommendedProduct,
        is_used: false,
      };

      const customer = await createCustomerCoupon(customerData);
      setCurrentCustomer(customer);
      setModalState("success");
    } catch (error: unknown) {
      console.error("Error creating coupon:", error);
      const errorMessage =
        (error as Error)?.message ||
        (error as { error_description?: string })?.error_description ||
        "쿠폰 발급 중 오류가 발생했습니다.";
      setError(`오류: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStaffUse = async () => {
    if (!currentCustomer) return;

    setLoading(true);
    try {
      await updateCouponUsage(currentCustomer.phone_number, true);
      setCurrentCustomer({
        ...currentCustomer,
        is_used: true,
        used_at: new Date().toISOString(),
      });
      alert("쿠폰 사용 처리가 완료되었습니다.");
    } catch (error) {
      console.error("Error using coupon:", error);
      alert("쿠폰 사용 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToShopping = () => {
    handleClose();
    // 추천 제품별 구매 링크로 이동
    let purchaseUrl = "";
    switch (recommendedProduct) {
      case "Cleansing Balm":
        purchaseUrl = "https://brand.naver.com/evelom/products/9073888748";
        break;
      case "Foaming Cream Cleanser":
        purchaseUrl = "https://brand.naver.com/evelom/products/10041948380";
        break;
      case "Cleansing Oil":
        purchaseUrl = "https://brand.naver.com/evelom/products/11805775361";
        break;
      case "Gel Balm Cleanser":
        purchaseUrl = "https://brand.naver.com/evelom/products/11789821043";
        break;
      default:
        return;
    }
    window.open(purchaseUrl, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0" onClick={handleClose}></div>
      <div
        className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto shadow-2xl relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {modalState === "form"
              ? "🎉 POP-UP 특별 할인 쿠폰"
              : "🎉 쿠폰 발급 완료"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {modalState === "form" ? (
            <>
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-4">
                  추천받은 제품의{" "}
                  <span className="text-[#4a7c59] font-semibold">
                    10% 할인 쿠폰
                  </span>
                  을 받으세요!
                </p>
                <div className="p-3 bg-[#f8f9fa] rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>추천 제품:</strong> {recommendedProduct}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    이름 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent outline-none"
                    placeholder="이름을 입력해주세요"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    전화번호 *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent outline-none"
                    placeholder="010-1234-5678"
                    required
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={agreePrivacy}
                    onChange={(e) => setAgreePrivacy(e.target.checked)}
                    className="mt-1 h-4 w-4 text-[#4a7c59] focus:ring-[#4a7c59] border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-700">
                    개인정보 수집 및 이용에 동의합니다. (필수) *
                    <br />
                    <span className="text-xs text-gray-500">
                      수집목적: 쿠폰 발급 및 관리, 수집항목: 이름, 전화번호,
                      보유기간: 쿠폰 사용 완료 후 1년
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#4a7c59] text-white py-3 px-4 rounded-lg hover:bg-[#3d6549] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isLoading ? "처리 중..." : "쿠폰 받기"}
                </button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  ⚠️ 전화번호당 1회만 참여 가능합니다
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                {/* Success Icon */}
                <div className="mb-6">
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "#4a7c59",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                    }}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  쿠폰이 발급되었습니다!
                </h3>

                {currentCustomer && (
                  <div className="mb-6 p-4 bg-[#f8f9fa] rounded-lg text-left">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                      쿠폰 정보
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">이름:</span>
                        <span className="font-medium">
                          {currentCustomer.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">전화번호:</span>
                        <span className="font-medium">
                          {currentCustomer.phone_number}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">추천 제품:</span>
                        <span className="font-medium">
                          {currentCustomer.recommended_product}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">할인율:</span>
                        <span className="font-bold text-[#4a7c59]">10%</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>💡 쿠폰 사용 방법</strong>
                    <br />
                    매장 직원에게 해당 페이지를 보여주세요.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Staff Use Button */}
                  {currentCustomer && !currentCustomer.is_used && (
                    <button
                      onClick={handleStaffUse}
                      disabled={isLoading}
                      className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {isLoading
                        ? "처리 중..."
                        : "🏪 직원 확인 - 쿠폰 사용 처리"}
                    </button>
                  )}

                  <button
                    onClick={handleClose}
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    닫기
                  </button>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  <p>※ 쿠폰은 매장에서만 사용 가능합니다</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
