import React, { useState } from 'react';
import {
  Search,
  Download,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Filter,
  ChevronDown
} from 'lucide-react';
import './ContractList.css';

type Page = 'dashboard' | 'contracts' | 'contracts-create'

interface ContractListProps {
  onNavigate?: (page: Page) => void;
}

interface Contract {
  id: string;
  code: string;
  partnerName: string;
  value: number;
  startDate: string;
  endDate: string;
  status: 'pending-sign' | 'executing' | 'completed' | 'suspended' | 'terminated';
  statusLabel: string;
}

const contractData: Contract[] = [
  {
    id: '1',
    code: 'HD-2025-001',
    partnerName: 'Công ty Cổ phần ABC Việt Nam',
    value: 450000000,
    startDate: '01/01/2025',
    endDate: '31/12/2025',
    status: 'executing',
    statusLabel: 'Đang thực hiện'
  },
  {
    id: '2',
    code: 'HD-2025-002',
    partnerName: 'Tập đoàn XYZ International',
    value: 320000000,
    startDate: '15/01/2025',
    endDate: '14/01/2026',
    status: 'pending-sign',
    statusLabel: 'Chờ ký'
  },
  {
    id: '3',
    code: 'HD-2024-098',
    partnerName: 'Công ty TNHH DEF Solutions',
    value: 280000000,
    startDate: '01/06/2024',
    endDate: '31/05/2025',
    status: 'executing',
    statusLabel: 'Đang thực hiện'
  },
  {
    id: '4',
    code: 'HD-2024-087',
    partnerName: 'Doanh nghiệp GHI Tech',
    value: 215000000,
    startDate: '10/03/2024',
    endDate: '09/03/2025',
    status: 'completed',
    statusLabel: 'Hoàn thành'
  },
  {
    id: '5',
    code: 'HD-2024-076',
    partnerName: 'Công ty JKL Resources',
    value: 180000000,
    startDate: '20/04/2024',
    endDate: '19/04/2025',
    status: 'executing',
    statusLabel: 'Đang thực hiện'
  },
  {
    id: '6',
    code: 'HD-2024-065',
    partnerName: 'Nhóm MNO Business',
    value: 125000000,
    startDate: '05/05/2024',
    endDate: '04/05/2025',
    status: 'suspended',
    statusLabel: 'Tạm dừng'
  },
  {
    id: '7',
    code: 'HD-2023-154',
    partnerName: 'Công ty PQR Services',
    value: 95000000,
    startDate: '10/01/2023',
    endDate: '09/12/2024',
    status: 'terminated',
    statusLabel: 'Chấm dứt'
  },
  {
    id: '8',
    code: 'HD-2025-003',
    partnerName: 'Doanh nghiệp STU Group',
    value: 350000000,
    startDate: '20/01/2025',
    endDate: '19/01/2026',
    status: 'pending-sign',
    statusLabel: 'Chờ ký'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending-sign':
      return '#faad14';
    case 'executing':
      return '#1890ff';
    case 'completed':
      return '#52c41a';
    case 'suspended':
      return '#ff7a45';
    case 'terminated':
      return '#ff4d4f';
    default:
      return '#666';
  }
};

export const ContractList: React.FC<ContractListProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [filteredData, setFilteredData] = useState(contractData);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchTerm, status);
  };

  const applyFilters = (search: string, status: string) => {
    let filtered = contractData;

    // Apply search
    if (search) {
      filtered = filtered.filter(
        contract =>
          contract.code.toLowerCase().includes(search.toLowerCase()) ||
          contract.partnerName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply status filter
    if (status !== 'all') {
      filtered = filtered.filter(contract => contract.status === status);
    }

    setFilteredData(filtered);
  };

  const handleExport = () => {
    // Excel export logic would go here
    alert('Xuất dữ liệu ra Excel...');
  };

  return (
    <div className="contract-list-page">
      <div className="contract-header">
        <div>
          <h1>Danh sách hợp đồng</h1>
          <p>Quản lý và theo dõi tất cả các hợp đồng của doanh nghiệp</p>
        </div>
      </div>

      <div className="contract-toolbar">
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
          <div className="filter-group">
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending-sign">Chờ ký</option>
              <option value="executing">Đang thực hiện</option>
              <option value="completed">Hoàn thành</option>
              <option value="suspended">Tạm dừng</option>
              <option value="terminated">Chấm dứt</option>
            </select>
          </div>

          <button className="filter-advanced-btn" title="Lọc nâng cao">
            <Filter size={18} />
            <span>Lọc nâng cao</span>
          </button>

          <button className="export-btn" onClick={handleExport} title="Xuất Excel">
            <Download size={18} />
            <span>Xuất Excel</span>
          </button>
        </div>

        <button 
          className="create-btn"
          onClick={() => onNavigate?.('contracts-create')}
        >
          <Plus size={20} />
          <span>Tạo hợp đồng mới</span>
        </button>
      </div>

      <div className="contract-table-wrapper">
        <table className="contract-table">
          <thead>
            <tr>
              <th className="col-code">Mã hợp đồng</th>
              <th className="col-partner">Tên đối tác</th>
              <th className="col-value">Giá trị</th>
              <th className="col-date">Ngày bắt đầu</th>
              <th className="col-date">Ngày kết thúc</th>
              <th className="col-status">Trạng thái</th>
              <th className="col-action">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((contract) => (
              <tr key={contract.id} className="contract-row">
                <td className="col-code">
                  <span className="contract-code">{contract.code}</span>
                </td>
                <td className="col-partner">
                  <span className="partner-name">{contract.partnerName}</span>
                </td>
                <td className="col-value">
                  <span className="contract-value">
                    {contract.value.toLocaleString('vi-VN')} ₫
                  </span>
                </td>
                <td className="col-date">
                  <span className="date-text">{contract.startDate}</span>
                </td>
                <td className="col-date">
                  <span className="date-text">{contract.endDate}</span>
                </td>
                <td className="col-status">
                  <span
                    className="status-badge"
                    style={{
                      backgroundColor: `${getStatusColor(contract.status)}20`,
                      color: getStatusColor(contract.status),
                      borderColor: getStatusColor(contract.status)
                    }}
                  >
                    {contract.statusLabel}
                  </span>
                </td>
                <td className="col-action">
                  <div className="action-buttons">
                    <button className="action-btn view-btn" title="Xem chi tiết">
                      <Eye size={18} />
                    </button>
                    <button className="action-btn edit-btn" title="Chỉnh sửa">
                      <Edit2 size={18} />
                    </button>
                    <button className="action-btn delete-btn" title="Xóa">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="empty-state">
            <p>Không tìm thấy hợp đồng phù hợp với tiêu chí tìm kiếm</p>
          </div>
        )}
      </div>

      <div className="pagination">
        <p className="result-count">
          Hiển thị {filteredData.length} / {contractData.length} hợp đồng
        </p>
        <div className="pagination-controls">
          <button className="pagination-btn" disabled>
            Trang trước
          </button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
};
