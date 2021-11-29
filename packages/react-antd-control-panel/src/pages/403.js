import React from "react";
import { Card } from "antd";

export default function Page_403() {
  return (
    <Card style={{ marginTop: "20px" }}>
      <h2>403</h2>
      <h3>抱歉，你无权访问该页面</h3>
      <a href="/">返回首页</a>
    </Card>
  );
}
