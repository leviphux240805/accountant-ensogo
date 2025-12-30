import React, { useState } from 'react';
import {
  BarChart3,
  FileText,
  Users,
  TrendingUp,
  Layers,
  CheckCircle,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './Sidebar.css';

interface MenuItem {
  id: string;
  icon?: React.ReactNode;
  label: string;
  submenu?: MenuItem[];
  active?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: 'overview',
    icon: <BarChart3 size={20} />,
    label: 'Tổng quan',
    active: true
  },
  {
    id: 'contracts',
    icon: <FileText size={20} />,
    label: 'Hợp đồng',
    submenu: [
      { id: 'contracts-list', icon: undefined, label: 'Danh sách hợp đồng' },
      { id: 'contracts-create', icon: undefined, label: 'Tạo hợp đồng mới' },
      { id: 'payment-schedule', icon: undefined, label: 'Lịch thanh toán' }
    ]
  },
  {
    id: 'receipts',
    icon: <CheckCircle size={20} />,
    label: 'Phiếu thu/chi',
    submenu: [
      { id: 'receipts-incoming', icon: undefined, label: 'Phiếu thu' },
      { id: 'receipts-outgoing', icon: undefined, label: 'Phiếu chi' }
    ]
  },
  {
    id: 'invoices',
    icon: <TrendingUp size={20} />,
    label: 'Hóa đơn',
    submenu: [
      { id: 'invoices-list', icon: undefined, label: 'Danh sách hóa đơn' },
      { id: 'invoices-sync', icon: undefined, label: 'Đồng bộ hóa đơn' }
    ]
  },
  {
    id: 'reconciliation',
    icon: <Layers size={20} />,
    label: 'Đối soát công nợ'
  },
  {
    id: 'thirdparty',
    icon: <Users size={20} />,
    label: 'Thu/Chi hộ'
  },
  {
    id: 'partners',
    icon: <Users size={20} />,
    label: 'Đối tác',
    submenu: [
      { id: 'partners-list', icon: undefined, label: 'Danh sách đối tác' },
      { id: 'partners-create', icon: undefined, label: 'Thêm đối tác mới' }
    ]
  },
  {
    id: 'reports',
    icon: <BarChart3 size={20} />,
    label: 'Báo cáo'
  },
  {
    id: 'audit',
    icon: <CheckCircle size={20} />,
    label: 'Audit log'
  },
  {
    id: 'settings',
    icon: <Settings size={20} />,
    label: 'Thiết lập'
  }
];

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
  onNavigate?: (page: 'dashboard' | 'contracts' | 'contracts-create' | 'payment-schedule' | 'receipts-create') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggleCollapse, onNavigate }) => {
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  const toggleSubmenu = (menuId: string) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(menuId)) {
      newExpanded.delete(menuId);
    } else {
      newExpanded.add(menuId);
    }
    setExpandedMenus(newExpanded);
  };

  const handleToggleCollapse = () => {
    onToggleCollapse?.(!isCollapsed);
  };

  const handleMenuClick = (menuId: string) => {
    if (menuId === 'overview') {
      onNavigate?.('dashboard');
    }
  };

  const handleSubmenuClick = (submenuId: string) => {
    if (submenuId === 'contracts-list') {
      onNavigate?.('contracts');
    } else if (submenuId === 'contracts-create') {
      onNavigate?.('contracts-create');
    } else if (submenuId === 'payment-schedule') {
      onNavigate?.('payment-schedule');
    } else if (submenuId === 'receipts-incoming') {
      onNavigate?.('receipts-create');
    }
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button 
        className="sidebar-toggle-btn"
        onClick={handleToggleCollapse}
        title={isCollapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              className={`menu-item ${item.active ? 'active' : ''}`}
              onClick={() => {
                handleMenuClick(item.id);
                item.submenu && toggleSubmenu(item.id);
              }}
              title={isCollapsed ? item.label : ''}
            >
              <span className="menu-icon">{item.icon}</span>
              {!isCollapsed && <span className="menu-label">{item.label}</span>}
              {!isCollapsed && item.submenu && (
                <span className="menu-chevron">
                  {expandedMenus.has(item.id) ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </span>
              )}
            </button>

            {!isCollapsed && item.submenu && expandedMenus.has(item.id) && (
              <div className="submenu">
                {item.submenu.map((subitem) => (
                  <button 
                    key={subitem.id} 
                    className="submenu-item"
                    onClick={() => handleSubmenuClick(subitem.id)}
                  >
                    {subitem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" title={isCollapsed ? 'Đăng xuất' : ''}>
          <LogOut size={18} />
          {!isCollapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
};
