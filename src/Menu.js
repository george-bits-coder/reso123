import { useState, useEffect } from "react";
import "./index.css";
const data = require("./db.json");
export const MenuItems = () => {
  return (
    <div style={{ backgroundColor: "white", padding: "5px" }}>
      <h1>Restaurant Menu</h1>
      <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
        {data.map((ele) => (
          <div style={{ display: "flex", marginTop: "15px" }}>
            <div style={{ cursor: "pointer" }}>
              <img
                src={ele["images"][0]}
                style={{ height: "150px", width: "150px" }}
                alt="menu img"
              />
            </div>
            <div style={{ marginLeft: "2%" }}>
              <div>
                {" "}
                <span>
                  <h3 style={{ fontWeight: "bold" }}> {ele["name"]}</h3>{" "}
                </span>
              </div>
              <br />

              <div>₹ {ele["price"]}</div>
              <br />
              <div>{ele["attribute_name"]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
