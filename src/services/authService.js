import api from "./api";

// Helper — convert plain object to FormData (API uses multipart/form-data)
const toFormData = (obj) => {
  const fd = new FormData();
  Object.entries(obj).forEach(([key, value]) => fd.append(key, value));
  return fd;
};

// POST /login_user
// Returns: { status, token, user, expirein }
export const login = async (email, password) => {
  const { data } = await api.post("/login_user", toFormData({ email, password }));
  return data;
};

// POST /register_user
// Returns: { user, token, expirein, status }
export const register = async ({ name, email, country, phone_number, password, password_confirmation }) => {
  const { data } = await api.post(
    "/register_user",
    toFormData({ name, email, country, phone_number, password, password_confirmation })
  );
  return data;
};

// POST /user_email_confirm — step 1 of forgot password flow
// Returns: { status, email, message }
export const confirmEmail = async (email) => {
  const { data } = await api.post("/user_email_confirm", toFormData({ email }));
  return data;
};

// POST /user_verify_otp — step 2 of forgot password flow
// Returns: { status, message }
export const verifyOtp = async (email, otp) => {
  const { data } = await api.post("/user_verify_otp", toFormData({ email, otp }));
  return data;
};

// POST /user_update_password — step 3 of forgot password flow
// Returns: { status, message }
export const resetPassword = async (email, password, password_confirmation) => {
  const { data } = await api.post(
    "/user_update_password",
    toFormData({ email, password, password_confirmation })
  );
  return data;
};

// GET /refresh_token — refresh JWT before it expires (requires Bearer token)
// Returns: { expirein, token }
export const refreshToken = async () => {
  const { data } = await api.get("/refresh_token");
  return data;
};
