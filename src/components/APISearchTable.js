import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Table, Button, Row, Col, Form } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import * as R from "ramda";

const ContainerDiv = styled.div``;

const SORT_ORDER_MAP = {
  ascend: "asc",
  descend: "desc",
};

APISearchTable.propTypes = {
  /** fetch data API endpoint URL:
   *    - strict query data construction: { page, sortBy, sortOrder, ...filter }
   *    - strict response data construction: { total, records }
   * */
  fetchMethod: PropTypes.func.isRequired,
  columns: PropTypes.any, // antd table columns object
  reload: PropTypes.bool.isRequired, // control table reloading from parent component
  tableProps: PropTypes.object, //  antd table props
  children: PropTypes.arrayOf(PropTypes.element).isRequired, // some antd form item array
};

function APISearchTable(props) {
  // pagination control state
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({});
  const [sorter, setSorter] = useState({
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // data state
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  const { fetchMethod, columns, reload, tableProps } = props;

  useEffect(async () => {
    const res = await fetchMethod(
      R.mergeAll([filter, { page, size: PAGE_SIZE }, sorter])
    );
    setTotal(res.total);
    setLoading(false);
    setData(res.records);
  }, [fetchMethod, page, filter, loading, reload, sorter]);

  const search = (values) => {
    setFilter(values);
    setPage(1);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setSorter({
      sortBy: sorter.field,
      sortOrder: SORT_ORDER_MAP[sorter.order],
    });
  };

  const count = expand ? props.children.length : 6;

  return (
    <ContainerDiv>
      <Form
        form={form}
        name="advanced_search"
        onFinish={search}
        style={{ paddingBottom: "15px" }}
      >
        <Row gutter={24}>
          {R.slice(0, count, props.children).map((Child, i) => (
            <Col span={8} key={i}>
              {Child}
            </Col>
          ))}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => {
                form.resetFields();
              }}
            >
              清除
            </Button>
            <a
              style={{ fontSize: 12 }}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? <UpOutlined /> : <DownOutlined />} 展开
            </a>
          </Col>
        </Row>
      </Form>
      <Table
        columns={columns}
        rowKey={(record) => record._id || record.key}
        dataSource={data}
        pagination={{
          current: page,
          pageSize: PAGE_SIZE,
          total,
        }}
        loading={loading}
        onChange={handleTableChange}
        {...tableProps}
      />
    </ContainerDiv>
  );
}

export default APISearchTable;
