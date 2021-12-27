import React from "react";
import { Card, Row, Col, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

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

class LoginPage extends React.Component {
  render() {
    return (
      <Row type="flex" justify="center" style={{ paddingTop: "200px" }}>
        <Col>
          <Card>
            <NormalLoginForm {...this.props}></NormalLoginForm>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default LoginPage;
