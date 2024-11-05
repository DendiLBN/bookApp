import { Form, Input } from "antd";



const ChangePasswordForm = () => {
    return (
        <Form>
            <Form.Item
                name="oldPassword"
                label="Old Password"
                rules={[
                    {
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
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
        </Form>
    );
};

export default ChangePasswordForm;
