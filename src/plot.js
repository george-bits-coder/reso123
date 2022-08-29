import React, { useState, useEffect } from "react";
//import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";
import axios from "axios";
import { Button, Tabs } from "antd";

const { TabPane } = Tabs;

export const DemoColumn = () => {
  const [salesdata, setSalesdata] = useState([]);
  const [swar, setSwar] = useState([1, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [dwm, setDwm] = useState("daily");
  const [dta, setDta] = useState("delivered_orders");

  let today1 = new Date();
  let yesterday =
    today1.getDate() -
    1 +
    "-" +
    (today1.getMonth() + 1) +
    "-" +
    today1.getFullYear();
  const [datetoday, setDatetoday] = useState(yesterday);
  let yearbeginning = "1-1-" + today1.getFullYear();
  let lastmonth =
    today1.getDate() - 1 + "-" + today1.getMonth() + "-" + today1.getFullYear();
  let dateddweek =
    today1.getDate() -
    7 +
    "-" +
    (today1.getMonth() + 1) +
    "-" +
    today1.getFullYear();
  let dateddmonth =
    1 + "-" + (today1.getMonth() + 1) + "-" + today1.getFullYear();
  const [passdate, setPassdate] = useState(dateddweek);
  useEffect(() => {
    /* axios
      .get(
        "https://george-unblock.herokuapp.com/unblock?url=https://sampleapi123.netlify.app/.netlify/functions/api/data"
      )
      .then((res) => {
        console.log(res.data);
        setSalesdata(res.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });*/

    console.log(datetoday, "datetoday", dta, "dta", dwm, "dwm");
    axios
      .get(
        `https://falconsai.com:8081/1234/analytics/salesmatrix?from_date=${passdate}&to_date=${yesterday}&metrics=${dta}&filter=${dwm}`
        //"https://george-unblock.herokuapp.com/unblock?url=http://falconsai.com:8081/1234/analytics/salesmatrix?from_date=15-7-2022&to_date=15-7-2022&metrics=delivered_orders&filter=daily"
      )
      .then((res) => {
        let resar = [];
        let months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec"
        ];
        console.log("res falcon", res, "falcon");
        for (let i = 0; i < res.data.length && i < 7; i++) {
          let resobj = {};
          let datestr = "" + res.data[i].start;
          console.log("datestr", datestr);
          let temp = datestr.split("-");
          let temp1 = temp[1] + "/" + temp[0] + "/" + temp[2] + "";
          console.log("temp1", temp1);
          var dateObject = new Date(temp1);
          console.log("dateobj", dateObject);
          var a = dateObject.toString();
          console.log("a", a);
          let b = Number(a.split(" ")[2]) + " " + a.split(" ")[1];
          console.log(b, "date");
          if (dwm === "daily") resobj["type"] = b;
          else if (dwm === "monthly")
            resobj["type"] = months[i] + " " + today1.getFullYear();
          else {
            let pre = "";
            if (i === 0) pre = "1st";
            else if (i === 1) pre = "2nd";
            else if (i === 2) pre = "3rd";
            else if (i === 3) pre = "4th";

            if (pre !== "") resobj["type"] = pre + " week";
          }
          if (res.data[i].metric.delivered_orders)
            resobj["sales"] = res.data[i].metric.delivered_orders;
          else if (res.data[i].metric.total_sales)
            resobj["sales"] = res.data[i].metric.total_sales;
          else resobj["sales"] = res.data[i].metric.avg_order_val;

          resar.push(resobj);
        }
        console.log(resar, "result object");
        setSalesdata(resar);
      })
      .catch((err) => console.log(err, "errorr123"));
  }, [dta, datetoday, dwm, swar, passdate]);
  useEffect(() => {
    let today = new Date();

    let date =
      today.getDate() +
      "-" +
      parseInt(today.getMonth() + 1, 10) +
      "-" +
      today.getFullYear();

    setDatetoday(date);
  }, []);
  console.log(salesdata, "sales");
  const config = {
    data: salesdata,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",
      // 'top', 'bottom', 'middle',

      style: {
        fill: "#FFFFFF",
        opacity: 0.6
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
        style: {
          fill: "#000000",
          opacity: 1
        }
      }
    },
    meta: {
      type: {
        alias: "sample"
      },
      sales: {
        alias: ""
      }
    }
  };
  const onClickb = (e) => {
    //  e.target.type = "primary";
    console.log(e.target.size, "type");
    //else e.target.type = "default";
  };
  const setitem = (num) => {
    let n = +num;
    let newitem = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    newitem[n] = 1;

    console.log(newitem, "newitem");
    console.log("n is  ", n);
    if (n == 0 || n == 3 || n == 6) {
      setDwm("daily");
      setPassdate(dateddweek);
    } else if (n == 1 || n == 4 || n == 7) {
      setDwm("weekly");
      setPassdate(lastmonth);
    } else {
      setDwm("monthly");
      setPassdate(yearbeginning);
    }
    setSwar(newitem);
    console.log("dwm is", dwm, " and dta is", dta);
  };
  const onTabChange = (key) => {
    console.log("key is ", key);
    if (key == 1) {
      setDta("delivered_orders");
      setSwar([1, 0, 0, 0, 0, 0, 0, 0, 0]);
    } else if (key == 2) {
      setDta("total_sales");
      setSwar([0, 0, 0, 1, 0, 0, 0, 0, 0]);
    } else {
      setDta("avg_order_val");
      setSwar([0, 0, 0, 0, 0, 0, 1, 0, 0]);
    }
    setDwm("daily");
    setPassdate(dateddweek);
    console.log("key and dta are ", key, dta);
  };
  return (
    <div>
      <h4 style={{ fontWeight: "bold" }}> Delivered Order Trends</h4>
      <Tabs defaultActiveKey="1" onChange={onTabChange}>
        <TabPane tab="Delivered Orders" key="1">
          <div display="flex" style={{ margin: "1%" }}>
            <Button
              type={swar[0] ? "primary" : "default"}
              size="medium"
              shape="round"
              style={{ marginRight: "1%" }}
              onClick={() => {
                setitem(0);
              }}
            >
              Daily
            </Button>
            <Button
              type={swar[1] ? "primary" : "default"}
              size="medium"
              shape="round"
              style={{ marginRight: "1%" }}
              onClick={() => setitem(1)}
            >
              Weekly
            </Button>
            <Button
              type={swar[2] ? "primary" : "default"}
              size="medium"
              shape="round"
              onClick={() => setitem(2)}
            >
              Monthly
            </Button>
            <Button
              style={{ marginLeft: "30%" }}
              type="primary"
              size="small"
              shape="round"
            >
              {" "}
            </Button>
            {"      "}
            Total number of delivered orders
          </div>
          <Column {...config} />
        </TabPane>
        <TabPane tab="Total Sales" key="2">
          <div display="flex" style={{ margin: "1%" }}>
            <Button
              type={swar[3] ? "primary" : "default"}
              size="medium"
              shape="round"
              style={{ marginRight: "1%" }}
              onClick={() => setitem(3)}
            >
              Daily
            </Button>
            <Button
              type={swar[4] ? "primary" : "default"}
              size="medium"
              shape="round"
              style={{ marginRight: "1%" }}
              onClick={() => setitem(4)}
            >
              Weekly
            </Button>
            <Button
              type={swar[5] ? "primary" : "default"}
              size="medium"
              shape="round"
              onClick={() => setitem(5)}
            >
              Monthly
            </Button>
            <Button
              style={{ marginLeft: "30%" }}
              type="primary"
              size="small"
              shape="round"
            >
              {" "}
            </Button>
            {"      "}
            Total sales
          </div>
          <Column {...config} />
        </TabPane>
        <TabPane tab="Average Order Value" key="3">
          <div display="flex" style={{ margin: "1%" }}>
            <Button
              type={swar[6] ? "primary" : "default"}
              size="medium"
              shape="round"
              style={{ marginRight: "1%" }}
              onClick={() => setitem(6)}
            >
              Daily
            </Button>
            <Button
              type={swar[7] ? "primary" : "default"}
              size="medium"
              shape="round"
              style={{ marginRight: "1%" }}
              onClick={() => setitem(7)}
            >
              Weekly
            </Button>
            <Button
              type={swar[8] ? "primary" : "default"}
              size="medium"
              shape="round"
              onClick={() => setitem(8)}
            >
              Monthly
            </Button>
            <Button
              style={{ marginLeft: "30%" }}
              type="primary"
              size="small"
              shape="round"
            >
              {" "}
            </Button>
            {"      "}
            Average Order value
          </div>
          <Column {...config} />
        </TabPane>
      </Tabs>
    </div>
  );
};
