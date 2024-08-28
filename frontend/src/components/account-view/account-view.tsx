import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";

export const AccountView: React.FC = () => {
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
        // onFinish={onFinish}
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
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
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
            type="password"
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
          or <a href="">Register now!</a>
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
