import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UserState {
  avatar: string | null;
  username: string | null;
  bio: string | null;
  email: string | null;
  name: string | null;
  createdAt: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  avatar: null,
  username: null,
  bio: null,
  email: null,
  name: null,
  createdAt: null,
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

      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || "خطایی رخ داد");
    }
  },
);

export const uploadAvatar = createAsyncThunk(
  "user/uploadAvatar",
  async (
    { file, isNew }: { file: File; isNew: boolean },
    { rejectWithValue },
  ) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("توکن موجود نیست لطفا ابتدا وارد شوید");
      }

      const formData = new FormData();
      formData.append("avatar", file);

      const url = "http://localhost:7227/v1/user/avatar";
      const method = isNew ? "POST" : "PUT";

      const response = await axios({
        method,
        url,
        headers: { Authorization: `Bearer ${token}` },
        data: formData,
      });

      toast.success("عکس پروفایل با موفقیت به‌روزرسانی شد!");
      return response.data.avatar;
    } catch (error) {
      toast.error(error.response?.data.message || "خطایی رخ داد");
      return rejectWithValue(error.response?.data.message || "خطایی رخ داد");
    }
  },
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (
    { field, value }: { field: string; value: string },
    { rejectWithValue },
  ) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("توکن موجود نیست لطفا ابتدا وارد شوید");
      }

      const response = await axios.put(
        `http://localhost:7227/v1/user/${field}`,
        { value },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success(`${field} با موفقیت بروزرسانی شد`);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data.message || "خطایی رخ داد");
      return rejectWithValue(error.response?.data.message || "خطایی رخ داد");
    }
  },
);

export const disabledUser = createAsyncThunk(
  "user/disable",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("توکن موجود نیست لطفا ابتدا وارد شوید");
      }

      const response = await axios.put(
        "http://localhost:7227/v1/user/settings",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success("حساب کاربری شما با موفقیت غیرفعال شد");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data.message || "خطایی رخ داد");
      return rejectWithValue(error.response?.data.message || "خطایی رخ داد");
    }
  },
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("توکن موجود نیست لطفا ابتدا وارد شوید");
      }

      const response = await axios.delete(
        "http://localhost:7227/v1/user/settings",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success("حساب کاربری شما با موفقیت حذف شد");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data.message || "خطایی رخ داد");
      return rejectWithValue(error.response?.data.message || "خطایی رخ داد");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      Cookies.remove("accessToken");
      toast.success("با موفقیت خارج شدید");
    },
  },
  extraReducers: (builder) => {
    // fetching user information
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
        state.email = action.payload.email;
        state.createdAt = action.payload.createdAt;
        state.name = action.payload.name;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // update and upload avatar image
    builder
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.avatar = action.payload;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // update user information
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.bio = action.payload.bio;
        state.email = action.payload.email;
        state.name = action.payload.name;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // disable user account
    builder
      .addCase(disabledUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(disabledUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(disabledUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    //delete user account
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        Cookies.remove("accessToken");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
