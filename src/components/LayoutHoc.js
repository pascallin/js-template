import React from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Dropdown, Button, Row, Col } from "antd";
import AppMenu from "./Menu";
import authService from "../services/auth";
import ServiceContext from "../contexts/ServiceContext";
import { createServices } from "../services";

const { Header, Content, Sider } = Layout;

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
      const token = authService.getToken();
      const user = authService.getUser();
      const { history } = this.props;
      if (!token) {
        history.push("/login");
      }

      const services = createServices();

      if (!user) return null;

      return (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div
              style={{
                height: "32px",
                margin: "16px",
                textAlign: "center",
              }}
            ></div>
            <AppMenu user={user}></AppMenu>
          </Sider>
          <Layout>
            <Header>
              <Row type="flex" justify="end">
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
