import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";
import { CoinDropDown } from "./EditWatch";
import parse from "html-react-parser";

const { Option } = Select;

export const NotifyForm = ({ idList }) => {
  const [form] = Form.useForm();

  const onFinish = (v) => {
    console.log(v);
  };

  const mapToOption = (array, html = false) => {
    return array.map((e) => {
      return (
        <Option
          key={typeof e === "object" ? e.key : e}
          value={typeof e === "object" ? e.key : e}
        >
          {typeof e === "object" ? e.name : html ? parse(e) : e}
        </Option>
      );
    });
  };

  const coins = mapToOption(idList);
  const attributes = mapToOption(["price", "7d", "14d", "24d"]);
  const isLarger = mapToOption(["&#8805;", "&#8804;"], true);

  return (
    <Form ref={form} name="notifyMe" onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Need email to receive notification!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Coin"
        name="coin"
        rules={[{ required: true, message: "Which coin to watch?" }]}
      >
        <Select allowClear>{coins}</Select>
      </Form.Item>
      <Form.Item
        label="Attribute"
        name="attribute"
        rules={[{ required: true, message: "Please select an attribute!" }]}
      >
        <Select placeholder="Attibute to watch for" allowClear>
          {attributes}
        </Select>
      </Form.Item>
      <Form.Item
        label="Larger or Smaller"
        name="isLarger"
        rules={[{ required: true, message: "Fill up" }]}
      >
        <Select allowClear autoFocus>
          {isLarger}
        </Select>
      </Form.Item>
      <Form.Item
        label="How much"
        name="much"
        rules={[
          {
            required: true,
            message: "Fill",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Notify me
        </Button>
        <Button type="secondary" htmlType="reset">
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};
