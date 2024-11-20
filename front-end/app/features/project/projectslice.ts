/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface Task {
    id: string;
    title: string;
    description: string;
    project: string;
    assignee: string;
    isComplete: boolean;
    startDate: Date;
    endDate?: Date;
}
interface ProjectMember {
    id: string;
    username: string;
    name: string;
    avatar: string;
    isActive: boolean;
}

interface ProjectState {
    name: string;
    description: string;
    tasks: Task[];
    owner: string;
    createdAt: string;
    updatedAt: string;
    members: ProjectMember[];
    startDate: Date;
    endDate: Date;
    status: string;
    progress: number;
    loading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    name: "",
    description: "",
    tasks: [],
    owner: "",
    createdAt: "",
    updatedAt: "",
    members: [],
    startDate: new Date(),
    endDate: new Date(),
    status: "",
    progress: 0,
    loading: false,
    error: null,
};

export const fetchProject = createAsyncThunk(
    "project/fetchProject",
    async (projectId: string, { rejectWithValue }) => {
        try {
            const token = Cookies.get("accessToken");
            if (!token) {
                throw new Error("Unauthorized");
            }

            const response = await axios.get(
                `http://localhost:7227/v1/project/${projectId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProject.fulfilled, (state, action) => {
                return {
                    ...state,
                    ...action.payload,
                    loading: false,
                    error: null,
                };
            })
            .addCase(fetchProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});
