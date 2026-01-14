import axiosClient from "./axios";

const authService = {
  // Đăng ký tài khoản (bước 1)
  register: (data) => {
    return axiosClient.post("/auth/register", data);
  },

  // Xác nhận email (bước 2)
  verifyEmail: (data) => {
    return axiosClient.post("/auth/verify-email", data);
  },

  // Gửi lại mã xác nhận (nếu mã hết hạn)
  resendCode: (data) => {
    return axiosClient.post("/auth/resend-code", data);
  },

  // Đăng nhập tài khoản đã xác thực
  login: (data) => {
    return axiosClient.post("/auth/login", data);
  },

  // Lấy thông tin user sau khi login
  getProfile: () => {
    return axiosClient.get("/auth/profile");
  },

  // Đăng nhập qua Google
  loginGoogle: (data) => {
    return axiosClient.post("/auth/login/google", data);
  },
};

export default authService;

