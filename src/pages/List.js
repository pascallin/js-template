import React from "react";
import { Tag, Space, Form, Input, Radio } from "antd";
import * as R from "ramda";

import APISearchTable from "../components/APISearchTable";
import ModalForm from "../components/ModalForm";
import { tableData } from "../constant/mockData";

export default function Plan() {
  const columns = [
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: function NameColumn(text) {
        return <a>{text}</a>;
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: function TagsColumn(tags) {
        return (
          <div>
            {tags.map((tag) => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: function ActionColumn(text, record) {
        return (
          <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
          </Space>
        );
      },
    },
  ];

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const saveAction = async (values) => {
    await timeout(3000);
    console.log("Received values of form: ", values);
  };

  const fakeFetchMethod = async (params) => {
    const { page, size, sortBy, sortOrder } = params;
    console.log(params);
    let dataSource = R.clone(tableData);
    if (sortBy && sortOrder) {
      dataSource = R.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      }, dataSource);
    }
    const offset = size * (page - 1);
    return {
      total: 18,
      records: R.slice(
        offset,
        offset >= 18 ? Infinity : offset + size,
        dataSource
      ),
    };
  };

  const getFields = () => {
    const count = 10;
    const children = [];

    for (let i = 0; i < count; i++) {
      children.push(
        <Form.Item
          name={`field-${i}`}
          label={`Field ${i}`}
          rules={[
            {
              required: true,
              message: "Input something!",
            },
          ]}
        >
          <Input placeholder="placeholder" />
        </Form.Item>
      );
    }

    return children;
  };

  return (
    <div>
      <ModalForm saveAction={saveAction}>
        <div>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input type="textarea" />
          </Form.Item>
          <Form.Item
            name="modifier"
            className="collection-create-form_last-form-item"
          >
            <Radio.Group>
              <Radio value="public">Public</Radio>
              <Radio value="private">Private</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
      </ModalForm>
      <APISearchTable
        columns={columns}
        fetchMethod={fakeFetchMethod}
        FormItemComponents={getFields()}
        reload={false}
      />
    </div>
  );
}
