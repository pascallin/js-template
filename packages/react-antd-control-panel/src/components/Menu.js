import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import { routes } from "../routes";
import { pathSelector } from "../selectors/route";

const { SubMenu } = Menu;

const AppMenu = (props) => {
  const { user } = props;
  const pathname = useSelector(pathSelector);
  const pathArr = pathname.split("/");
  const defaultOpenKeys = [];
  if (pathArr.length > 2) defaultOpenKeys.push(`/${pathArr[1]}`);
  return (
    <Menu
      theme="dark"
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={[pathname]}
      mode="inline"
    >
      {routes.map((menu) => {
        if (menu.path === "/") return null;
        if (menu.isMenu) return null;
        if (!menu.children) {
          if (!process.env.REACT_APP_SKIP_ROLE_CHECK) {
            if (menu.roles.indexOf(user.role) === -1) return null;
          }
          return (
            <Menu.Item key={menu.path} icon={menu.icon}>
              <Link to={menu.path} style={{ color: "white" }}>
                <span>{menu.name}</span>
              </Link>
            </Menu.Item>
          );
        }
        if (!process.env.REACT_APP_SKIP_ROLE_CHECK) {
          if (menu.roles.indexOf(user.role) === -1) return null;
        }
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <span>{menu.name}</span>
              </span>
            }
            icon={menu.icon}
          >
            {menu.children.map((submenu) => {
              return (
                <Menu.Item key={menu.path + submenu.path}>
                  <Link to={menu.path + submenu.path}>{submenu.name}</Link>
                </Menu.Item>
              );
            })}
          </SubMenu>
        );
      })}
    </Menu>
  );
};

AppMenu.propTypes = {
  user: PropTypes.object,
};

export default AppMenu;
