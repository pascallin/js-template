import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Modal, Form } from "antd";

const ContainerDiv = styled.div`
  padding: 15px;
`;

const CollectionCreateForm = (props) => {
  const { visible, onCreate, onCancel, confirmLoading } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        {props.children}
      </Form>
    </Modal>
  );
};

CollectionCreateForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const CollectionsPage = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { saveAction } = props;

  const onCreate = async (values) => {
    setConfirmLoading(true);
    await saveAction(values);
    setConfirmLoading(false);
    setVisible(false);
  };

  return (
    <ContainerDiv>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        创建
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        confirmLoading={confirmLoading}
      >
        {props.children}
      </CollectionCreateForm>
    </ContainerDiv>
  );
};

CollectionsPage.propTypes = {
  saveAction: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default CollectionsPage;
