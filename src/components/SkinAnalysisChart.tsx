'use client';

import { useEffect, useState } from 'react';
import { SkinAnalysisScore } from '@/utils/recommendation';

interface SkinAnalysisChartProps {
  scores: SkinAnalysisScore;
  animate?: boolean;
}

export default function SkinAnalysisChart({ scores, animate = true }: SkinAnalysisChartProps) {
  const [animatedScores, setAnimatedScores] = useState<SkinAnalysisScore>({
    CPN: 0,
    MWL: 0,
    SCP: 0,
    HSN: 0,
    BGN: 0,
    EUD: 0
  });

  const labels = [
    { key: 'CPN', label: '클렌징 강도', color: '#4a7c59' },
    { key: 'MWL', label: '메이크업 부담', color: '#6b8e6b' },
    { key: 'SCP', label: '피지·모공 케어', color: '#8ca08c' },
    { key: 'HSN', label: '수분 보강', color: '#a6b2a6' },
    { key: 'BGN', label: '민감 케어', color: '#c0c4c0' },
    { key: 'EUD', label: '환경·UV 방어', color: '#d6d9d6' }
  ];

  useEffect(() => {
    if (!animate) {
      setAnimatedScores(scores);
      return;
    }

    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedScores({
        CPN: scores.CPN * easeProgress,
        MWL: scores.MWL * easeProgress,
        SCP: scores.SCP * easeProgress,
        HSN: scores.HSN * easeProgress,
        BGN: scores.BGN * easeProgress,
        EUD: scores.EUD * easeProgress
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedScores(scores);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [scores, animate]);

  const createPolygonPoints = (scores: SkinAnalysisScore) => {
    const center = 160;
    const maxRadius = 120;
    const angleStep = (Math.PI * 2) / 6;
    
    return labels.map((label, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const score = scores[label.key as keyof SkinAnalysisScore];
      const radius = (score / 100) * maxRadius;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  const createGridLines = () => {
    const center = 160;
    const maxRadius = 120;
    const angleStep = (Math.PI * 2) / 6;
    const gridLevels = [20, 40, 60, 80, 100];

    return (
      <>
        {/* 축선 */}
        {labels.map((_, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const x = center + maxRadius * Math.cos(angle);
          const y = center + maxRadius * Math.sin(angle);
          return (
            <line
              key={`axis-${index}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          );
        })}

        {/* 동심원 */}
        {gridLevels.map((level) => {
          const radius = (level / 100) * maxRadius;
          const points = labels.map((_, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');

          return (
            <polygon
              key={`grid-${level}`}
              points={points}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          );
        })}
      </>
    );
  };

  const createLabels = () => {
    const center = 160;
    const labelRadius = 150;
    const angleStep = (Math.PI * 2) / 6;

    return labels.map((label, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = center + labelRadius * Math.cos(angle);
      const y = center + labelRadius * Math.sin(angle);
      
      return (
        <g key={`label-${index}`}>
          <text
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-xs font-medium fill-gray-700"
            style={{ fontSize: '11px' }}
          >
            {label.label}
          </text>
          <text
            x={x}
            y={y + 15}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-xs font-bold"
            fill={label.color}
            style={{ fontSize: '12px' }}
          >
            {Math.round(animatedScores[label.key as keyof SkinAnalysisScore])}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">
        피부 분석 결과
      </h3>
      
      <div className="relative">
        <svg width="320" height="320" viewBox="0 0 320 320" className="w-full h-auto">
          {/* 배경 격자 */}
          {createGridLines()}
          
          {/* 데이터 영역 */}
          <polygon
            points={createPolygonPoints(animatedScores)}
            fill="rgba(74, 124, 89, 0.2)"
            stroke="#4a7c59"
            strokeWidth="2"
            className="drop-shadow-sm"
          />
          
          {/* 데이터 포인트 */}
          {labels.map((label, index) => {
            const center = 160;
            const maxRadius = 120;
            const angleStep = (Math.PI * 2) / 6;
            const angle = index * angleStep - Math.PI / 2;
            const score = animatedScores[label.key as keyof SkinAnalysisScore];
            const radius = (score / 100) * maxRadius;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            
            return (
              <circle
                key={`point-${index}`}
                cx={x}
                cy={y}
                r="4"
                fill={label.color}
                stroke="white"
                strokeWidth="2"
                className="drop-shadow-sm"
              />
            );
          })}
          
          {/* 라벨 */}
          {createLabels()}
        </svg>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          각 지표는 100점 만점으로 계산됩니다
        </p>
      </div>
    </div>
  );
}