import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import './Charts.css';

const lineChartData = [
  { month: 'Jan', contracts: 45, invoices: 52 },
  { month: 'Feb', contracts: 52, invoices: 61 },
  { month: 'Mar', contracts: 48, invoices: 55 },
  { month: 'Apr', contracts: 61, invoices: 45 },
  { month: 'May', contracts: 55, invoices: 68 },
  { month: 'Jun', contracts: 67, invoices: 72 },
  { month: 'Jul', contracts: 72, invoices: 65 },
  { month: 'Aug', contracts: 68, invoices: 78 },
  { month: 'Sep', contracts: 75, invoices: 82 },
  { month: 'Oct', contracts: 82, invoices: 88 },
  { month: 'Nov', contracts: 88, invoices: 92 },
  { month: 'Dec', contracts: 95, invoices: 98 }
];

const reconciliationData = [
  { name: 'Phải thu', value: 2400, fill: '#ff9c6e' },
  { name: 'Đã xử lý', value: 1800, fill: '#52c41a' },
  { name: 'Đang xử lý', value: 1200, fill: '#1890ff' },
  { name: 'Chênh lệch', value: 400, fill: '#ff4d4f' }
];

const total = reconciliationData.reduce((acc, curr) => acc + curr.value, 0);

export const TrendChart: React.FC = () => {
  return (
    <div className="chart-card trend-chart">
      <h3 className="chart-title">Xu hướng hợp đồng & hóa đơn theo tháng</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={lineChartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorContracts" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0066cc" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#0066cc" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorInvoices" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1890ff" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#1890ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)'
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="contracts"
            stroke="#0066cc"
            dot={{ fill: '#0066cc', r: 4 }}
            activeDot={{ r: 6 }}
            strokeWidth={3}
            name="Hợp đồng"
            fillOpacity={1}
            fill="url(#colorContracts)"
          />
          <Line
            type="monotone"
            dataKey="invoices"
            stroke="#1890ff"
            dot={{ fill: '#1890ff', r: 4 }}
            activeDot={{ r: 6 }}
            strokeWidth={3}
            name="Hóa đơn"
            fillOpacity={1}
            fill="url(#colorInvoices)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ReconciliationChart: React.FC = () => {
  return (
    <div className="chart-card reconciliation-chart">
      <h3 className="chart-title">Tình trạng công nợ</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart layout="vertical" data={reconciliationData} margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" stroke="#999" />
          <YAxis dataKey="name" type="category" stroke="#999" width={80} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)'
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Bar dataKey="value" name="Giá trị (triệu đồng)" radius={[0, 8, 8, 0]}>
            {reconciliationData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="reconciliation-metrics">
        <div className="metric">
          <span className="metric-label">Tỷ lệ đối soát</span>
          <span className="metric-value">
            {(((reconciliationData[1].value + reconciliationData[2].value) / total) * 100).toFixed(1)}%
          </span>
        </div>
        <div className="metric">
          <span className="metric-label">Tỷ lệ chênh lệch</span>
          <span className="metric-value">
            {((reconciliationData[3].value / total) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};
