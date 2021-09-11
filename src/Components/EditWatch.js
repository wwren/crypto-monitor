import React, { useState, useEffect } from "react";
import { Form, Input, Button, Space, Select, Table } from "antd";
import { MenuOutlined } from "@ant-design/icons";
const { Option } = Select;

export const RemovefromWatch = ({ watch, setWatch }) => {
  return <div></div>;
};

export const CoinDropDown = ({ idList }) => {
  const options = idList.map((e) => {
    return (
      <Option key={e.key} value={e.key}>
        {e.name}
      </Option>
    );
  });

  return (
    <Select placeholder="Select Currency" allowClear>
      {options}
    </Select>
  );
};

export const AddtoWatch = ({ idList, setWatchId }) => {
  const [form] = Form.useForm();

  const options = idList.map((e) => {
    return (
      <Option key={e.key} value={e.key}>
        {e.name}
      </Option>
    );
  });

  const onFinish = (v) => {
    setWatchId((prevWatch) => [...prevWatch, v.more]);
  };

  return (
    <Form ref={form} onFinish={onFinish}>
      <Form.Item name="more" label="Add to Watch" rules={[{ required: false }]}>
        <Select placeholder="Select Currency" allowClear>
          {options}
        </Select>
        {/* <CoinDropDown idList={idList} /> */}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add to Watch
        </Button>
      </Form.Item>
    </Form>
  );
};

export const WatchTable = ({ watch, setWatchId }) => {
  const onClickDelete = (v) => {
    let row = v.target.closest(".ant-table-row-level-0");
    let key = row.getAttribute("data-row-key");
    console.log("key to delete ", key);
    setWatchId((prevData) => prevData.filter((ele) => ele != key));
  };

  const watchColumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Symbol",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} width="25px" />,
    },
    {
      title: "Price A$",
      dataIndex: "current_price",
      key: "current_price",
    },
    {
      title: "MrkCap Rank",
      dataIndex: "market_cap_rank",
      key: "market_cap_rank",
    },
    {
      title: "7d",
      dataIndex: "price_change_percentage_7d_in_currency",
      key: "price_change_percentage_7d_in_currency",
      render: (text) => Math.round(parseFloat(text) * 100) / 100,
    },
    {
      title: "14d",
      dataIndex: "price_change_percentage_14d_in_currency",
      key: "price_change_percentage_14d_in_currency",
      render: (text) => Math.round(parseFloat(text) * 100) / 100,
    },
    {
      title: "24d",
      dataIndex: "price_change_percentage_24h_in_currency",
      key: "price_change_percentage_24h_in_currency",
      render: (text) => Math.round(parseFloat(text) * 100) / 100,
    },
    {
      title: "Action",
      key: "action",
      render: () => <a onClick={onClickDelete}>Delete</a>,
    },
  ];

  return <Table columns={watchColumn} dataSource={watch} />;
};
