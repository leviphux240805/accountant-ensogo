import React, { useState } from 'react';
import {
  Search,
  CheckCircle,
  AlertCircle,
  Clock,
  Filter,
  Check
} from 'lucide-react';
import './PaymentSchedule.css';

interface PaymentRecord {
  id: string;
  contractCode: string;
  partnerName: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue';
  statusLabel: string;
  paymentDate?: string;
  paymentNumber: number;
  totalPayments: number;
}

const paymentData: PaymentRecord[] = [
  {
    id: '1',
    contractCode: 'HD-2025-001',
    partnerName: 'Công ty Cổ phần ABC Việt Nam',
    dueDate: '31/01/2025',
    amount: 112500000,
    status: 'paid',
    statusLabel: 'Đã thanh toán',
    paymentDate: '30/01/2025',
    paymentNumber: 1,
    totalPayments: 4
  },
  {
    id: '2',
    contractCode: 'HD-2025-001',
    partnerName: 'Công ty Cổ phần ABC Việt Nam',
    dueDate: '28/02/2025',
    amount: 112500000,
    status: 'unpaid',
    statusLabel: 'Chưa thanh toán',
    paymentNumber: 2,
    totalPayments: 4
  },
  {
    id: '3',
    contractCode: 'HD-2025-001',
    partnerName: 'Công ty Cổ phần ABC Việt Nam',
    dueDate: '31/03/2025',
    amount: 112500000,
    status: 'unpaid',
    statusLabel: 'Chưa thanh toán',
    paymentNumber: 3,
    totalPayments: 4
  },
  {
    id: '4',
    contractCode: 'HD-2025-001',
    partnerName: 'Công ty Cổ phần ABC Việt Nam',
    dueDate: '30/04/2025',
    amount: 112500000,
    status: 'unpaid',
    statusLabel: 'Chưa thanh toán',
    paymentNumber: 4,
    totalPayments: 4
  },
  {
    id: '5',
    contractCode: 'HD-2025-002',
    partnerName: 'Tập đoàn XYZ International',
    dueDate: '15/01/2025',
    amount: 80000000,
    status: 'overdue',
    statusLabel: 'Quá hạn',
    paymentNumber: 1,
    totalPayments: 4
  },
  {
    id: '6',
    contractCode: 'HD-2025-002',
    partnerName: 'Tập đoàn XYZ International',
    dueDate: '15/02/2025',
    amount: 80000000,
    status: 'overdue',
    statusLabel: 'Quá hạn',
    paymentNumber: 2,
    totalPayments: 4
  },
  {
    id: '7',
    contractCode: 'HD-2025-002',
    partnerName: 'Tập đoàn XYZ International',
    dueDate: '15/03/2025',
    amount: 80000000,
    status: 'unpaid',
    statusLabel: 'Chưa thanh toán',
    paymentNumber: 3,
    totalPayments: 4
  },
  {
    id: '8',
    contractCode: 'HD-2024-098',
    partnerName: 'Công ty TNHH DEF Solutions',
    dueDate: '31/01/2025',
    amount: 70000000,
    status: 'paid',
    statusLabel: 'Đã thanh toán',
    paymentDate: '28/01/2025',
    paymentNumber: 1,
    totalPayments: 4
  },
  {
    id: '9',
    contractCode: 'HD-2024-098',
    partnerName: 'Công ty TNHH DEF Solutions',
    dueDate: '28/02/2025',
    amount: 70000000,
    status: 'unpaid',
    statusLabel: 'Chưa thanh toán',
    paymentNumber: 2,
    totalPayments: 4
  },
  {
    id: '10',
    contractCode: 'HD-2024-087',
    partnerName: 'Doanh nghiệp GHI Tech',
    dueDate: '31/12/2024',
    amount: 53750000,
    status: 'paid',
    statusLabel: 'Đã thanh toán',
    paymentDate: '20/12/2024',
    paymentNumber: 1,
    totalPayments: 4
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return '#52c41a';
    case 'unpaid':
      return '#faad14';
    case 'overdue':
      return '#ff4d4f';
    default:
      return '#666';
  }
};

