import "../styles/app.scss";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon, Button } from "antd";
import auth from "../auth";

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
        <Layout>
          <Sider
              style={{
                overflow: "auto",
                height: "100vh"
              }}
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline">
              <Menu.Item key="1">
                <Link to={`/`}>
                  <Icon type="user" />
                  <span className="nav-text">Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={`/clients`}>
                  <Icon type="user" />
                  <span className="nav-text">Clients</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Icon
                    className="sidemenu-trigger"
                    type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.toggle}
                />
                <Button
                    onClick={() => {
                      auth.logout(() => {
                        this.props.history.push("/login");
                      });
                    }}
                    style={{ marginTop: "15px", marginRight: "15px" }}
                >
                  <Icon type={"logout"} /> Logout
                </Button>
              </div>
            </Header>
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <div style={{ backgroundColor: "#fff", padding: "25px" }}>
                {this.props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Client Information Collector. 2019</Footer>
          </Layout>
        </Layout>
    );
  }
}

export default withRouter(App);
