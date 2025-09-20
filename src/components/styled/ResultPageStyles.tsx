import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background: ${theme.colors.surface.primary};
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  overflow: hidden;
`;

export const AppBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  height: ${theme.layout.appBarHeight};
  background: ${theme.colors.surface.overlay};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.layout.edgeBuffer};
  transition: all ${theme.transitions.quick};
`;

export const Logo = styled.a`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.light};
  color: ${theme.colors.ink.primary};
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

export const HelpButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.ink.secondary};
  transition: color ${theme.transitions.quick};

  &:hover {
    color: ${theme.colors.ink.primary};
  }
`;

export const ResultsMain = styled.main`
  position: relative;
  height: calc(100vh - ${theme.layout.appBarHeight});
  height: calc(100dvh - ${theme.layout.appBarHeight});
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overscroll-behavior: none;
  background: ${theme.colors.surface.primary};

  /* Hide scrollbars */
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Section = styled.section`
  height: calc(100vh - ${theme.layout.appBarHeight});
  height: calc(100dvh - ${theme.layout.appBarHeight});
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
`;

export const RadarSection = styled(Section)`
  background: linear-gradient(
    135deg,
    ${theme.colors.surface.primary} 0%,
    ${theme.colors.surface.secondary} 50%,
    ${theme.colors.surface.tertiary} 100%
  );
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${theme.spacing[8]};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 200px;
    height: 200px;
    background: radial-gradient(
      circle,
      rgba(201, 179, 126, 0.1) 0%,
      transparent 70%
    );
    border-radius: 50%;
    top: 10%;
    right: 10%;
    z-index: 0;
  }

  &::before {
    content: "";
    position: absolute;
    width: 150px;
    height: 150px;
    background: radial-gradient(
      circle,
      rgba(201, 179, 126, 0.08) 0%,
      transparent 70%
    );
    border-radius: 50%;
    bottom: 15%;
    left: 8%;
    z-index: 0;
  }
`;

export const RadarTitle = styled.h1`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: ${theme.typography.fontSize["4xl"]};
  font-weight: ${theme.typography.fontWeight.light};
  color: ${theme.colors.ink.primary};
  margin-bottom: ${theme.spacing[2]};
  letter-spacing: -0.02em;
  position: relative;
  z-index: 10;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize["4xl"]};
  }
`;

export const RadarSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.ink.secondary};
  margin-bottom: ${theme.spacing[6]};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-family: ${theme.typography.fontFamily.body};
  position: relative;
  z-index: 10;
`;

export const RadarContainer = styled.div`
  background: ${theme.colors.surface.primary};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[8]};
  box-shadow: 0 32px 64px rgba(15, 23, 42, 0.12),
    0 16px 32px rgba(15, 23, 42, 0.08), 0 8px 16px rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.04);
  position: relative;
  max-width: 700px;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: linear-gradient(
      135deg,
      rgba(201, 179, 126, 0.06) 0%,
      transparent 50%
    );
    border-radius: 40px;
    z-index: -1;
  }
`;

export const RadarChart = styled.div`
  width: ${theme.radar.size11};
  height: ${theme.radar.size11};
  margin: 0 auto;

  @media screen and (max-width: 1194px) {
    width: 480px;
    height: 480px;
  }
`;

export const ScrollCue = styled.div`
  position: absolute;
  bottom: ${theme.spacing[8]};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[2]};
  cursor: pointer;
  transition: all ${theme.transitions.quick};
  z-index: 10;

  &:hover {
    transform: translateX(-50%) translateY(-4px);
  }
`;

export const ScrollText = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.ink.secondary};
  font-family: ${theme.typography.fontFamily.body};
  text-align: center;
`;

export const ProductSection = styled(Section)`
  background: ${theme.colors.surface.primary};
  padding: ${theme.spacing[8]};
  justify-content: center;
  align-items: center;
`;

export const SectionTitle = styled.h1`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: ${theme.typography.fontSize["4xl"]};
  font-weight: ${theme.typography.fontWeight.light};
  color: ${theme.colors.ink.primary};
  text-align: left;
  margin-bottom: ${theme.spacing[6]};
  letter-spacing: -0.02em;
  margin-top: 0;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize["4xl"]};
    text-align: center;
  }
`;

export const ProductContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing[12]};
  align-items: center;
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing[8]};
  }
`;

export const ProductCard = styled.div`
  text-align: center;
  background: ${theme.colors.surface.secondary};
  border-radius: ${theme.borderRadius.lg};
  padding: 0;
  box-shadow: ${theme.shadows.lg};
  overflow: hidden;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  margin: 0 0 ${theme.spacing[6]} 0;
  border-radius: ${theme.borderRadius.md} ${theme.borderRadius.md} 0 0;
`;

