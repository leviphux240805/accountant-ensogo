import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import './PageLayout.css';

type Page = 'dashboard' | 'contracts' | 'contracts-create' | 'payment-schedule' | 'receipts-create'

interface PageLayoutProps {
  children: React.ReactNode;
  onNavigate?: (page: Page) => void;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, onNavigate }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="page-layout">
      <Header />
      <div className="page-container">
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={setIsSidebarCollapsed}
          onNavigate={onNavigate}
        />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
};
