import React from "react";
import { Form, Input, Select, Button } from "antd";
import { validateGroupName } from "./utils";

const { Option } = Select;

const EditGroupForm = ({ form, onFinish, categories, initialValues }) => (
  <Form
    form={form}
    layout="vertical"
    onFinish={onFinish}
    initialValues={initialValues}
  >
    <Form.Item
      name="name"
      label={<span style={{ color: "#075E54" }}>Group Name</span>}
      rules={[
        { required: true, message: "Please input the group name!" },
        { validator: validateGroupName },
      ]}
    >
      <Input style={{ borderRadius: "8px" }} />
    </Form.Item>
    <Form.Item
      name="category"
      label={<span style={{ color: "#075E54" }}>Category</span>}
      rules={[{ required: true, message: "Please select a category!" }]}
    >
      <Select placeholder="Select a category" style={{ borderRadius: "8px" }}>
        {categories.map((category) => (
          <Option key={category} value={category}>
            {category}
          </Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        style={{
          backgroundColor: "#128C7E",
          borderColor: "#128C7E",
          width: "100%",
          height: "40px",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      >
        Update Group
      </Button>
    </Form.Item>
  </Form>
);

export default EditGroupForm;
