import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  // Read email from cookies
  const email = Cookies.get("resetEmail");
  const API_URL = "https://auth-v1-4.onrender.com";

  useEffect(() => {
    if (!email) {
      toast.error("Session expired. Please request OTP again.");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      toast.error(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    try {
      setError("");
      const res = await axios.post(
        `${API_URL}/reset-password`,
        { email, otp, newPassword },
        { withCredentials: true }
      );

      toast.success(res.data?.msg || "Password reset successfully!");

      setTimeout(() => {
        Cookies.remove("resetEmail"); // Remove email cookie after use
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.msg || "An error occurred");
      toast.error(err.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-blue-600">
          Reset Password
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-2 border rounded border-blue-300 focus:ring focus:ring-blue-200"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            className="w-full p-2 border rounded border-blue-300 focus:ring focus:ring-blue-200"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Reset Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
