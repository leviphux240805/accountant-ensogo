import React, { useState } from 'react';
import {
  ArrowLeft,
  Save,
  X
} from 'lucide-react';
import './ReceiptForm.css';

interface ReceiptFormData {
  receiptCode: string;
  issueDate: string;
  partner: string;
  relatedContract: string;
  amount: number | string;
  collectionMethod: string;
  reason: string;
  notes: string;
  bankAccount: string;
  referenceCode: string;
}

interface ReceiptFormProps {
  onNavigate?: (page: string) => void;
}

export const ReceiptForm: React.FC<ReceiptFormProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<ReceiptFormData>({
    receiptCode: '',
    issueDate: new Date().toISOString().split('T')[0],
    partner: '',
    relatedContract: '',
    amount: '',
    collectionMethod: 'bank-transfer',
    reason: 'payment',
    notes: '',
    bankAccount: '',
    referenceCode: ''
  });

  const partnerOptions = [
    'Công ty Cổ phần ABC Việt Nam',
    'Tập đoàn XYZ International',
    'Công ty TNHH DEF Solutions',
    'Doanh nghiệp GHI Tech',
    'Công ty CP JKL Group'
  ];

  const contractOptions = [
    'HD-2025-001',
    'HD-2025-002',
    'HD-2024-098',
    'HD-2024-087',
    'HD-2024-056'
  ];

  const bankAccountOptions = [
    'Vietcombank - 1234567890',
    'Techcombank - 0987654321',
    'BIDV - 1111222233',
    'Agribank - 4444555566',
    'MB Bank - 7777888899'
  ];

  const collectionMethods = [
    { value: 'bank-transfer', label: 'Chuyển khoản ngân hàng' },
    { value: 'cash', label: 'Tiền mặt' },
    { value: 'check', label: 'Séc' },
    { value: 'other', label: 'Khác' }
  ];

  const reasons = [
    { value: 'payment', label: 'Thanh toán hợp đồng' },
    { value: 'advance', label: 'Ứng trước' },
    { value: 'refund', label: 'Hoàn lại' },
    { value: 'deposit', label: 'Đặt cọc' },
    { value: 'other', label: 'Khác' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBack = () => {
    onNavigate?.('receipts');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Phiếu thu được lưu thành công!\nMã phiếu: ${formData.receiptCode}\nSố tiền: ${Number(formData.amount).toLocaleString('vi-VN')} ₫`);
    // Reset form
    setFormData({
      receiptCode: '',
      issueDate: new Date().toISOString().split('T')[0],
      partner: '',
      relatedContract: '',
      amount: '',
      collectionMethod: 'bank-transfer',
      reason: 'payment',
      notes: '',
      bankAccount: '',
      referenceCode: ''
    });
  };

  const handleCancel = () => {
    handleBack();
  };

  return (
    <div className="receipt-form-page">
      <div className="receipt-header">
        <div className="receipt-title-section">
          <button className="back-button" onClick={handleBack} title="Quay lại">
            <ArrowLeft size={20} />
          </button>
          <div className="title-content">
            <h1>Tạo phiếu thu</h1>
            <p>Lập phiếu thu tiền từ đối tác</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="receipt-form-container">
        <div className="form-layout">
          {/* Left Column - Main Receipt Information */}
          <div className="form-main">
            <div className="form-section">
              <h2 className="section-title">Thông tin phiếu thu</h2>
              
              <div className="form-grid">
                {/* Row 1 */}
                <div className="form-group">
                  <label htmlFor="receiptCode">Mã phiếu thu</label>
                  <input
                    type="text"
                    id="receiptCode"
                    name="receiptCode"
                    placeholder="Nhập mã phiếu thu"
                    value={formData.receiptCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="issueDate">Ngày lập phiếu</label>
                  <input
                    type="date"
                    id="issueDate"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Row 2 */}
                <div className="form-group">
                  <label htmlFor="partner">Đối tác</label>
                  <select
                    id="partner"
                    name="partner"
                    value={formData.partner}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Chọn đối tác</option>
                    {partnerOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="relatedContract">Hợp đồng liên quan</label>
                  <select
                    id="relatedContract"
                    name="relatedContract"
                    value={formData.relatedContract}
                    onChange={handleInputChange}
                  >
                    <option value="">Chọn hợp đồng (tùy chọn)</option>
                    {contractOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 3 */}
                <div className="form-group">
                  <label htmlFor="amount">Số tiền</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    placeholder="Nhập số tiền"
                    value={formData.amount}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="collectionMethod">Phương thức thu</label>
                  <select
                    id="collectionMethod"
                    name="collectionMethod"
                    value={formData.collectionMethod}
                    onChange={handleInputChange}
                    required
                  >
                    {collectionMethods.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 4 */}
                <div className="form-group">
                  <label htmlFor="reason">Lý do thu tiền</label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                  >
                    {reasons.map((reason) => (
                      <option key={reason.value} value={reason.value}>
                        {reason.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Ghi chú</label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Nhập ghi chú bổ sung"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Bank Information & Actions */}
          <div className="form-sidebar">
            <div className="form-section">
              <h2 className="section-title">Thông tin ngân hàng</h2>

              <div className="form-group">
                <label htmlFor="bankAccount">Tài khoản nhận tiền</label>
                <select
                  id="bankAccount"
                  name="bankAccount"
                  value={formData.bankAccount}
                  onChange={handleInputChange}
                >
                  <option value="">Chọn tài khoản (tùy chọn)</option>
                  {bankAccountOptions.map((account) => (
                    <option key={account} value={account}>
                      {account}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="referenceCode">Số tham chiếu giao dịch</label>
                <input
                  type="text"
                  id="referenceCode"
                  name="referenceCode"
                  placeholder="Mã tham chiếu của ngân hàng"
                  value={formData.referenceCode}
                  onChange={handleInputChange}
                />
              </div>

              <div className="bank-info-helper">
                <p>Nhập thông tin tài khoản ngân hàng nếu khoản thu được thực hiện qua chuyển khoản</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-section actions-section">
              <h2 className="section-title">Thao tác</h2>

              <button type="submit" className="btn btn-save">
                <Save size={18} />
                <span>Lưu phiếu thu</span>
              </button>

              <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                <X size={18} />
                <span>Hủy bỏ</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
