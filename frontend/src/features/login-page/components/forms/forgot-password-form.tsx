import { useModalContext } from "@/common/contexts/hooks/use-modal-context";
import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";
import { useForgotPasswordMutation } from "@/store/api/auth";

import { PasswordModalProps, TFrogotPasswordEmail } from "@/types/types";

import { Button, Input, Form, Modal } from "antd";
import { useCallback } from "react";

export const ForgotPasswordModal = ({ visible }: PasswordModalProps) => {
  const { openNotification } = useNotificationContext();
  const [forgotPassword] = useForgotPasswordMutation();

  const { hideModal } = useModalContext();

  const [form] = Form.useForm();

  // TODO ADD SOMETHING AGAINST TO SPAMMING REQUESTS

  const handleSuccess = useCallback(() => {
    openNotification("topRight", "success", "Email has been send", true);
  }, [openNotification]);

  const handleError = useCallback(() => {
    openNotification(
      "topRight",
      "error",
      "Error during sending request.",
      false
    );
  }, [openNotification]);

  const handleCancelModal = () => {
    hideModal();
    form.resetFields();
  };

  const handleSendEmail = useCallback(
    async ({ email }: TFrogotPasswordEmail) => {
      try {
        await forgotPassword({
          data: { email },
          onSuccess: handleSuccess,
          onError: handleError,
        }).unwrap();
      } catch (error) {
        console.error(error);
      }
    },
    [forgotPassword, handleError, handleSuccess]
  );

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

export default ForgotPasswordModal;
