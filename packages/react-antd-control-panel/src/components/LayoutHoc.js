import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Layout, Menu, Dropdown, Button, Row, Col } from "antd";

import AppMenu from "./Menu";
import authService from "../services/auth";
import ServiceContext from "../contexts/ServiceContext";
import { createServices } from "../services";

const { Header, Content, Sider } = Layout;

const LogoDiv = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
`;

export default (Component) => {
  return class AppLayout extends React.Component {
    state = {
      collapsed: false,
    };

    static get propTypes() {
      return {
        history: PropTypes.any,
      };
    }

    onCollapse = (collapsed) => {
      console.log(collapsed);
      this.setState({ collapsed });
    };

    logout() {
      authService.logout();
      const { history } = this.props;
      setTimeout(() => {
        history.push("/login");
      }, 300);
    }

    render() {
      let user;
      const { history } = this.props;

      if (!process.env.REACT_APP_DEBUG) {
        const token = authService.getToken();
        if (!token) {
          history.push("/login");
        }
        user = authService.getUser();
        if (!user) return null;
      }

      const services = createServices();

      return (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <LogoDiv />
            <AppMenu user={user}></AppMenu>
          </Sider>
          <Layout>
            <Header>
              <Row type="flex" justify="end">
                {user && (
                  <Col>
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item>
                            <a onClick={() => this.logout()}>退出登录</a>
                          </Menu.Item>
                        </Menu>
                      }
                    >
                      <Button>{user.nickname || user.username}</Button>
                    </Dropdown>
                  </Col>
                )}
              </Row>
            </Header>
            <Content style={{ margin: "0 16px" }}>
              <ServiceContext.Provider value={services}>
                <Component {...this.props}></Component>
              </ServiceContext.Provider>
            </Content>
          </Layout>
        </Layout>
      );
    }
  };
};
