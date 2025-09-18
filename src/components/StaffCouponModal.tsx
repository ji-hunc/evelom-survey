"use client";

import { useState } from "react";
import { updateCouponUsage, getCustomerByPhone, testSupabaseConnection } from "@/lib/couponApi";

interface StaffCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StaffCouponModal({ isOpen, onClose }: StaffCouponModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");

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
    setPhoneNumber(formatted);
  };

  const handleUseCoupon = async () => {
    if (!phoneNumber.trim()) {
      setMessage("전화번호를 입력해주세요.");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // First test Supabase connection
      const isConnected = await testSupabaseConnection();
      if (!isConnected) {
        setMessage("데이터베이스 연결에 실패했습니다. 테이블이 생성되지 않았을 수 있습니다.");
        setMessageType("error");
        setIsLoading(false);
        return;
      }

      console.log("Checking customer for phone:", phoneNumber);
      const customer = await getCustomerByPhone(phoneNumber);
      console.log("Customer found:", customer);

      if (!customer) {
        setMessage("해당 전화번호로 발급된 쿠폰이 없습니다.");
        setMessageType("error");
        setIsLoading(false);
        return;
      }

      if (customer.is_used) {
        setMessage("이미 사용된 쿠폰입니다.");
        setMessageType("error");
        setIsLoading(false);
        return;
      }

      console.log("Updating coupon usage for:", phoneNumber);
      await updateCouponUsage(phoneNumber, true);
      setMessage(`쿠폰 사용 처리가 완료되었습니다.\n고객명: ${customer.name}\n제품: ${customer.recommended_product}`);
      setMessageType("success");
      setPhoneNumber("");
    } catch (error: any) {
      console.error("Error using coupon:", error);
      const errorMessage = error?.message || error?.error_description || "쿠폰 사용 처리 중 오류가 발생했습니다.";
      setMessage(`오류: ${errorMessage}`);
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPhoneNumber("");
    setMessage("");
    setMessageType("info");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="absolute inset-0"
        onClick={handleClose}
      ></div>
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">직원용 쿠폰 사용</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="staffPhone" className="block text-sm font-medium text-gray-700 mb-2">
              고객 전화번호
            </label>
            <input
              type="tel"
              id="staffPhone"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent outline-none"
              placeholder="010-1234-5678"
            />
          </div>

          {message && (
            <div className={`p-3 rounded-md ${
              messageType === "success"
                ? "bg-green-100 border border-green-400 text-green-700"
                : messageType === "error"
                ? "bg-red-100 border border-red-400 text-red-700"
                : "bg-blue-100 border border-blue-400 text-blue-700"
            }`}>
              <pre className="text-sm whitespace-pre-wrap">{message}</pre>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              onClick={handleUseCoupon}
              disabled={isLoading}
              className="flex-1 bg-[#4a7c59] text-white py-2 px-4 rounded-md hover:bg-[#3d6549] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "처리 중..." : "쿠폰 사용 처리"}
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}