export const ProductName = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: ${theme.typography.fontSize["3xl"]};
  font-weight: ${theme.typography.fontWeight.light};
  color: ${theme.colors.ink.primary};
  margin-bottom: ${theme.spacing[4]};
  letter-spacing: -0.02em;
  padding: 0 ${theme.spacing[8]};
`;

export const ProductDescription = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.ink.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-bottom: ${theme.spacing[6]};
  font-family: ${theme.typography.fontFamily.body};
  padding: 0 ${theme.spacing[8]};
`;

export const ProductActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
  padding: 0 ${theme.spacing[8]} ${theme.spacing[8]} ${theme.spacing[8]};
`;

export const CouponButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.full};
  padding: ${theme.spacing[4]} ${theme.spacing[8]};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.transitions.quick};
  font-family: ${theme.typography.fontFamily.body};

  &:hover {
    background: #3d6549;
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[6]};

  ${SectionTitle} {
    margin-bottom: ${theme.spacing[6]};
  }
`;

export const DetailsTitle = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: ${theme.typography.fontSize["3xl"]};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.ink.primary};
  letter-spacing: -0.02em;
  margin-top: 30px;
`;

export const Reason = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  align-items: flex-start;
  background: rgba(201, 179, 126, 0.08);
  padding: ${theme.spacing[6]};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid rgba(201, 179, 126, 0.2);
  box-shadow: 0 2px 8px rgba(201, 179, 126, 0.1);
  transition: all ${theme.transitions.quick};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(201, 179, 126, 0.15);
  }
`;

export const ReasonNumber = styled.div`
  background: ${theme.colors.secondary};
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.base};
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(201, 179, 126, 0.3);
`;

export const ReasonContent = styled.div`
  flex: 1;

  h4 {
    font-family: ${theme.typography.fontFamily.heading};
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.ink.primary};
    margin-bottom: ${theme.spacing[2]};
  }

  p {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.ink.secondary};
    line-height: ${theme.typography.lineHeight.relaxed};
    font-family: ${theme.typography.fontFamily.body};
  }
`;

export const OtherSection = styled(Section)`
  background: ${theme.colors.surface.secondary};
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing[8]};
`;

export const OtherContent = styled.div`
  max-width: ${theme.layout.maxWidth};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

export const OtherHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing[6]};
  background: ${theme.colors.surface.secondary};
  z-index: 10;
`;

export const OtherTitle = styled.h2`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: ${theme.typography.fontSize["4xl"]};
  font-weight: ${theme.typography.fontWeight.light};
  color: ${theme.colors.ink.primary};
  margin-bottom: ${theme.spacing[2]};
`;

export const OtherSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.ink.secondary};
  font-family: ${theme.typography.fontFamily.body};
`;

export const OtherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing[6]};
  align-content: center;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
`;

export const OtherCard = styled.div`
  background: ${theme.colors.surface.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: 0;
  text-align: center;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.quick};
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

export const OtherImage = styled.img`
  width: 100%;
  height: 320px;
  object-fit: cover;
  margin: 0 0 ${theme.spacing[4]} 0;
  border-radius: ${theme.borderRadius.md} ${theme.borderRadius.md} 0 0;
`;

export const OtherName = styled.h3`
  font-family: ${theme.typography.fontFamily.heading};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.ink.primary};
  margin-bottom: ${theme.spacing[3]};
  padding: 0 ${theme.spacing[4]};
`;

export const OtherBenefits = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[4]};
  padding: 0 ${theme.spacing[4]} ${theme.spacing[4]} ${theme.spacing[4]};
`;

export const OtherBenefit = styled.div`
  background: rgba(201, 179, 126, 0.08);
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid rgba(201, 179, 126, 0.2);
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.ink.secondary};
  font-family: ${theme.typography.fontFamily.body};
  transition: all ${theme.transitions.quick};
  box-shadow: 0 1px 4px rgba(201, 179, 126, 0.1);

  &:hover {
    background: rgba(201, 179, 126, 0.12);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(201, 179, 126, 0.15);
  }
`;

export const OtherCTA = styled.button`
  display: none;
`;

export const StaffButton = styled.button`
  position: fixed;
  bottom: ${theme.spacing[4]};
  right: ${theme.spacing[4]};
  background: ${theme.colors.gray[600]};
  color: white;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.sm};
  font-size: 10px;
  border: none;
  cursor: pointer;
  transition: all ${theme.transitions.quick};
  z-index: 40;
  opacity: 0.75;
  font-family: ${theme.typography.fontFamily.body};

  &:hover {
    background: ${theme.colors.gray[700]};
  }
`;
