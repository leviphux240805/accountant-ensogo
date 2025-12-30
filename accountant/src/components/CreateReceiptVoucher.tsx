import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Card,
  Row,
  Col,
  message,
  Spin,
  Space,
  InputNumber,
} from 'antd';
import { ArrowLeftOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './CreateReceipt.css';

interface ReceiptFormData {
  receiptNumber: string;
  receiptDate: dayjs.Dayjs;
  vendorName: string;
  vendorEmail: string;
  contractNumber?:  string;
  amount: number;
  paymentMethod: string;
  reason: string;
  notes?:  string;
  bankAccount?: string;
  bankReference?: string;
}

interface Partner {
  id: string;
  name: string;
}

interface BankAccount {
  id: string;
  accountNumber: string;
  accountName: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const CreateReceipt: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [partnerLoading, setPartnerLoading] = useState(false);
  const [bankLoading, setBankLoading] = useState(false);

  // Fetch partners on component mount
  useEffect(() => {
    fetchPartners();
    fetchBankAccounts();
  }, []);

  const fetchPartners = async () => {
    setPartnerLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/partners`);
      if (!response.ok) throw new Error('Failed to fetch partners');
      const data = await response. json();
      setPartners(data);
    } catch (error) {
      console.error('Error fetching partners:', error);
      message.error('Không thể tải danh sách đối tác');
    } finally {
      setPartnerLoading(false);
    }
  };

  const fetchBankAccounts = async () => {
    setBankLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/bank-accounts`);
      if (!response.ok) throw new Error('Failed to fetch bank accounts');
      const data = await response. json();
      setBankAccounts(data);
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
      message.error('Không thể tải danh sách tài khoản ngân hàng');
    } finally {
      setBankLoading(false);
    }
  };

  const onFinish = async (values: ReceiptFormData) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        receiptDate: values.receiptDate.format('YYYY-MM-DD'),
      };

      const response = await fetch(`${API_BASE_URL}/receipts`, {
        method: 'POST',
        headers:  {
          'Content-Type':  'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to create receipt');

      const result = await response.json();
      message.success('Phiếu thu được tạo thành công!');
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      console.error('Error creating receipt:', error);
      message.error('Có lỗi xảy ra khi tạo phiếu thu.  Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="create-receipt-container">
      {/* Header */}
      <div className="create-receipt-header">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={handleCancel}
          className="back-button"
        >
          Quay lại
        </Button>
        <div className="header-content">
          <h1>Tạo phiếu thu</h1>
          <p>Lập chứng từ thu tiền từ đối tác</p>
        </div>
      </div>

      {/* Main Content */}
      <Row gutter={24} className="create-receipt-content">
        {/* Left Column - Receipt Information */}
        <Col xs={24} lg={16}>
          <Card title="Thông tin phiếu thu" className="receipt-info-card">
            <Spin spinning={loading}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Row gutter={16}>
                  {/* Receipt Number */}
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="receiptNumber"
                      label="Mã phiếu thu"
                      rules={[
                        {
                          required:  true,
                          message: 'Vui lòng nhập mã phiếu thu',
                        },
                      ]}
                    >
                      <Input placeholder="Nhập mã phiếu thu" />
                    </Form.Item>
                  </Col>

                  {/* Receipt Date */}
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="receiptDate"
                      label="Ngày lập phiếu"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn ngày lập phiếu',
                        },
                      ]}
                      initialValue={dayjs()}
                    >
                      <DatePicker
                        style={{ width: '100%' }}
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  {/* Partner */}
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="vendorName"
                      label="Đối tác"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn đối tác',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn đối tác"
                        loading={partnerLoading}
                        optionLabelProp="label"
                      >
                        {partners.map((partner) => (
                          <Select.Option key={partner. id} value={partner.name}>
                            {partner.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Contract Number */}
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="contractNumber"
                      label="Hợp đồng liên quan"
                    >
                      <Input placeholder="Nhập số hợp đồng (nếu có)" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  {/* Amount */}
                  <Col xs={24} sm={12}>
                    <Form. Item
                      name="amount"
                      label="Số tiền thu"
                      rules={[
                        {
                          required:  true,
                          message: 'Vui lòng nhập số tiền thu',
                        },
                        {
                          type: 'number',
                          min: 0,
                          message: 'Số tiền phải lớn hơn 0',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="Nhập số tiền"
                        formatter={(value) =>
                          `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }
                        parser={(value) =>
                          value?. replace(/₫\s? |(,*)/g, '') as unknown as number
                        }
                      />
                    </Form. Item>
                  </Col>

                  {/* Payment Method */}
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="paymentMethod"
                      label="Phương thức thu"
                      rules={[
                        {
                          required:  true,
                          message: 'Vui lòng chọn phương thức thu',
                        },
                      ]}
                    >
                      <Select placeholder="Chọn phương thức">
                        <Select.Option value="cash">Tiền mặt</Select.Option>
                        <Select.Option value="transfer">
                          Chuyển khoản
                        </Select.Option>
                        <Select.Option value="check">Séc</Select.Option>
                        <Select.Option value="other">Khác</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  {/* Reason */}
                  <Col xs={24}>
                    <Form.Item
                      name="reason"
                      label="Lý do thu tiền"
                      rules={[
                        {
                          required: true,
                          message:  'Vui lòng nhập lý do thu tiền',
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={3}
                        placeholder="Nhập lý do thu tiền"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  {/* Notes */}
                  <Col xs={24}>
                    <Form.Item name="notes" label="Ghi chú bổ sung">
                      <Input.TextArea
                        rows={2}
                        placeholder="Nhập ghi chú (nếu có)"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Hidden form items for bank info (will be submitted with form) */}
              </Form>
            </Spin>
          </Card>
        </Col>

        {/* Right Column - Bank Information */}
        <Col xs={24} lg={8}>
          <Card title="Thông tin ngân hàng" className="bank-info-card">
            <Spin spinning={bankLoading}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                {/* Bank Account */}
                <Form.Item
                  name="bankAccount"
                  label="Tài khoản nhận tiền"
                  rules={[
                    {
                      required: false,
                      message: 'Vui lòng chọn tài khoản',
                    },
                  ]}
                >
                  <Select placeholder="Chọn tài khoản" allowClear>
                    {bankAccounts.map((account) => (
                      <Select. Option key={account.id} value={account.id}>
                        {account.accountName} - {account.accountNumber}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Bank Reference */}
                <Form.Item
                  name="bankReference"
                  label="Mã tham chiếu giao dịch"
                >
                  <Input placeholder="Nhập mã tham chiếu (reference code)" />
                </Form.Item>

                {/* Action Buttons */}
                <Space style={{ width: '100%' }} direction="vertical">
                  <Form.Item shouldUpdate>
                    {() => (
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        icon={<SaveOutlined />}
                        block
                        loading={loading}
                      >
                        Lưu phiếu thu
                      </Button>
                    )}
                  </Form. Item>
                  <Button
                    size="large"
                    icon={<CloseOutlined />}
                    block
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Hủy bỏ
                  </Button>
                </Space>

                {/* Submit button */}
                <Form.Item style={{ display: 'none' }}>
                  <Button htmlType="submit" />
                </Form.Item>
              </Form>
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateReceipt;