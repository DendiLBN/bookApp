import { useCallback } from "react";

import axios from "axios";

import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { TFetchBodyRegister } from "@/types/types";

import { useAuthFormContext } from "@/context/hooks/use-form-auth-context";

import { useNavigate } from "react-router-dom";

import { useThemeContext } from "@/context/hooks/use-theme-context";

const { Option } = Select;

export const RegisterPage = () => {
  const { setLoading, setError, setUser, openNotification } =
    useAuthFormContext();

  const { isDarkMode } = useThemeContext();

  const navigate = useNavigate();

  const fetchRegistrationUser = useCallback(
    async ({ email, password, firstName, lastName }: TFetchBodyRegister) => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.post("/api/singup", {
          firstName,
          lastName,
          email,
          password,
        });
        openNotification(
          "topRight",
          "success",
          `Your account has been created successfully! ${res.data.email}. Welcome to our bookstore! ${res.data.firstName}! Please login now.`,
          false
        );
        setUser(res.data.data);
        setTimeout(() => {
          navigate("/Login");
        }, 3000);
      } catch (error) {
        openNotification(
          "topRight",
          "error",
          "An error occurred while registering user!. Please try again later.",
          false
        );
        setError("An error occurred while registering user.");
      } finally {
        setLoading(false);
      }
    },
    [navigate, openNotification, setError, setLoading, setUser]
  );

  // TODO protect against sending requests in short of time frame / add throuttling config on the server side

  const handleSubmitRegister = (values: TFetchBodyRegister) => {
    fetchRegistrationUser(values);
    console.log(values);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {" "}
      <img
        style={{
          boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)",
        }}
        src="https://picsum.photos/600/700.jpg"
        height={"700px"}
        width={"720px"}
      ></img>
      <Form
        name="register"
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          remember: true,
        }}
        style={{
          maxWidth: 500,
          height: 700,
          maxHeight: 720,
          width: "100%",
          background: isDarkMode ? "#708090" : "#D3D3D3",
          padding: "40px",
          boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          border: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        onFinish={handleSubmitRegister}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          Enter your details below to create an account:
        </h1>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            { type: "email", message: "The input is not a valid E-mail!" },
            { required: true, message: "Please input your E-mail!" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
            autoComplete="username"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "Password must be at least 8 characters!" },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirm-password"
          dependencies={["new-password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            { min: 8, message: "Password must be at least 8 characters!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            { required: true, message: "Please input your First Name!" },
            {
              min: 5,
              message: "Please must be at least 5 characters!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="First Name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            { required: true, message: "Please input your Last Name!" },
            {
              min: 5,
              message: "Please must be at least 5 characters!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: "Please select your gender!",
            },
          ]}
        >
          <Select placeholder="Select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 14, offset: 6 }}
          style={{
            textAlign: "center",
            marginBottom: "34px",
          }}
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
          {" "}
          <Button type="primary" htmlType="submit" block>
            click here to register account!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default RegisterPage;
