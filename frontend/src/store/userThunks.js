import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

const signUp = createAsyncThunk(
  "user/signup",
  async ({ username, emailId, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signup", {
        username,
        emailId,
        password
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "sign up failed");
    }
  }
);
const login = createAsyncThunk(
  "user/login",
  async ({ emailId, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/login", {
        emailId,
        password
      });

      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "login failed");
    }
  }
);

const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/logout", {});
      return response.data.message;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err?.response?.data?.message || "logout failed");
    }
  }
);
const getUser = createAsyncThunk(
  "user/getData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/me");
      return response.data.data;
    } catch (err) {
      console.log(err);
      const msg = err?.response?.data?.message;
      if (msg === "jwt expired" || msg === "unauthorized") {
        console.warn("jwt expired - skipping user load");
        return rejectWithValue(null);
      }
      return rejectWithValue(msg || "logout failed");
    }
  }
);
export { login, signUp, logout, getUser };
