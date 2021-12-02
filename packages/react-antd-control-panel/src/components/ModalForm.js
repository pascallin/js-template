import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Button, Modal, Form } from "antd";

const ContainerDiv = styled.div`
  padding: 15px;
`;

const SaveForm = (props) => {
  const { visible, onCreate, onCancel, confirmLoading, title } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title={title}
      okText="Save"
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

SaveForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired, // some antd form item array
  confirmLoading: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

const ModalForm = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { saveAction } = props;

  const onSave = async (values) => {
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
      <SaveForm
        visible={visible}
        onCreate={onSave}
        onCancel={() => {
          setVisible(false);
        }}
        confirmLoading={confirmLoading}
        title={props.formTitle || "New Form"}
      >
        {props.children}
      </SaveForm>
    </ContainerDiv>
  );
};

ModalForm.propTypes = {
  saveAction: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired, // some antd form item array
  formTitle: PropTypes.string,
};

export default ModalForm;
