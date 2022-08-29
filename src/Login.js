import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Login = ({ setLoggedin }) => {
  let navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);

    axios
      .post("https://sampleoms.herokuapp.com/api/user/login", values)
      .then((res) => {
        console.log(res, "login result");
        setLoggedin(true);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("error");
      });
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", height: "100vh" }}>
          <img
            src="https://i.postimg.cc/KvXmYdsq/pexels-elina-sazonova-1907098.jpg"
            alt="img"
          />
        </div>

        <div
          style={{
            width: "50%",
            height: "100vh",
            marginTop: "30vh",
            marginLeft: "10vw"
          }}
        >
          Restaurant OMS
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!"
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!"
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item></Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
