import { useBooksFormContext } from "@/context/hooks/use-form-context";

import { TFetchLoginUser } from "@/types/types";

import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { Button, Checkbox, Flex, Form, Input } from "antd";

import axios from "axios";

import { useCallback } from "react";

export const LoginForm: React.FC = () => {
  const { setLoading, setError, setUser, openNotification } =
    useBooksFormContext();

  const fetchloginUser = useCallback(
    async ({ email, password }: TFetchLoginUser) => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.post("/api/auth/login", {
          email,
          password,
        });

        openNotification("topRight", "success", `You are login! Welcome back!`);

        console.log(res.data);

        setUser(res.data);
      } catch (error) {
        openNotification(
          "topRight",
          "error",
          "Please provide correct email or password!."
        );
        setError("Invalid email or password.");
      } finally {
        setLoading(false);
      }
    },
    [openNotification, setError, setLoading, setUser]
  );

  const handlerfetchloginUser = (values: TFetchLoginUser) => {
    const { email, password } = values;
    fetchloginUser({ email, password });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
          height: 700,
          width: "100%",
          padding: "40px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
        onFinish={handlerfetchloginUser}
      >
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Welcome Back!
        </h1>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="current-password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <a href="http://localhost:5173/Register">Register now!</a>
        </Form.Item>
      </Form>

      <img
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        src="https://picsum.photos/600/700.jpg"
        height={"700px"}
        width={"720px"}
      ></img>
    </div>
  );
};
