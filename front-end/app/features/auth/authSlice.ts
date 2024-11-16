import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface AuthState {
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    {
      values,
      router,
    }: { values: { identifier: string; password: string }; router: any },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:7227/v1/auth/login",
        values,
      );
      Cookies.set("accessToken", response.data.accessToken, { expires: 20 });

      toast.success("با موفقیت وارد شدید");

      router.push("/");
    } catch (error) {
      toast.error("خطایی هنگام ورود رخ داد");
      return rejectWithValue(error.response.data.message || "خطایی رخ داد");
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      values,
      router,
    }: {
      values: {
        username: string;
        email: string;
        password: string;
        name: string;
      };
      router: any;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:7227/v1/auth/register",
        values,
      );
      Cookies.set("accessToken", response.data.accessToken, { expires: 20 });
      toast.success("ثبت نام شما با موفقیت انجام شد");

      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("خطایی در ثبت نام رخ داد");
      return rejectWithValue(error.response.data.message || "خطایی رخ داد");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      Cookies.remove("accessToken");
      toast.success("با موفقیت خارج شدید");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
