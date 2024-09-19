import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select } from "antd";

import { useThemeContext } from "@/context/hooks/use-theme-context";
import { TFetchBodyRegister } from "@/types/types";

import { useRegisterForm } from "@/features/Pages/RegisterPage/hooks/useRegisterForm";

import initialRegisterValues from "@/features/Pages/RegisterPage/state/registerState";

const { Option } = Select;

export const RegisterPage = () => {
  const { isDarkMode } = useThemeContext();

  const { fetchRegistrationUser } = useRegisterForm();

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
        initialValues={initialRegisterValues}
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
