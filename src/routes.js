import React from "react";
import * as R from "ramda";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";

import Home from "./pages/Home";
import { ROLE } from "./constant";

export const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    roles: R.values(ROLE),
  },
  {
    name: "首页",
    path: "/home",
    component: Home,
    icon: <HomeOutlined />,
    roles: R.values(ROLE),
  },
  {
    name: "系统设置",
    path: "/setting",
    icon: <SettingOutlined />,
    roles: [ROLE.admin],
    children: [],
  },
];
