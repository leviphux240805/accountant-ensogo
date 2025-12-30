import React, { useState } from 'react';
import {
  Calendar,
  Upload,
  X,
  Save,
  AlertCircle
} from 'lucide-react';
import './ContractForm.css';

interface ContractFormData {
  contractCode: string;
  contractType: string;
  partner: string;
  startDate: string;
  endDate: string;
  value: string;
  description: string;
  paymentMethod: string;
  paymentTerms: string;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export const ContractForm: React.FC = () => {
  const [formData, setFormData] = useState<ContractFormData>({
    contractCode: '',
    contractType: 'standard',
    partner: '',
    startDate: '',
    endDate: '',
    value: '',
    description: '',
    paymentMethod: 'bank-transfer',
    paymentTerms: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles: UploadedFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      
      if (validTypes.includes(file.type)) {
        newFiles.push({
          name: file.name,
          size: file.size,
          type: file.type
        });
      }
    }
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    console.log('Uploaded files:', uploadedFiles);
    alert('Lưu hợp đồng thành công!');
  };

  const handleCancel = () => {
    setFormData({
      contractCode: '',
      contractType: 'standard',
      partner: '',
      startDate: '',
      endDate: '',
      value: '',
      description: '',
      paymentMethod: 'bank-transfer',
      paymentTerms: ''
    });
    setUploadedFiles([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="contract-form-page">
      <div className="form-header">
        <h1>Tạo hợp đồng mới</h1>
        <p>Nhập thông tin hợp đồng với đối tác</p>
      </div>

      <form onSubmit={handleSubmit} className="contract-form-wrapper">
        <div className="form-main-content">
          {/* Basic Information Section */}
          <div className="form-section">
            <h2 className="section-title">Thông tin cơ bản</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="contractCode">Mã hợp đồng</label>
                <input
                  type="text"
                  id="contractCode"
                  name="contractCode"
                  value={formData.contractCode}
                  onChange={handleInputChange}
                  placeholder="VD: HD-2025-001"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contractType">Loại hợp đồng</label>
                <select
                  id="contractType"
                  name="contractType"
                  value={formData.contractType}
                  onChange={handleInputChange}
                >
                  <option value="standard">Hợp đồng tiêu chuẩn</option>
                  <option value="service">Hợp đồng dịch vụ</option>
                  <option value="supply">Hợp đồng cung cấp</option>
                  <option value="maintenance">Hợp đồng bảo trì</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="partner">Đối tác</label>
                <select
                  id="partner"
                  name="partner"
                  value={formData.partner}
                  onChange={handleInputChange}
                >
                  <option value="">-- Chọn đối tác --</option>
                  <option value="abc-corp">Công ty Cổ phần ABC Việt Nam</option>
                  <option value="xyz-group">Tập đoàn XYZ International</option>
                  <option value="def-solutions">Công ty TNHH DEF Solutions</option>
                  <option value="ghi-tech">Doanh nghiệp GHI Tech</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="startDate">Ngày bắt đầu</label>
                <div className="date-input-wrapper">
                  <Calendar size={18} className="date-icon" />
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="endDate">Ngày kết thúc</label>
                <div className="date-input-wrapper">
                  <Calendar size={18} className="date-icon" />
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="value">Giá trị hợp đồng (₫)</label>
                <input
                  type="number"
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Mô tả / Ghi chú</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Nhập ghi chú hoặc mô tả về hợp đồng..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Payment Terms Section */}
          <div className="form-section">
            <h2 className="section-title">Điều khoản thanh toán</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="paymentMethod">Phương thức thanh toán</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <option value="bank-transfer">Chuyển khoản ngân hàng</option>
                  <option value="cash">Thanh toán bằng tiền mặt</option>
                  <option value="check">Séc</option>
                  <option value="credit">Tín dụng</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="paymentTerms">Số kỳ thanh toán</label>
                <select
                  id="paymentTerms"
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleInputChange}
                >
                  <option value="">-- Chọn số kỳ --</option>
                  <option value="1">1 kỳ (Thanh toán một lần)</option>
                  <option value="2">2 kỳ</option>
                  <option value="3">3 kỳ</option>
                  <option value="4">4 kỳ (Hàng quý)</option>
                  <option value="12">12 kỳ (Hàng tháng)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="form-sidebar">
          <div className="upload-section">
            <h3 className="upload-title">Tài liệu hợp đồng</h3>
            
            <div
              className={`upload-area ${dragActive ? 'active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload size={32} className="upload-icon" />
              <p className="upload-text">Kéo thả file tại đây</p>
              <p className="upload-divider">hoặc</p>
              <label htmlFor="fileInput" className="upload-button">
                Chọn file từ máy tính
              </label>
              <input
                type="file"
                id="fileInput"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <p className="upload-info">
                Hỗ trợ: PDF, JPG, PNG (Tối đa 10MB)
              </p>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="file-list">
                <h4 className="file-list-title">Tệp đã tải lên ({uploadedFiles.length})</h4>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <div className="file-info">
                      <p className="file-name">{file.name}</p>
                      <p className="file-size">{formatFileSize(file.size)}</p>
                    </div>
                    <button
                      type="button"
                      className="file-remove-btn"
                      onClick={() => removeFile(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Action Buttons */}
      <div className="form-actions">
        <button
          type="submit"
          className="btn-submit"
          onClick={handleSubmit}
        >
          <Save size={18} />
          <span>Lưu hợp đồng</span>
        </button>
        <button
          type="button"
          className="btn-cancel"
          onClick={handleCancel}
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  );
};
