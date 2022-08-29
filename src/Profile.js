import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Input, message, Space, InputNumber } from "antd";

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

export const Profile = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div style={{ marginLeft: "14.6%", width: "85vw" }}>
      <div>Profile</div>

      <Form {...layout} name="nest-messages" onFinish={onFinish}>
        <Form.Item
          name={["user", "address"]}
          label="Address"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input.TextArea maxLength={200} />
        </Form.Item>
        <Form.Item
          name={["user", "description"]}
          label="Shop Description"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input.TextArea showCount maxLength={200} />
        </Form.Item>

        <Form.Item name={["user", "business-type"]} label="Business Type">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "city"]} label="City">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "state"]} label="State">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "pin"]} label="Pincode">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "lat"]} label="Latitude">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "long"]} label="Longitude">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "radius"]} label="Delivery Radius">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "minval"]} label="Minimum Delivery Value">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "Phone"]} label="Phone">
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          rules={[
            {
              type: "email",
              message: "Please Enter valid E-mail!"
            }
          ]}
          label="Email"
        >
          <Input />
        </Form.Item>
        <Form.Item name={["user", "gst"]} label="GST %">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "gst_liable"]} label="GST Liable">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "commission"]} label="Commission">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "FSSAI"]} label="FSSAI Number">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "GSTIN"]} label="GSTIN">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "rest_id"]} label="Restaurant ID">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "POS"]} label="POS ID">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "timings"]} label="Restaurant Timings">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "Store-on/off"]} label="Store On/Off">
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "PackagingChargeType"]}
          label="Packaging Charge Type"
        >
          <Input />
        </Form.Item>
        <Form.Item name={["user", "PackagingCharge"]} label="Packaging Charge">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "SelfDelivery"]} label="Self Delivery">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
