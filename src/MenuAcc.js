import { Collapse } from "antd";
import "./index.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const { Panel } = Collapse;

//const data = require("./db.json");

/*let data1 = [];
let data2 = [];
let data3 = [];
let data4 = [];

for (let i = 0; i < data.length; i++) {
  if (i % 4 === 0) data1.push(data[i]);
  else if (i % 4 === 1) data2.push(data[i]);
  else if (i % 4 === 2) data3.push(data[i]);
  else if (i % 4 === 3) data4.push(data[i]);
}*/
export const MenuAcc = () => {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [category, setCategory] = useState({});
  const [ultdata, setUltdata] = useState([[]]);
  useEffect(() => {
    const callf = async () => {
      axios
        .get("https://falconsai.com:8081/GFFBRTCH1649830116/menu")
        .then((res) => {
          console.log(res.data, "result");
          var data = res.data;
          let obj = {};

          for (let i = 0; i < data.length; i++) {
            if (data[i]["category"].length > 2) obj[data[i]["category"]] = [];
            else obj["Other"] = [];
          }

          for (let i = 0; i < data.length; i++) {
            /* if (!data[i]["category"]) obj["Other"] = obj["Other"].push(data[i]);
            else {
              obj[data[i]["category"]] = obj[data[i]["category"]].push(data[i]);
            }*/
            //if(obj[data[i].category)
            let cat = "Other";
            if (data[i].category.length > 2) cat = data[i].category;
            console.log(cat, "category");

            console.log(obj[cat], "object cat");
            // if(obj[cat].includes())
            obj[cat].push(data[i]);
          }

          console.log(obj, "object");
          console.log(obj[data[0]], "obj");
          setCategory(obj);
          /*var data = res.data;
          let data11 = [];
          let data21 = [];
          let data31 = [];
          let data41 = [];
          let obj;
          for (let i = 0; i < data.length; i++) {
            if (data[i]["category"]) obj[data[i]["category"]] = [];
          }
          if (Object.keys(obj).length === 0) obj["Other"] = [];

          // setCategory(obj);

          /* let arr=Object.keys(obj);

         let ult = [];
         for(let i=0;i<arr.length;i++)
         {
              ult[arr[i]=[];
         }
          for (let i = 0; i < data.length; i++) {
            if (!data[i]["category"]) obj["Other"] = obj["Other"].push(data[i]);
            else {
              obj[data[i]["category"]] = obj[data[i]["category"]].push(data[i]);
            }
          }
          //  setCategory(obj);
          for (let i = 0; i < data.length; i++) {
            if (i % 4 === 0) data11.push(data[i]);
            else if (i % 4 === 1) data21.push(data[i]);
            else if (i % 4 === 2) data31.push(data[i]);
            else if (i % 4 === 3) data41.push(data[i]);
          }
          setData1(data11);
          setData2(data21);
          setData3(data31);
          setData4(data41);*/
        })
        .catch((err) => {
          console.log(err, "error");
        });
    };
    callf();
  }, []);
  return (
    <div style={{ height: "100%", width: "90vw" }}>
      <Collapse style={{ width: "90vw" }} defaultActiveKey={["0"]}>
        {Object.keys(category).map((key, index) => {
          return (
            <Panel header={key} key={index} style={{ color: "white" }}>
              {category[key].map((ele) => (
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <div
                    style={{
                      cursor: "pointer",
                      height: "250px",
                      width: "250px"
                    }}
                  >
                    <div
                      style={{
                        backgroundImage:
                          "url('https://i.postimg.cc/wM3ggTky/TASTY-DISH-IMAGE.png')"
                      }}
                    >
                      <img
                        src={
                          ele["images"][0]
                            ? ele["images"][0]
                            : "https://i.postimg.cc/wM3ggTky/TASTY-DISH-IMAGE.png"
                        }
                        alt=""
                        style={{
                          height: "250px",
                          width: "250px",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginLeft: "2%" }}>
                    <div>
                      {" "}
                      <span>
                        <h3 style={{ fontWeight: "bold", display: "flex" }}>
                          {ele["attribute_name"] === "non-veg" ? (
                            <img
                              src="https://img.icons8.com/color/48/000000/non-vegetarian-food-symbol.png"
                              alt="poi"
                              style={{
                                height: "20px",
                                width: "20px",
                                marginRight: "5px"
                              }}
                            />
                          ) : (
                            <img
                              src="https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png"
                              alt="ji"
                              style={{
                                height: "20px",
                                width: "20px",
                                marginRight: "5px"
                              }}
                            />
                          )}{" "}
                          {"  " + ele["name"]}
                        </h3>{" "}
                      </span>
                    </div>
                    <br />

                    <div>₹ {ele["price"]}</div>
                    <br />

                    <div>{ele["description"]}</div>
                  </div>
                </div>
              ))}
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

/*
<Panel header="Category 1" key="1" style={{ color: "white" }}>
</Panel>
          {data1.map((ele) => (
            <div style={{ display: "flex", marginTop: "15px" }}>
              <div
                style={{ cursor: "pointer", height: "250px", width: "250px" }}
              >
                <img
                  src={
                    ele["images"][0].length > 5
                      ? ele["images"][0]
                      : "https://i.postimg.cc/g2PBxty2/no-image-icon-23494.png"
                  }
                  style={{
                    height: "250px",
                    width: "250px",
                    objectFit: "cover"
                  }}
                  alt="menu img"
                />
              </div>
              <div style={{ marginLeft: "2%" }}>
                <div>
                  {" "}
                  <span>
                    <h3 style={{ fontWeight: "bold", display: "flex" }}>
                      {ele["attribute_name"] === "non-veg" ? (
                        <img
                          src="https://img.icons8.com/color/48/000000/non-vegetarian-food-symbol.png"
                          alt="poi"
                          style={{
                            height: "20px",
                            width: "20px",
                            marginRight: "5px"
                          }}
                        />
                      ) : (
                        <img
                          src="https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png"
                          alt="ji"
                          style={{
                            height: "20px",
                            width: "20px",
                            marginRight: "5px"
                          }}
                        />
                      )}{" "}
                      {"  " + ele["name"]}
                    </h3>{" "}
                  </span>
                </div>
                <br />

                <div>₹ {ele["price"]}</div>
                <br />

                <div>{ele["description"]}</div>
              </div>
            </div>
          ))}
        </Panel>
        <Panel header="Category 2" key="2">
          {data2.map((ele) => (
            <div style={{ display: "flex", marginTop: "15px" }}>
              <div
                style={{ cursor: "pointer", height: "250px", width: "250px" }}
              >
                <img
                  src={
                    ele["images"][0]
                      ? ele["images"][0]
                      : "https://i.postimg.cc/g2PBxty2/no-image-icon-23494.png"
                  }
                  alt="menu"
                  style={{
                    height: "250px",
                    width: "250px",
                    objectFit: "cover"
                  }}
                />
              </div>
              <div style={{ marginLeft: "2%" }}>
                <div>
                  {" "}
                  <span>
                    <h3 style={{ fontWeight: "bold", display: "flex" }}>
                      {ele["attribute_name"] === "non-veg" ? (
                        <img
                          src="https://img.icons8.com/color/48/000000/non-vegetarian-food-symbol.png"
                          alt="poi"
                          style={{
                            height: "20px",
                            width: "20px",
                            marginRight: "5px"
                          }}
                        />
                      ) : (
                        <img
                          src="https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png"
                          alt="ji"
                          style={{
                            height: "20px",
                            width: "20px",
                            marginRight: "5px"
                          }}
                        />
                      )}{" "}
                      {"  " + ele["name"]}
                    </h3>{" "}
                  </span>
                </div>
                <br />

                <div>₹ {ele["price"]}</div>
                <br />

                <div>{ele["description"]}</div>
              </div>
            </div>
          ))}
        </Panel>
        <Panel header="Category 3" key="3">
          {data3.map((ele) => (
            <div style={{ display: "flex", marginTop: "15px" }}>
              <div
                style={{ cursor: "pointer", height: "250px", width: "250px" }}
              >
                <img
                  src={
                    ele["images"][0]
                      ? ele["images"][0]
                      : "https://i.postimg.cc/g2PBxty2/no-image-icon-23494.png"
                  }
                  alt="menu"
                  style={{
                    height: "250px",
                    width: "250px",
                    objectFit: "cover"
                  }}
                />
              </div>
              <div style={{ marginLeft: "2%" }}>
                <div>
                  {" "}
                  <span>
                    <h3 style={{ fontWeight: "bold", display: "flex" }}>
                      {ele["attribute_name"] === "non-veg" ? (
                        <img
                          src="https://img.icons8.com/color/48/000000/non-vegetarian-food-symbol.png"
                          alt="poi"
                          style={{
                            height: "20px",
                            width: "20px",
                            marginRight: "5px"
                          }}
                        />
                      ) : (
                        <img
                          src="https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png"
                          alt="ji"
                          style={{
                            height: "20px",
                            width: "20px",
                            marginRight: "5px"
                          }}
                        />
                      )}{" "}
                      {"  " + ele["name"]}
                    </h3>{" "}
                  </span>
                </div>
                <br />

                <div>₹ {ele["price"]}</div>
                <br />

                <div>{ele["description"]}</div>
              </div>
            </div>
          ))}
        </Panel>
        <Panel header="Category 4" key="4">
          {data4.map((ele) => (
            <div style={{ display: "flex", marginTop: "25px" }}>
              <div
                style={{ cursor: "pointer", height: "250px", width: "250px" }}
              >
                <img
                  src={
                    ele["images"][0]
                      ? ele["images"][0]
                      : "https://i.postimg.cc/g2PBxty2/no-image-icon-23494.png"
                  }
                  alt="menu"
                  style={{
                    height: "250px",
                    width: "250px",
                    objectFit: "cover"
                  }}
                />
              </div>
              <div style={{ marginLeft: "1%" }}>
                <div>
                  <span>
                    <h3 style={{ fontWeight: "bold", display: "flex" }}>
                      {ele["attribute_name"] === "non-veg" ? (
                        <img
                          src="https://img.icons8.com/color/48/000000/non-vegetarian-food-symbol.png"
                          alt="poi"
                          style={{
                            height: "20px",
                            width: "20px",
                            marginRight: "5px"
                          }}
                        />
                      ) : (
                        <img
                          src="https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png"
                          alt="ji"
                          style={{
                            height: "20px",
                            width: "20px",
                            marginRight: "5px"
                          }}
                        />
                      )}{" "}
                      {"  " + ele["name"]}
                    </h3>{" "}
                  </span>
                </div>
                <br />

                <div>₹ {ele["price"]}</div>
                <br />

                <br />
                <div>{ele["description"]}</div>
              </div>
            </div>
          ))}
        </Panel>

        */
