import { useCallback } from "react";
// import { useNavigate } from "react-router-dom";

import axios from "axios";

import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Spin } from "antd";

import { useAuthFormContext } from "@/context/hooks/use-form-auth-context";

import { TFetchLoginUser } from "@/types/types";
import { setTokens } from "@/common/utils/setTokens";
import { Link } from "react-router-dom";
import { useThemeContext } from "@/context/hooks/use-theme-context";

export const LoginPage = () => {
  const { loading, setLoading, setError, setUser, openNotification } =
    useAuthFormContext();

  const { isDarkMode } = useThemeContext();
  // const navigate = useNavigate();

  const fetchBodyLoginUser = useCallback(
    async ({ email, password }: TFetchLoginUser) => {
      setLoading(true);
      setError(null);

      try {
        localStorage.clear();
        const res = await axios.post("/api/auth/login", { email, password });

        const accessToken = res.data.token;

        // TODO correct all names fetchLoginUser correct names for components
        // TODO setToken function to store token in local storage
        // TODO accesToken is stored in local storage
        // TODO  handle token and user data before storing it in local storage
        // TODO protect against sending requests in short of time frame / add throuttling config on the server side

        setTokens({
          accessToken,
        });
        setUser(res.data);

        // TODO setUser to Redux store

        // navigate("/");

        console.log("Fetched Token:", accessToken);

        openNotification(
          "top",
          "success",
          "You are logged in! Welcome back!",
          true
        );
      } catch (error) {
        openNotification(
          "top",
          "error",
          "Please provide correct email or password!",
          true
        );
      } finally {
        setLoading(false);
      }
    },
    [openNotification, setError, setLoading, setUser]
  );

  const handleSubmitLogin = (values: TFetchLoginUser) => {
    if (!loading) {
      fetchBodyLoginUser(values);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vh",
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
          background: isDarkMode ? "#708090" : "#D3D3D3",
          boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
        onFinish={handleSubmitLogin}
      >
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Please login here!
        </h1>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Innorrect email! Please try again.!",
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
              message: "Inncorrect password! Please try again.!",
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
          <Button disabled={loading} block type="primary" htmlType="submit">
            {loading ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 24, color: "#fff" }}
                    spin
                  />
                }
              />
            ) : (
              "Log in"
            )}
          </Button>
          or <Link to="/auth/register">Register now!</Link>
        </Form.Item>
      </Form>

      <img
        style={{
          boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)",
        }}
        src="https://picsum.photos/600/700.jpg"
        height={"700px"}
        width={"720px"}
      ></img>
    </div>
  );
};
export default LoginPage;
