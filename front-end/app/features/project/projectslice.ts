/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { TaskProps } from "@/types/project/members";

// Interfaces
interface ProjectMember {
    _id: string;
    name: string;
    role: string;
}

interface Project {
    _id: string;
    name: string;
    description: string;
    tasks: TaskProps[];
    privateTasks: TaskProps[];
    owner: {
        name: string;
        username: string;
        avatar: string;
        tasks: TaskProps[];
    };
    createdAt: string;
    updatedAt: string;
    members: ProjectMember[];
    startDate: string;
    endDate: string;
    status: string;
    progress: number;
    icon: string;
}

interface ProjectState {
    currentProject: Project | null;
    projects: Project[];
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: ProjectState = {
    currentProject: {
        _id: "",
        privateTasks: [],
        tasks: [],
        name: "",
        icon: "",
        status: "",
        startDate: "",
        endDate: "",
        description: "",
        owner: {
            name: "",
            username: "",
            avatar: "",
            tasks: [],
        },
        members: [],
        progress: 0,
        createdAt: "",
        updatedAt: "",
    },
    projects: [],
    loading: false,
    error: null,
};

// Async thunks
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

export const fetchAllProjects = createAsyncThunk(
    "project/fetchAllProjects",
    async (_, { rejectWithValue }) => {
        try {
            const token = Cookies.get("accessToken");
            if (!token) {
                throw new Error("Unauthorized");
            }
            const response = await axios.get(
                "http://localhost:7227/v1/project/getAll",
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch projects",
            );
        }
    },
);

// Slice
const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProject.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProject =
                    action.payload.project || initialState.currentProject;
                state.error = null;
            })
            .addCase(fetchProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
                state.error = null;
            })
            .addCase(fetchAllProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default projectSlice.reducer;
