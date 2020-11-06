import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch } from "react-router-dom";
import { Router } from "react-router";

import { routes } from "./routes";
import authService from "./services/auth";

import { RolePageHoc } from "./components/RoleCanHoc";
import wrapLayout from "./components/LayoutHoc";
import Page404 from "./pages/404";
import Login from "./pages/Login";

App.propTypes = {
  history: PropTypes.object,
  location: PropTypes.string,
};

function App(props) {
  const renderRoutes = (menus, pathPrefix = "") => {
    return menus.map((menu) => {
      if (menu.children) {
        return renderRoutes(menu.children, menu.path);
      }
      return (
        <Route
          key={menu.path}
          exact
          path={pathPrefix + menu.path}
          component={wrapLayout(RolePageHoc(menu.roles)(menu.component))}
        ></Route>
      );
    });
  };
  const protectedRoutes = renderRoutes(routes);

  return (
    <div className="App">
      <Router history={props.history}>
        <Switch>
          <Route
            path="/login"
            exact
            render={(props) => {
              const token = authService.getToken();
              if (token) {
                return (
                  <Redirect
                    to={{
                      pathname: "/home",
                      state: { from: props.location },
                    }}
                  />
                );
              }
              return <Login {...props}></Login>;
            }}
          ></Route>
          {protectedRoutes.map((v) => v)}
          <Route component={wrapLayout(Page404)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
