import React from "react";
import { Button, Form, Input } from "antd";

const MyForm: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  /** 清空密码 */
  const resetPass = () => {
    if (!form.isFieldTouched("password")) {
      form.setFieldsValue({ password: "" });
    }
  };

  /** 清空用户名 */
  const resetUser = () => {
    if (!form.isFieldTouched("username")) {
      form.setFieldsValue({ username: "" });
    }
  };

  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="IP"
        name="ip"
        rules={[{ required: true, message: "Please input your ip!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Port"
        name="port"
        rules={[{ required: true, message: "Please input your port!" }]}
      >
        <Input />
      </Form.Item>
      {/* 用于干扰浏览器记住密码 */}
      <Form.Item style={{ display: "none" }}>
        <Input onFocus={resetUser}/>
      </Form.Item>
      <Form.Item style={{ display: "none" }}>
        <Input.Password onFocus={resetPass}/>
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input onFocus={resetUser} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password onFocus={resetPass} autoComplete="off"/>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;
