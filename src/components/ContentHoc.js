import React from "react";
import { Card, ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

export default (Component) => {
  return class Content extends React.Component {
    render() {
      return (
        <Card style={{ marginTop: "20px" }}>
          <ConfigProvider locale={zhCN}>
            <Component {...this.props}></Component>
          </ConfigProvider>
        </Card>
      );
    }
  };
};
