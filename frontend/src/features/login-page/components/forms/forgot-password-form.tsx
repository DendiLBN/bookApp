import { useModalContext } from "@/common/contexts/hooks/use-modal-context";
import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";
import { useForgotPasswordMutation } from "@/store/api/auth";

import { TForgotPasswordProps, TFrogotPasswordEmail } from "@/types/types";

import { Button, Input, Form, Modal } from "antd";

export const ForgotPasswordForm = ({ visible }: TForgotPasswordProps) => {
  const { openNotification } = useNotificationContext();

  const [forgotPassword] = useForgotPasswordMutation();

  const { hideModal } = useModalContext();

  const [form] = Form.useForm();

  const handleCancelModal = () => {
    hideModal();
    form.resetFields();
  };

  const handleSuccess = () => {
    openNotification(
      "topRight",
      "success",
      "Email has been send follow the instructions",
      true
    );
    handleCancelModal();
  };

  const handleError = () => {
    openNotification(
      "topRight",
      "error",
      "Unable to send request. Probably too many requests have been sent in short time. Please check your email address and try again.",
      true
    );
  };

  const handleSendEmail = async ({ email }: TFrogotPasswordEmail) => {
    forgotPassword({
      data: { email },
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return (
    <Modal
      title="Forgot Password"
      open={visible}
      onCancel={handleCancelModal}
      footer={null}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form form={form} onFinish={handleSendEmail}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
              type: "email",
            },
          ]}
        >
          <Input placeholder="enter your email..." />
        </Form.Item>

        <Form.Item>
          <Button
            style={{ width: 300, justifyContent: "center" }}
            type="primary"
            htmlType="submit"
          >
            Send reset password link
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ForgotPasswordForm;
