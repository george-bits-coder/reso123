import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { MenuAcc } from "./MenuAcc";
import { Profile } from "./Profile";
import { Select } from "antd";
import { MenuItems } from "./Menu";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, Tabs, Progress } from "antd";
import { Card, Col, Row } from "antd";
import { DemoColumn } from "./plot";
import axios from "axios";
import { Mealtime } from "./Mealtimestats";
import { Navigate } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;
const sidebarItems = [
  "Orders",
  "Menu",
  "Order History",
  "Insights",
  "Campaigns",
  "Payout",
  "Outlet Info",
  "Customer Complaints",
  "Help Center",
  "Notifications",
  "Logout"
];
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
  TeamOutlined,
  TeamOutlined,
  TeamOutlined
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: sidebarItems[index]
}));

export const Dashboard = ({ loggedin }) => {
  let today = new Date();

  //let month=today.setMonth(parseInt(today.getMonth() + 1, 10) - 1);

  let date =
    today.getDate() +
    " " +
    today.toLocaleString("en-US", {
      month: "short"
    });
  let datedd =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  let yesterday =
    today.getDate() -
    1 +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getFullYear();

  let dateddweek =
    today.getDate() -
    7 +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getFullYear();
  let dateddmonth =
    1 + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  let prev_month_date =
    today.getDate() - 1 + "-" + today.getMonth() + "-" + today.getFullYear();
  console.log(datedd, "datedd");
  const [meals, setMeals] = useState({});
  const [salesMeals, setSalesMeals] = useState({});
  const [bdf, setBdf] = useState("daily");
  const [topd, setTopd] = useState({});
  const [menukey, setMenukey] = useState(4);
  // const [bdfs, setBdfs] = useState("daily");
  function selectvalue(e) {
    console.log(e);
    setBdf(e + "");
  }
  function selectvaluesales(e) {
    console.log(e);
    setBdf(e + "");
  }
  useEffect(() => {
    const fetchData = async () => {
      var fromdate;
      var obj = { ...topd };
      if (bdf === "weekly") fromdate = dateddweek;
      else if (bdf === "monthly") fromdate = dateddmonth;
      else fromdate = yesterday;
      await axios
        .get(
          `https://falconsai.com:8081/1234/analytics/mealtimematrix?from_date=${fromdate}&to_date=${datedd}&metrics=delivered_orders`,
          {
            headers: { "Content-Type": "application/json" }
          }
        )
        .then((res) => {
          console.log(res, "jjj");
          setMeals({ ...res.data.filters, ...res.data.metric });
        })
        .catch((err) => {
          console.log(err.message);
        });
      await axios
        .get(
          `https://falconsai.com:8081/1234/analytics/mealtimematrix?from_date=${fromdate}&to_date=${datedd}&metrics=total_sales`,
          {
            headers: { "Content-Type": "application/json" }
          }
        )
        .then((res) => {
          console.log(res, "jjj sales");
          setSalesMeals({ ...res.data.filters, ...res.data.metric });
        })
        .catch((err) => {
          console.log(err.message);
        });

      await axios
        .get(
          `https://falconsai.com:8081/1234/analytics/salesmatrix?from_date=${dateddweek}&to_date=${datedd}&metrics=delivered_orders&metrics=total_sales`
        )
        .then((res) => {
          console.log(res, "weekly result ");
          //  console.log(res.data[0].metric.delivered_orders, "top results");
          let ar = [];
          ar[0] = res.data[0].metric.delivered_orders;
          ar[1] = res.data[0].metric.total_sales;
          obj.weekly = ar;
          // obj.weekly[0] = res.data[0].metric.delivered_orders;
          // obj.weekly[1] = res.data[1].metric.delivered_orders;
        });

      await axios
        .get(
          `https://falconsai.com:8081/1234/analytics/salesmatrix?from_date=${yesterday}&to_date=${datedd}&metrics=delivered_orders&metrics=total_sales`
        )
        .then((res) => {
          let ar = [];
          console.log(res, "daily res");
          ar[0] = res.data[0].metric.delivered_orders;
          ar[1] = res.data[0].metric.total_sales;
          obj.daily = ar;
          // console.log(res.data[0].metric.delivered_orders, "top results");
          // obj.daily = res.data[0].metric.delivered_orders;
        });

      await axios
        .get(
          `https://falconsai.com:8081/1234/analytics/salesmatrix?from_date=${prev_month_date}&to_date=${datedd}&metrics=delivered_orders&metrics=total_sales`
        )
        .then((res) => {
          let ar = [];
          console.log(res, "monthly result");
          ar[0] = res.data[0].metric.delivered_orders;
          ar[1] = res.data[0].metric.total_sales;
          obj.monthly = ar;

          //  console.log(res.data[0].metric.delivered_orders, "top results");
          //   obj.monthly = res.data[0].metric.delivered_orders;
        });

      console.log(obj, "final object");
      setTopd(obj);
    };
    fetchData();
  }, [bdf, datedd, dateddmonth, dateddweek, yesterday]);
  console.log(topd.daily, "topd obj");
  function MenuClick({ key }) {
    console.log(key, "menu");
    setMenukey(key);
  }

  if (loggedin) {
    return (
      <Layout>
        <Sider
          style={{
            backgroundColor: "white",
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0
          }}
        >
          <div>
            <img
              style={{ objectFit: "contain", width: "200px" }}
              src="https://i.postimg.cc/C5X0L5z3/gfal1.png"
              alt="Logo"
            />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
            style={{
              width: "50vw"
            }}
            onSelect={MenuClick}
          />
        </Sider>
        {menukey != 2 && menukey != 7 && (
          <Layout
            className="site-layout"
            style={{
              marginLeft: 100
            }}
          >
            <Content
              style={{
                margin: " 0px 0"
              }}
            >
              <div
                className="site-layout-background"
                style={{
                  padding: 24,
                  marginLeft: 110,
                  marginBottom: 7
                }}
              >
                <h4 style={{ fontWeight: "bold" }}>Insights</h4>
              </div>

              <div
                className="site-layout-background"
                style={{
                  padding: 24,

                  marginBottom: 7,
                  marginLeft: 110
                }}
              >
                <div style={{ display: "flex" }}>
                  {" "}
                  <h1 style={{ fontWeight: "bold" }}>
                    Total sales from delivered orders
                  </h1>
                  <Button
                    type="primary"
                    shape="round"
                    style={{ marginLeft: "60%", marginBottom: "20px" }}
                  >
                    This Month
                  </Button>
                  <Button
                    shape="round"
                    style={{ marginLeft: "5px", marginBottom: "20px" }}
                  >
                    Previous
                  </Button>
                </div>
                <div>
                  <div className="site-card-wrapper">
                    <Row gutter={16}>
                      <Col span={8}>
                        <div
                          style={{
                            backgroundColor: "white",
                            borderRadius: "1%",
                            padding: "5%"
                          }}
                        >
                          <div style={{ color: "#808080" }}>Today {date} </div>
                          <div>
                            <h2>
                              ₹{" "}
                              {Object.keys(topd).length !== 0 && topd.daily[1]}
                            </h2>
                          </div>
                          <div style={{ color: "#808080" }}>
                            {" "}
                            {Object.keys(topd).length !== 0 &&
                              topd.daily[0]}{" "}
                            orders
                          </div>
                        </div>
                      </Col>
                      <Col span={8}>
                        <div
                          style={{
                            backgroundColor: "white",
                            borderRadius: "1%",
                            padding: "5%"
                          }}
                        >
                          <div style={{ color: "#808080" }}>
                            This week{" "}
                            {Number(date.split(" ")[0]) - 7 > 1
                              ? Number(date.split(" ")[0]) - 7
                              : 1 + "" + Number(date.split(" ")[1])}{" "}
                            - {date}
                          </div>
                          <div>
                            <h2>
                              ₹{" "}
                              {Object.keys(topd).length !== 0 && topd.weekly[1]}
                            </h2>
                          </div>
                          <div style={{ color: "#808080" }}>
                            {" "}
                            {Object.keys(topd).length !== 0 &&
                              topd.weekly[0]}{" "}
                            orders
                          </div>
                        </div>
                      </Col>
                      <Col span={8}>
                        <div
                          style={{
                            backgroundColor: "white",
                            borderRadius: "1%",
                            padding: "5%"
                          }}
                        >
                          <div style={{ color: "#808080" }}>
                            This month 1 -{date}
                          </div>
                          <div>
                            <h2>
                              ₹{" "}
                              {Object.keys(topd).length !== 0 &&
                                topd.monthly[1]}
                            </h2>
                          </div>
                          <div style={{ color: "#808080" }}>
                            {" "}
                            {Object.keys(topd).length !== 0 &&
                              topd.monthly[0]}{" "}
                            orders
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    textAlign: "left",
                    marginLeft: 110,
                    width: "55%"
                  }}
                >
                  <DemoColumn />
                </div>

                <div
                  className="site-layout-background"
                  style={{ marginLeft: "1%", width: "35%", padding: 15 }}
                >
                  <h4 style={{ fontWeight: "bold" }}>Mealtime Distribution</h4>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Delivered Orders" key="1">
                      <Mealtime bdf="daily" tail="delivered_orders" />
                    </TabPane>
                    <TabPane tab="Total Sales" key="2">
                      <Mealtime bdf="daily" tail="total_sales" />
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center"
              }}
            ></Footer>
          </Layout>
        )}
        {menukey == 2 && (
          <div style={{ marginLeft: "12vw", width: "85vw" }}>
            <div
              style={{
                width: "85vw",
                marginBottom: 7
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "80px",
                  backgroundColor: "white"
                }}
              >
                <h4
                  style={{
                    fontWeight: "bold",
                    padding: 24,
                    marginLeft: 5
                  }}
                >
                  Restaurant Menu
                </h4>
              </div>
            </div>
            <MenuAcc />
          </div>
        )}
        {menukey == 7 && <Profile />}
      </Layout>
    );
  } else {
    return <Navigate to="/" replace />;
  }
};
