import React from "react";
import userService from "../services/auth";
import Page403 from "../pages/403";

export const RoleCanHoc = (roleList) => (Component) => {
  return function RoleCan(props) {
    if (!process.env.REACT_APP_SKIP_ROLE_CHECK) {
      const user = userService.getUser();
      if (roleList.indexOf(user.role) === -1) return null;
    }
    return <Component {...props}></Component>;
  };
};

export const RolePageHoc = (roleList) => (Component) => {
  return function RolePage(props) {
    if (!process.env.REACT_APP_SKIP_ROLE_CHECK) {
      const user = userService.getUser();
      if (roleList.indexOf(user.role) === -1) return <Page403></Page403>;
    }
    return <Component {...props}></Component>;
  };
};

export default RoleCanHoc;
