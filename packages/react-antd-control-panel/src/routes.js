import React from "react";
import * as R from "ramda";
import {
  HomeOutlined,
  SettingOutlined,
  TableOutlined,
} from "@ant-design/icons";

import Home from "./pages/Home";
import List from "./features/list/List";
import { ROLE } from "./constant";
import Counter from "./features/counter/Counter";

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
    name: "Examples",
    path: "/demo",
    icon: <TableOutlined />,
    children: [
      {
        name: "列表Demo",
        path: "/list",
        component: List,
        roles: R.values(ROLE),
      },
      {
        name: "计数器（redux-tookit test）",
        path: "/counter",
        component: Counter,
        roles: R.values(ROLE),
      },
    ],
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
