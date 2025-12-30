import React from "react";
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
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import "./CreateReceiptVoucher.css"; // dùng chung style

const { Title, Text } = Typography;
const { Option } = Select;

interface CreatePaymentProps {
  onBack?: () => void;
}

interface PaymentVoucherFormValues {
  voucherCode: string;
  voucherDate: Dayjs;
  partner: string;
  contract?: string;
  amount: number;
  paymentMethod: "cash" | "transfer";
  reason: string;
  notes?: string;
  bankAccount?: string;
  bankReference?: string;
}

const CreatePaymentVoucher: React.FC<CreatePaymentProps> = ({ onBack }) => {
  const [form] = Form.useForm<PaymentVoucherFormValues>();

  const onFinish = (values: PaymentVoucherFormValues) => {
    const data = {
      ...values,
      voucherDate: values.voucherDate.format("YYYY-MM-DD"),
    };

    console.log("PAYMENT VOUCHER:", data);
    alert("Lưu phiếu chi thành công!");
  };

  const onCancel = () => {
    form.resetFields();
  };

  return (
    <div className="receipt-container">
      <div className="receipt-header">
        <Space align="center">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => onBack?.()}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Title level={3} style={{ margin: 0 }}>
              Tạo phiếu chi
            </Title>
            <Text type="secondary">Lập phiếu chi cho đối tác</Text>
          </div>
        </Space>
   
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={24}>
          <Col xs={24} lg={16}>
            <Card title="Thông tin phiếu chi" className="receipt-card">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Mã phiếu chi"
                    name="voucherCode"
                    rules={[{ required: true, message: "Nhập mã phiếu chi" }]}
                  >
                    <Input placeholder="VD: PC-2024-001" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Ngày lập phiếu"
                    name="voucherDate"
                    rules={[{ required: true, message: "Chọn ngày lập phiếu" }]}
                  >
                    <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Đối tác / Nhà cung cấp"
                    name="partner"
                    rules={[{ required: true, message: "Chọn đối tác" }]}
                  >
                    <Select placeholder="Chọn đối tác">
                      <Option value="partner1">Công ty TNHH ABC</Option>
                      <Option value="partner2">Công ty XYZ</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Liên kết hợp đồng" name="contract">
                    <Input placeholder="Nhập số hợp đồng (nếu có)" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Số tiền chi (VND)"
                    name="amount"
                    rules={[{ required: true, message: "Nhập số tiền chi" }]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      min={0}
                      placeholder="0"
                      formatter={(v) =>
                        v ? `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
                      }
                      parser={(v) => (v ? v.replace(/[^\d]/g, "") : "")}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Phương thức chi"
                    name="paymentMethod"
                    rules={[{ required: true, message: "Chọn phương thức chi" }]}
                  >
                    <Select placeholder="Chọn phương thức">
                      <Option value="cash">Tiền mặt</Option>
                      <Option value="transfer">Chuyển khoản</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Lý do chi"
                    name="reason"
                    rules={[{ required: true, message: "Nhập lý do chi" }]}
                  >
                    <Input.TextArea
                      rows={3}
                      placeholder="VD: Thanh toán công nợ kỳ 1..."
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label="Ghi chú" name="notes">
                    <Input.TextArea rows={3} placeholder="Ghi chú nếu có..." />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Thông tin ngân hàng" className="receipt-card">
              <Form.Item label="Tài khoản chi" name="bankAccount">
                <Select placeholder="Chọn tài khoản ngân hàng">
                  <Option value="vcb">Vietcombank</Option>
                  <Option value="tcb">Techcombank</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Mã giao dịch" name="bankReference">
                <Input placeholder="Nhập mã giao dịch ngân hàng" />
              </Form.Item>

              <Space direction="vertical" style={{ width: "100%" }}>
                <Button type="primary" htmlType="submit" block>
                  💸 Lưu phiếu chi
                </Button>

                <Button onClick={onCancel} block>
                  Hủy bỏ
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreatePaymentVoucher;
