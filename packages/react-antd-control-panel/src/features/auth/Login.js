import React, { useState } from "react";
import { Card, Row, Col, Form, Input, Button, Select } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Option } = Select;

const NormalLoginForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入账号!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="账号"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

const TwoFactorAuthLogin = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入账号!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="账号"
        />
      </Form.Item>
      <Form.Item
        name="code"
        rules={[{ required: true, message: "请输入2FA Code!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="string"
          placeholder="2FA Code"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default function LoginPage(props) {
  const [formType, setFormType] = useState("password");
  return (
    <Row type="flex" justify="center" style={{ paddingTop: "200px" }}>
      <Col>
        <Card
          title="登录"
          extra={
            <Select
              placeholder="切换登录方式"
              onChange={(value) => setFormType(value)}
            >
              <Option value="password">账号密码</Option>
              <Option value="2fa">2FA</Option>
            </Select>
          }
          style={{ width: 300 }}
        >
          {formType == "password" && (
            <NormalLoginForm {...props}></NormalLoginForm>
          )}
          {formType == "2fa" && <TwoFactorAuthLogin />}
        </Card>
      </Col>
    </Row>
  );
}
