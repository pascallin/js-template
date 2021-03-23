import React from "react";
import { Card } from "antd";

export default function Page_404() {
  return (
    <Card style={{ marginTop: "20px" }}>
      <h2>404</h2>
      <h3>抱歉，你访问的页面不存在</h3>
      <a href="/">返回首页</a>
    </Card>
  );
}