export const PaymentSchedule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [filteredData, setFilteredData] = useState(paymentData);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchTerm, status);
  };

  const applyFilters = (search: string, status: string) => {
    let filtered = paymentData;

    // Apply search
    if (search) {
      filtered = filtered.filter(
        record =>
          record.contractCode.toLowerCase().includes(search.toLowerCase()) ||
          record.partnerName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply status filter
    if (status !== 'all') {
      filtered = filtered.filter(record => record.status === status);
    }

    setFilteredData(filtered);
  };

  // Calculate summary statistics
  const paidAmount = paymentData
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const unpaidAmount = paymentData
    .filter(p => p.status === 'unpaid' || p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0);

  const overdueAmount = paymentData
    .filter(p => p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0);

  const handleConfirmPayment = (id: string) => {
    alert(`Xác nhận thanh toán cho khoản: ${id}`);
  };

  return (
    <div className="payment-schedule-page">
      <div className="schedule-header">
        <h1>Lịch thanh toán</h1>
        <p>Theo dõi các khoản thanh toán liên quan đến hợp đồng</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon paid">
            <CheckCircle size={24} />
          </div>
          <div className="card-content">
            <p className="card-label">Đã thanh toán</p>
            <p className="card-value">{paidAmount.toLocaleString('vi-VN')} ₫</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon unpaid">
            <Clock size={24} />
          </div>
          <div className="card-content">
            <p className="card-label">Chờ thanh toán</p>
            <p className="card-value">{unpaidAmount.toLocaleString('vi-VN')} ₫</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon overdue">
            <AlertCircle size={24} />
          </div>
          <div className="card-content">
            <p className="card-label">Quá hạn</p>
            <p className="card-value">{overdueAmount.toLocaleString('vi-VN')} ₫</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="schedule-toolbar">
        <div className="search-section">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm mã hợp đồng, tên đối tác..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-section">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="paid">Đã thanh toán</option>
            <option value="unpaid">Chưa thanh toán</option>
            <option value="overdue">Quá hạn</option>
          </select>
        </div>
      </div>

      {/* Payment Table */}
      <div className="schedule-table-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              <th className="col-contract">Mã hợp đồng</th>
              <th className="col-partner">Tên đối tác</th>
              <th className="col-due-date">Ngày đến hạn</th>
              <th className="col-amount">Số tiền</th>
              <th className="col-status">Trạng thái</th>
              <th className="col-payment-date">Ngày thanh toán</th>
              <th className="col-action">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((record) => (
              <tr key={record.id} className={`payment-row ${record.status}`}>
                <td className="col-contract">
                  <span className="contract-code-link">{record.contractCode}</span>
                  <span className="payment-number">
                    Kỳ {record.paymentNumber}/{record.totalPayments}
                  </span>
                </td>
                <td className="col-partner">
                  <span className="partner-name">{record.partnerName}</span>
                </td>
                <td className="col-due-date">
                  <span className="due-date">{record.dueDate}</span>
                </td>
                <td className="col-amount">
                  <span className="amount-value">
                    {record.amount.toLocaleString('vi-VN')} ₫
                  </span>
                </td>
                <td className="col-status">
                  <span
                    className="status-badge"
                    style={{
                      backgroundColor: `${getStatusColor(record.status)}20`,
                      color: getStatusColor(record.status),
                      borderColor: getStatusColor(record.status)
                    }}
                  >
                    {record.statusLabel}
                  </span>
                </td>
                <td className="col-payment-date">
                  <span className="payment-date">
                    {record.paymentDate || '-'}
                  </span>
                </td>
                <td className="col-action">
                  {record.status !== 'paid' && (
                    <button
                      className="confirm-payment-btn"
                      onClick={() => handleConfirmPayment(record.id)}
                      title="Xác nhận thanh toán"
                    >
                      <Check size={16} />
                      <span>Xác nhận</span>
                    </button>
                  )}
                  {record.status === 'paid' && (
                    <span className="status-text">Hoàn tất</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="empty-state">
            <p>Không tìm thấy khoản thanh toán phù hợp</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <p className="result-count">
          Hiển thị {filteredData.length} / {paymentData.length} khoản thanh toán
        </p>
      </div>
    </div>
  );
};
