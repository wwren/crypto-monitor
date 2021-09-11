import { Layout, Menu, Table } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getMarket } from "./API/coingecko.js";
import { AddtoWatch, WatchTable } from "./Components/EditWatch";
import { NotifyForm } from "./Components/NotifyForm";

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

const App = () => {
  const [market, setMarket] = useState([]);
  const [idList, setIdList] = useState([]);
  const [watchId, setWatchId] = useState([]);
  const [watch, setWatch] = useState([]);

  const [collapsed, setCollapse] = useState(false);

  useEffect(async () => {
    const { market, idList } = await getMarket();
    setMarket(market);
    setIdList(idList);
  }, []);

  useEffect(() => {
    let coins = market.filter((coin) => watchId.includes(coin.id));
    setWatch([...coins]);
  }, [watchId]);

  const onCollapse = () => {
    setCollapse(!collapsed);
  };

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          width="30vw"
          style={{ maxWidth: "400px" }}
        >
          <NotifyForm idList={idList} />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: 0, background: "#fff" }}
          />
          <Content style={{ margin: "0 16px" }}>
            <AddtoWatch idList={idList} setWatchId={setWatchId} />
            <WatchTable watch={watch} setWatchId={setWatchId} />
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
