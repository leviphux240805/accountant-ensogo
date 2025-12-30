import React from 'react';
import {
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Clock
} from 'lucide-react';
import './RecentActivities.css';

interface Activity {
  id: string;
  icon: React.ReactNode;
  type: string;
  documentName: string;
  documentCode: string;
  partnerName: string;
  date: string;
  status: 'pending' | 'completed' | 'difference' | 'processing';
  statusLabel: string;
  amount: number;
}

const activities: Activity[] = [
  {
    id: '1',
    icon: <FileText size={18} />,
    type: 'Hợp đồng',
    documentName: 'Hợp đồng cung cấp dịch vụ',
    documentCode: 'HD-2025-001',
    partnerName: 'Công ty ABC',
    date: '30/12/2025',
    status: 'pending',
    statusLabel: 'Chờ xử lý',
    amount: 50000000
  },
  {
    id: '2',
    icon: <TrendingUp size={18} />,
    type: 'Phiếu thu',
    documentName: 'Phiếu thu tiền hàng',
    documentCode: 'PT-2025-042',
    partnerName: 'Công ty XYZ',
    date: '29/12/2025',
    status: 'completed',
    statusLabel: 'Hoàn thành',
    amount: 25000000
  },
  {
    id: '3',
    icon: <FileText size={18} />,
    type: 'Phiếu chi',
    documentName: 'Phiếu chi thanh toán',
    documentCode: 'PC-2025-018',
    partnerName: 'Công ty DEF',
    date: '28/12/2025',
    status: 'completed',
    statusLabel: 'Hoàn thành',
    amount: 15000000
  },
  {
    id: '4',
    icon: <CheckCircle size={18} />,
    type: 'Đối soát',
    documentName: 'Đối soát công nợ',
    documentCode: 'DS-2025-005',
    partnerName: 'Công ty GHI',
    date: '27/12/2025',
    status: 'difference',
    statusLabel: 'Chênh lệch',
    amount: 3500000
  },
  {
    id: '5',
    icon: <FileText size={18} />,
    type: 'Hóa đơn',
    documentName: 'Hóa đơn điện tử',
    documentCode: 'HĐ-2025-156',
    partnerName: 'Công ty JKL',
    date: '26/12/2025',
    status: 'processing',
    statusLabel: 'Đang xử lý',
    amount: 32000000
  },
  {
    id: '6',
    icon: <TrendingUp size={18} />,
    type: 'Phiếu thu',
    documentName: 'Phiếu thu tiền hàng',
    documentCode: 'PT-2025-041',
    partnerName: 'Công ty MNO',
    date: '25/12/2025',
    status: 'completed',
    statusLabel: 'Hoàn thành',
    amount: 40000000
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return '#faad14';
    case 'completed':
      return '#52c41a';
    case 'difference':
      return '#ff4d4f';
    case 'processing':
      return '#1890ff';
    default:
      return '#666';
  }
};

export const RecentActivities: React.FC = () => {
  return (
    <div className="activities-card">
      <h3 className="activities-title">Hoạt động gần đây</h3>
      <div className="activities-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon">
              {activity.icon}
            </div>
            
            <div className="activity-info">
              <div className="activity-header">
                <span className="activity-type">{activity.type}</span>
                <span className="activity-code">{activity.documentCode}</span>
              </div>
              <div className="activity-details">
                <p className="document-name">{activity.documentName}</p>
                <p className="partner-info">
                  {activity.partnerName} • {activity.date}
                </p>
              </div>
            </div>

            <div className="activity-amount">
              <span className="amount-value">
                {activity.amount.toLocaleString('vi-VN')} ₫
              </span>
            </div>

            <div className="activity-status">
              <span 
                className="status-badge"
                style={{ backgroundColor: `${getStatusColor(activity.status)}20`, color: getStatusColor(activity.status) }}
              >
                {activity.statusLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="view-all-btn">Xem tất cả hoạt động</button>
    </div>
  );
};
