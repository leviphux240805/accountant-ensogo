import React, { useState } from "react";
import "./ReceiptVoucherList.css";

type VoucherType = "all" | "income" | "expense";

interface Voucher {
  code: string;
  type: "phiếu thu" | "phiếu chi";
  partner: string;
  amount: number;
  date: string;
  reason: string;
  status: "Đã duyệt" | "Chờ duyệt" | "Từ chối";
}

const sampleData: Voucher[] = [
  {
    code: "PT-2024-001",
    type: "phiếu thu",
    partner: "Công ty TNHH ABC",
    amount: 50000000,
    date: "14/03/2024",
    reason: "Thanh toán hợp đồng HD-2024-001",
    status: "Đã duyệt",
  },
  {
    code: "PC-2024-001",
    type: "phiếu chi",
    partner: "Công ty CP XYZ",
    amount: -35000000,
    date: "15/03/2024",
    reason: "Thanh toán công nợ",
    status: "Chờ duyệt",
  },
  {
    code: "PT-2024-002",
    type: "phiếu thu",
    partner: "DNTN Hoàng Long",
    amount: 25000000,
    date: "16/03/2024",
    reason: "Tạm ứng hợp đồng",
    status: "Đã duyệt",
  },
  {
    code: "PC-2024-002",
    type: "phiếu chi",
    partner: "Công ty TNHH DEF",
    amount: -80000000,
    date: "17/03/2024",
    reason: "Thanh toán hóa đơn",
    status: "Từ chối",
  },
];

export default function ReceiptVoucherList() {
  const [tab, setTab] = useState<VoucherType>("all");

  const filtered =
    tab === "all"
      ? sampleData
      : sampleData.filter((v) =>
          tab === "income" ? v.type === "phiếu thu" : v.type === "phiếu chi"
        );

  return (
    <div className="page-container">

      {/* ===== PAGE HEADER ===== */}
      <div className="page-header">
        <div>
          <h2>Danh sách phiếu thu/chi</h2>
          <p>Quản lý các phiếu thu và phiếu chi</p>
        </div>

        <div className="header-actions">
          <button className="btn-outline">Tạo phiếu thu</button>
          <button className="btn-primary">Tạo phiếu chi</button>
        </div>
      </div>

      {/* ===== SUMMARY BOX ===== */}
      <div className="summary-grid">
        <div className="summary-card green">
          <p>Tổng thu tháng này</p>
          <h3>195,000,000 ₫</h3>
        </div>

        <div className="summary-card red">
          <p>Tổng chi tháng này</p>
          <h3>115,000,000 ₫</h3>
        </div>

        <div className="summary-card orange">
          <p>Chờ duyệt</p>
          <h3>2 phiếu</h3>
        </div>
      </div>

      {/* ===== MAIN CARD PANEL ===== */}
      <div className="card-panel">

        {/* Tabs */}
        <div className="tabs">
          <button
            className={tab === "all" ? "active" : ""}
            onClick={() => setTab("all")}
          >
            Tất cả
          </button>

          <button
            className={tab === "income" ? "active" : ""}
            onClick={() => setTab("income")}
          >
            Phiếu thu
          </button>

          <button
            className={tab === "expense" ? "active" : ""}
            onClick={() => setTab("expense")}
          >
            Phiếu chi
          </button>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Mã phiếu</th>
                <th>Loại</th>
                <th>Đối tác</th>
                <th>Số tiền</th>
                <th>Ngày tạo</th>
                <th>Lý do</th>
                <th>Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((v, i) => (
                <tr key={i}>
                  <td className="link-text">{v.code}</td>

                  <td>
                    <span
                      className={
                        v.type === "phiếu thu" ? "badge green" : "badge red"
                      }
                    >
                      {v.type}
                    </span>
                  </td>

                  <td>{v.partner}</td>

                  <td className={v.amount > 0 ? "green-text" : "red-text"}>
                    {v.amount.toLocaleString("vi-VN")} ₫
                  </td>

                  <td>{v.date}</td>

                  <td>{v.reason}</td>

                  <td>
                    <span className={`status ${v.status}`}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
