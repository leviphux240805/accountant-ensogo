import React from 'react';
import { Building2, TrendingUp } from 'lucide-react';
import './PartnerDebts.css';

interface Partner {
  id: string;
  name: string;
  taxCode: string;
  contractCount: number;
  totalDebt: number;
  status: 'normal' | 'warning' | 'overdue';
  statusLabel: string;
  daysOverdue?: number;
}

const partners: Partner[] = [
  {
    id: '1',
    name: 'Công ty Cổ phần ABC Việt Nam',
    taxCode: '0123456789',
    contractCount: 5,
    totalDebt: 450000000,
    status: 'warning',
    statusLabel: 'Sắp đến hạn',
    daysOverdue: 5
  },
  {
    id: '2',
    name: 'Tập đoàn XYZ International',
    taxCode: '0987654321',
    contractCount: 8,
    totalDebt: 320000000,
    status: 'normal',
    statusLabel: 'Bình thường'
  },
  {
    id: '3',
    name: 'Công ty TNHH DEF Solutions',
    taxCode: '0111222333',
    contractCount: 3,
    totalDebt: 280000000,
    status: 'overdue',
    statusLabel: 'Quá hạn',
    daysOverdue: 12
  },
  {
    id: '4',
    name: 'Doanh nghiệp GHI Tech',
    taxCode: '0444555666',
    contractCount: 6,
    totalDebt: 215000000,
    status: 'normal',
    statusLabel: 'Bình thường'
  },
  {
    id: '5',
    name: 'Công ty JKL Resources',
    taxCode: '0777888999',
    contractCount: 4,
    totalDebt: 180000000,
    status: 'warning',
    statusLabel: 'Sắp đến hạn',
    daysOverdue: 3
  },
  {
    id: '6',
    name: 'Nhóm MNO Business',
    taxCode: '0101010101',
    contractCount: 2,
    totalDebt: 125000000,
    status: 'normal',
    statusLabel: 'Bình thường'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'normal':
      return '#52c41a';
    case 'warning':
      return '#faad14';
    case 'overdue':
      return '#ff4d4f';
    default:
      return '#666';
  }
};

export const PartnerDebts: React.FC = () => {
  return (
    <div className="partner-debts-card">
      <h3 className="partner-title">Công nợ đối tác</h3>
      <p className="partner-subtitle">Danh sách đối tác có dư nợ lớn nhất</p>
      
      <div className="partners-list">
        {partners.map((partner) => (
          <div key={partner.id} className="partner-item">
            <div className="partner-icon">
              <Building2 size={20} />
            </div>
            
            <div className="partner-info">
              <p className="partner-name">{partner.name}</p>
              <p className="partner-details">
                MST: {partner.taxCode} • {partner.contractCount} hợp đồng
              </p>
            </div>

            <div className="partner-debt">
              <span className="debt-value">
                {partner.totalDebt.toLocaleString('vi-VN')} ₫
              </span>
              <span className="debt-label">Công nợ</span>
            </div>

            <div className="partner-status">
              <span 
                className="status-badge"
                style={{ 
                  backgroundColor: `${getStatusColor(partner.status)}20`, 
                  color: getStatusColor(partner.status),
                  borderColor: getStatusColor(partner.status)
                }}
              >
                {partner.statusLabel}
                {partner.daysOverdue && (
                  <span className="days-badge">{partner.daysOverdue}d</span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="view-all-btn">Xem tất cả đối tác</button>
    </div>
  );
};
