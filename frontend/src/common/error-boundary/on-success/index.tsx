import { Button, Result } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

export const SuccessFully = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // TODO ADD TYPES TO LOCATION
  const { firstName, email } = location.state;

  const handleLoginRedirect = () => {
    navigate("/auth/login", { replace: true });
  };

  return (
    <Result
      status="success"
      title={`Your account has been created successfully! This is your email: ${email}`}
      subTitle={`Welcome ${firstName}! You can now log in.`}
      extra={[
        <Button type="primary" onClick={handleLoginRedirect} key="console">
          Go to login page!
        </Button>,
      ]}
    />
  );
};

export default SuccessFully;
