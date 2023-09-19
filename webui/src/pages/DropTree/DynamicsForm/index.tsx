import React, { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import _ from "lodash";

const DynamicsForm = (props: any) => {
  const { visible } = props;
  const [form] = Form.useForm();
  const [len, setLen] = useState<number>(0);

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  /** 先校验之前的是否输入 */
  const onAdd = (callback: any) => {
    console.log("长度", len);

    if (len === 0) {
      setLen((pre) => pre + 1);
      return callback();
    }

    const names = _.times(len + 1, (index) => ["users", index, "first"]);
    console.log("names", names);

    form
      .validateFields(names)
      .then((values) => {
        // 校验通过，可以处理校验后的数据
        console.log("校验通过啦", values);
        setLen((pre) => pre + 1);
        callback();
      })
      .catch((errorInfo) => {
        // 校验失败，可以在这里处理错误信息
        console.log("校验失败", errorInfo);
      });
  };

  const onOk = () => {
    form.validateFields().then(async (values) => {
      console.log("校验通过啦", values);
    });
  };
  return (
    <Modal
      open={visible}
      width={540}
      title="编辑翻译"
      onOk={() => onOk()}
      onCancel={() => {}}
    >
      <div style={{ maxHeight: 500, overflow: "auto" }}>
        <Form
          form={form}
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="语言"
            name="language"
            rules={[{ required: true, message: "请选择语言" }]}
          >
            <Select value="1">
              <Select.Option key="1">简体汉语</Select.Option>
              <Select.Option key="2">繁体汉语</Select.Option>
              <Select.Option key="3">英语</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="翻译"
            name="value"
            rules={[{ required: true, message: "请输入值" }]}
          >
            <Input placeholder="请输入" autoComplete="off"></Input>
          </Form.Item>
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                <Button onClick={() => onAdd(add)} style={{ marginBottom: 16 }}>
                  <PlusOutlined /> add
                </Button>

                {fields.map(({ key, name, ...restField }) => {
                  return (
                    <div key={key} style={{ display: "flex" }}>
                      <MinusCircleOutlined
                        style={{
                          display: "inline-block",
                          transform: "translateY(10px)",
                          marginRight: 12,
                        }}
                        onClick={() => {
                          if (len === 0) return;
                          setLen((pre) => pre - 1);
                          remove(name);
                        }}
                      />
                      <Form.Item
                        {...restField}
                        name={[name, "first"]}
                        rules={[
                          { required: true, message: "Missing first name" },
                          {
                            pattern: /^[0-9]+$/,
                            message: "仅支持输入数字",
                          },
                        ]}
                      >
                        <Input
                          placeholder="First Name"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </div>
                  );
                })}
              </>
            )}
          </Form.List>
          <Form.Item label="描述">
            <Input.TextArea></Input.TextArea>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
export default DynamicsForm;
