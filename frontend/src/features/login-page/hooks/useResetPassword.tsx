import { useLocation } from "react-router-dom";
import axios from "axios";

export const ResetPassword = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPassword = event.target.newPassword.value;

    // Wywołanie API do resetowania hasła
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/reset-password",
        {
          token,
          newPassword,
        }
      );

      if (response.status === 200) {
        alert("Password reset successfully");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Error resetting password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Reset Password</h1>
      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};
