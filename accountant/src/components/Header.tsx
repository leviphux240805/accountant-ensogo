import React, { useState } from 'react';
import { Search, Bell, HelpCircle, X } from 'lucide-react';
import './Header.css';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
}

interface HeaderProps {
  userName?: string;
  userPosition?: string;
  userAvatar?: string;
  notifications?: Notification[];
}

const defaultNotifications: Notification[] = [];

export const Header: React.FC<HeaderProps> = ({
  userName = 'Nguyễn Văn A',
  userPosition = 'Quản lý công nợ',
  userAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
  notifications = defaultNotifications
}) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (notificationId: string) => {
    // This would be handled by parent component in real app
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">E</div>
          <div className="logo-text">
            <h1>ENSOGO</h1>
            <p>Quản lý công nợ chuyên nghiệp</p>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm hợp đồng, hóa đơn, đối tác..."
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        <button className="header-icon-btn" title="Trợ giúp">
          <HelpCircle size={20} />
        </button>

        <div className="notification-wrapper">
          <button 
            className="header-icon-btn notification-btn"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            title="Thông báo"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {isNotificationOpen && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Thông báo</h3>
                <button 
                  className="close-btn"
                  onClick={() => setIsNotificationOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="notification-list">
                {notifications.length === 0 ? (
                  <div className="empty-state">
                    <Bell size={32} />
                    <p>Không có thông báo mới</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <div className={`notification-indicator ${notification.type}`} />
                      <div className="notification-content">
                        <p className="notification-title">{notification.title}</p>
                        <p className="notification-message">{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <div className="notification-footer">
                  <button className="view-all-notifications">Xem tất cả thông báo</button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="user-info">
          <img src={userAvatar} alt={userName} className="user-avatar" />
          <div className="user-details">
            <p className="user-name">{userName}</p>
            <p className="user-position">{userPosition}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
