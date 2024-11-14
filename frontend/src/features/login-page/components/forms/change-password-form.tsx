import { Button, Form, Input } from "antd";
import "../../../../assets/layouts-styles/login-styles/change-password-styles/password.css";

const ChangePasswordForm = () => {
  return (
    <div className="password__container-form">
      <Form>
        <Form.Item
          name="oldPassword"
          label="Old Password"
          rules={[
            {
              type: "string",
              required: true,
              message: "Please input your old password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
              min: 6,
              max: 16,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmpassword"
          label="Confirm Password"
          rules={[
            {
              required: true,
              message: "Please input your confirm password!",
              min: 6,
              max: 16,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ width: 300, justifyContent: "center" }}
            disabled={false}
            block
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
