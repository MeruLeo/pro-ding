import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface UserState {
  avatar: string | null;
  username: string | null;
  bio: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  avatar: null,
  username: null,
  bio: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("توکن موجود نیست ، لطفا ابتدا وارد شوید");
      }

      const response = await axios.get("http://localhost:7227/v1/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || "خطایی رخ داد");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.avatar = null;
      state.username = null;
      state.bio = null;
      Cookies.remove("accessToken");
      toast.success("با موفقیت خارج شدید");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.avatar = action.payload.avatar;
        state.username = action.payload.username;
        state.bio = action.payload.bio;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
