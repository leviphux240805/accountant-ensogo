import React from 'react';
import {
  FileText,
  TrendingUp,
  Users,
  Zap,
  BarChart3
} from 'lucide-react';
import './QuickActions.css';

interface QuickAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  bgColor: string;
}

const actions: QuickAction[] = [
  {
    id: 'create-contract',
    icon: <FileText size={24} />,
    label: 'Tạo hợp đồng',
    color: '#0066cc',
    bgColor: '#e6f2ff'
  },
  {
    id: 'receipt-in',
    icon: <TrendingUp size={24} />,
    label: 'Lập phiếu thu',
    color: '#52c41a',
    bgColor: '#f6ffed'
  },
  {
    id: 'receipt-out',
    icon: <TrendingUp size={24} />,
    label: 'Lập phiếu chi',
    color: '#ff7a45',
    bgColor: '#fff7e6'
  },
  {
    id: 'sync-invoice',
    icon: <Zap size={24} />,
    label: 'Đồng bộ hóa đơn',
    color: '#faad14',
    bgColor: '#fffbe6'
  },
  {
    id: 'create-reconciliation',
    icon: <BarChart3 size={24} />,
    label: 'Tạo đối soát',
    color: '#13c2c2',
    bgColor: '#e6fffb'
  },
  {
    id: 'add-partner',
    icon: <Users size={24} />,
    label: 'Thêm đối tác',
    color: '#eb2f96',
    bgColor: '#fff1f0'
  }
];

export const QuickActions: React.FC = () => {
  return (
    <div className="quick-actions">
      <h3 className="quick-actions-title">Thao tác nhanh</h3>
      <div className="actions-grid">
        {actions.map((action) => (
          <button
            key={action.id}
            className="action-card"
            style={{ '--action-color': action.color, '--action-bg': action.bgColor } as React.CSSProperties}
          >
            <div className="action-icon" style={{ backgroundColor: action.bgColor, color: action.color }}>
              {action.icon}
            </div>
            <span className="action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
