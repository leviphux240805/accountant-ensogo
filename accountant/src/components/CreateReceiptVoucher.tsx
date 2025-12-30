import React from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  InputNumber,
  Row,
  Col,
  Card,
  Typography,
  Space,
  message,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import './CreateReceiptVoucher.css';

const { Title, Text } = Typography;
const { Option } = Select;

interface ReceiptVoucherFormValues {
  voucherCode: string;
  voucherDate: Dayjs;
  partner: string;
  contract?: string;
  amount: string;
  paymentMethod: 'cash' | 'transfer';
  reason: string;
  notes?: string;
  bankAccount?: string;
  bankReference?: string;
}

interface Props {
  onNavigate: (page: string) => void;
}

const CreateReceiptVoucher: React.FC<Props> = ({ onNavigate }) => {
  const [form] = Form.useForm<ReceiptVoucherFormValues>();

  const onFinish = (values: ReceiptVoucherFormValues) => {
    const submit = {
      ...values,
      amount: Number(values.amount),
      voucherDate: values.voucherDate.format('YYYY-MM-DD'),
    };

    console.log('Phiếu thu:', submit);
    message.success('Lưu phiếu thu thành công!');
  };

  return (
    <div className="receipt-container">
      <div className="receipt-header">
        <Space align="center">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            className="receipt-back-btn"
            onClick={() => onNavigate('payment-schedule')}
          />
          <Title level={3} className="receipt-title">
            Tạo phiếu thu
          </Title>
        </Space>

        <Text type="secondary">
          Lập phiếu thu tiền từ đối tác
        </Text>
      </div>

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={24}>
          {/* ===== LEFT ===== */}
          <Col xs={24} lg={16}>
            <Card title="Thông tin phiếu thu" className="receipt-card">
              <Row gutter={16}>

                <Col span={12}>
                  <Form.Item
                    name="voucherCode"
                    label="Mã phiếu thu"
                    rules={[{ required: true, message: 'Vui lòng nhập mã phiếu thu!' }]}
                  >
                    <Input placeholder="VD: PT-2025-001" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="voucherDate"
                    label="Ngày lập phiếu"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
                  >
                    <DatePicker
                      style={{ width: '100%' }}
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="partner"
                    label="Đối tác"
                    rules={[{ required: true, message: 'Vui lòng chọn đối tác!' }]}
                  >
                    <Select placeholder="Chọn đối tác">
                      <Option value="abc">Công ty TNHH ABC</Option>
                      <Option value="xyz">Tập đoàn XYZ</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="contract"
                    label="Hợp đồng liên quan (nếu có)"
                  >
                    <Input placeholder="VD: HD-2025-001" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="amount"
                    label="Số tiền thu (VND)"
                    rules={[
                      { required: true, message: 'Vui lòng nhập số tiền!' },
                      {
                        validator(_, value) {
                          const n = Number(value);
                          if (!n || n <= 0)
                            return Promise.reject('Số tiền phải lớn hơn 0!');
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <InputNumber
                      stringMode
                      className="receipt-number"
                      min={0}
                      placeholder="0"
                                            formatter={(value) =>
 (value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0')
                      }
                      parser={(value) => value ? value.replace(/[^\d]/g, '') : ''
}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="paymentMethod"
                    label="Phương thức thu"
                    rules={[{ required: true, message: 'Vui lòng chọn phương thức!' }]}
                  >
                    <Select placeholder="Chọn phương thức">
                      <Option value="cash">Tiền mặt</Option>
                      <Option value="transfer">Chuyển khoản</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="reason"
                    label="Lý do thu"
                    rules={[{ required: true, message: 'Vui lòng nhập lý do!' }]}
                  >
                    <Input.TextArea rows={3} placeholder="VD: Thu tiền đợt 1..." />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="notes"
                    label="Ghi chú"
                  >
                    <Input.TextArea rows={3} placeholder="Nhập ghi chú (nếu có)" />
                  </Form.Item>
                </Col>

              </Row>
            </Card>
          </Col>

          {/* ===== RIGHT ===== */}
          <Col xs={24} lg={8}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">

              <Card title="Thông tin ngân hàng" className="receipt-card">
                <Form.Item
                  name="bankAccount"
                  label="Tài khoản nhận"
                >
                  <Select placeholder="Chọn tài khoản ngân hàng">
                    <Option value="vcb">VCB - 123456789</Option>
                    <Option value="tcb">TCB - 888888888</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="bankReference"
                  label="Mã tham chiếu giao dịch"
                >
                  <Input placeholder="Nhập mã giao dịch ngân hàng" />
                </Form.Item>
              </Card>

              <Card title="Thao tác" className="receipt-card">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="receipt-save-btn"
                    block
                  >
                    Lưu phiếu thu
                  </Button>

                  <Button
                    className="receipt-cancel-btn"
                    block
                    onClick={() => form.resetFields()}
                  >
                    Hủy bỏ
                  </Button>
                </Space>
              </Card>

            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateReceiptVoucher;
