import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { KPICards } from './KPICards';
import { QuickActions } from './QuickActions';
import { TrendChart, ReconciliationChart } from './Charts';
import { RecentActivities } from './RecentActivities';
import { PartnerDebts } from './PartnerDebts';
import './Dashboard.css';

type Page = 'dashboard' | 'contracts' | 'contracts-create' | 'payment-schedule'

interface DashboardProps {
  onNavigate?: (page: Page) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-container">
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={setIsSidebarCollapsed}
          onNavigate={onNavigate}
        />
        <main className="dashboard-content">
          <div className="content-header">
            <h1>Tổng quan</h1>
            <p>Xem nhanh bức tranh chung về công nợ đối tác của bạn</p>
          </div>

          <section className="dashboard-section">
            <KPICards />
          </section>

          <section className="dashboard-section">
            <QuickActions />
          </section>

          <section className="dashboard-section">
            <div className="charts-grid">
              <TrendChart />
              <ReconciliationChart />
            </div>
          </section>

          <section className="dashboard-section">
            <div className="bottom-grid">
              <RecentActivities />
              <PartnerDebts />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
