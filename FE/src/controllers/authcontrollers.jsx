import axios from "axios";

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/signup`, userData);
    return { success: true, ...response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Signup failed. Please try again.",
    };
  }
};

// ✅ User Login
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, credentials);
    return response.data; // Return success response
  } catch (error) {
    return error.response?.data || { message: "Login failed. Please check your credentials." };
  }
};
