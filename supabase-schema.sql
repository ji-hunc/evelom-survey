-- 고객 쿠폰 정보 테이블
CREATE TABLE customer_coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20) NOT NULL UNIQUE, -- 전화번호를 유니크로 설정하여 중복 방지
  recommended_product VARCHAR(100) NOT NULL,
  is_used BOOLEAN DEFAULT FALSE, -- 쿠폰 사용 여부
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 전화번호에 인덱스 추가 (조회 성능 향상)
CREATE INDEX idx_customer_coupons_phone ON customer_coupons(phone_number);

-- 쿠폰 사용일시 추가를 위한 컬럼
ALTER TABLE customer_coupons ADD COLUMN used_at TIMESTAMP WITH TIME ZONE;

-- updated_at 자동 업데이트 함수 생성
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 자동 업데이트 트리거 생성
CREATE TRIGGER update_customer_coupons_updated_at
    BEFORE UPDATE ON customer_coupons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 활성화 (보안을 위해)
ALTER TABLE customer_coupons ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기/쓰기 가능하도록 정책 설정 (필요에 따라 조정)
CREATE POLICY "Enable all operations for all users" ON customer_coupons
FOR ALL USING (true);