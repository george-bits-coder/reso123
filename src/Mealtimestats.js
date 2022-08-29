import { Progress, Select } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
export const Mealtime = (props) => {
  const { Option } = Select;
  const [meals, setMeals] = useState({});
  let today = new Date();
  let datedd =
    today.getDate() -
    1 +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getFullYear();
  console.log("dateddd", datedd);
  const selectvalue = async (e) => {
    let fromdate;
    console.log("e", e);
    if (e === "daily")
      fromdate =
        today.getDate() -
        2 +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
    else if (e === "monthly") {
      fromdate =
        today.getDate() -
        1 +
        "-" +
        today.getMonth() +
        "-" +
        today.getFullYear();
    } else if (e === "weekly") {
      fromdate = fromdate =
        today.getDate() -
        8 +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
    }
    var url = `https://falconsai.com:8081/1234/analytics/mealtimematrix?from_date=${fromdate}&to_date=${datedd}&metrics=${props.tail}`;
    console.log("url", url);
    await axios
      .get(url, {
        headers: { "Content-Type": "application/json" }
      })
      .then((res) => {
        console.log(res, "jjj");
        setMeals({ ...res.data.filters, ...res.data.metric });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    selectvalue("daily");
  }, []);
  return (
    <>
      <Select
        defaultValue={"daily"}
        style={{
          width: 120
        }}
        onChange={selectvalue}
      >
        <Option value="daily">Last 1 Day</Option>
        <Option value="weekly">Last 7 Days</Option>

        <Option value="monthly">Last 1 Month</Option>
      </Select>
      <br />
      <br />
      <h3 style={{ fontWeight: "bold" }}>
        {props.tail === "total_sales" && "₹ "}
        {Math.round(meals[props.tail])}{" "}
        {props.tail === "delivered_orders"
          ? "delivered orders"
          : "in total sales"}
      </h3>
      <br />
      <br />
      Breakfast
      <br />
      <Progress
        percent={meals.breakfast}
        strokeColor="orange"
        status="active"
      />{" "}
      <br />
      <br />
      Lunch
      <br />
      <Progress percent={meals.lunch} strokeColor="red" status="active" />{" "}
      <br />
      <br />
      Snacks
      <br />
      <Progress
        percent={meals.snacks}
        strokeColor="navyblue"
        status="active"
      />{" "}
      <br />
      <br />
      Dinner
      <br />
      <Progress
        percent={meals.dinner}
        status="active"
        strokeColor="cyan"
      />{" "}
      <br />
      <br />
      Late Night
      <br />
      <Progress
        percent={meals.latenight}
        strokeColor="pink"
        status="active"
      />{" "}
    </>
  );
};
