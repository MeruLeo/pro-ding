/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TaskProps } from "@/types/project/members";
import Cookies from "js-cookie";
import axios from "axios";

const initialState = {
    tasks: [] as TaskProps[],
    loading: false,
    error: null,
};

export const fetchAllTasks = createAsyncThunk(
    "task/fetchAllTasks",
    async (projectId: string, { rejectWithValue }) => {
        try {
            const token = Cookies.get("accessToken");
            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await axios.get(
                `http://localhost:7227/v1/task/${projectId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data ||
                    error.message ||
                    "An unexpected error occurred",
            );
        }
    },
);

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
                state.error = null;
            })
            .addCase(fetchAllTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default taskSlice.reducer;
