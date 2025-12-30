import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './KPICards.css';

interface KPICard {
  id: string;
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend: number;
  trendLabel: string;
  color: string;
}

const kpiData: KPICard[] = [
  {
    id: 'contracts',
    title: 'Hợp đồng chờ xử lý',
    value: 24,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
      </svg>
    ),
    trend: 8.2,
    trendLabel: 'Tăng so với tháng trước',
    color: '#0066cc'
  },
  {
    id: 'invoices',
    title: 'Hóa đơn chờ đồng bộ',
    value: 57,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    trend: -5.1,
    trendLabel: 'Giảm so với tháng trước',
    color: '#00b96b'
  },
  {
    id: 'reconciliation',
    title: 'Đối soát chưa hoàn tất',
    value: 12,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="1" />
        <path d="M12 8v-3" />
        <path d="M15.5 13.5l2.1 2.1" />
        <path d="M18 12h3" />
        <path d="M15.5 10.5l2.1-2.1" />
        <path d="M12 16v3" />
        <path d="M8.5 13.5l-2.1 2.1" />
        <path d="M6 12H3" />
        <path d="M8.5 10.5l-2.1-2.1" />
      </svg>
    ),
    trend: 2.5,
    trendLabel: 'Tăng so với tháng trước',
    color: '#ff7a45'
  },
  {
    id: 'receipts',
    title: 'Phiếu thu/chi tồn đọng',
    value: 8,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="16" y1="3" x2="16" y2="21" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="8" y1="3" x2="8" y2="21" />
      </svg>
    ),
    trend: -3.2,
    trendLabel: 'Giảm so với tháng trước',
    color: '#eb2f96'
  }
];

export const KPICards: React.FC = () => {
  return (
    <div className="kpi-container">
      {kpiData.map((card) => (
        <div key={card.id} className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon" style={{ color: card.color }}>
              {card.icon}
            </div>
            <div className="kpi-title">{card.title}</div>
          </div>
          
          <div className="kpi-value">{card.value}</div>
          
          <div className={`kpi-trend ${card.trend >= 0 ? 'positive' : 'negative'}`}>
            {card.trend >= 0 ? (
              <>
                <TrendingUp size={14} />
                <span>{Math.abs(card.trend)}%</span>
              </>
            ) : (
              <>
                <TrendingDown size={14} />
                <span>{Math.abs(card.trend)}%</span>
              </>
            )}
            <span className="trend-label">{card.trendLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
