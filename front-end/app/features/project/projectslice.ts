/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Interfaces
interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    assignee: string;
    dueDate: string;
    isComplete: boolean;
}

interface ProjectMember {
    _id: string;
    name: string;
    role: string;
}

interface Project {
    _id: string;
    name: string;
    description: string;
    tasks: Task[];
    owner: string;
    createdAt: string;
    updatedAt: string;
    members: ProjectMember[];
    startDate: string;
    endDate: string;
    status: string;
    progress: number;
}

interface ProjectState {
    currentProject: Project | null;
    projects: Project[];
    loading: boolean;
    error: string | null;
    hasTaskAccess: boolean;
}

// Initial state
const initialState: ProjectState = {
    currentProject: null,
    projects: [],
    loading: false,
    error: null,
    hasTaskAccess: false,
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
            return {
                project: response.data,
                hasTaskAccess: response.data.hasTaskAccess,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch project",
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
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch projects",
            );
        }
    },
);

export const createProject = createAsyncThunk(
    "project/createProject",
    async (projectData: Partial<Project>, { rejectWithValue }) => {
        try {
            const token = Cookies.get("accessToken");
            if (!token) {
                throw new Error("Unauthorized");
            }
            const response = await axios.post(
                "http://localhost:7227/v1/project",
                projectData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to create project",
            );
        }
    },
);

export const updateProject = createAsyncThunk(
    "project/updateProject",
    async (
        {
            projectId,
            updateData,
        }: { projectId: string; updateData: Partial<Project> },
        { rejectWithValue },
    ) => {
        try {
            const token = Cookies.get("accessToken");
            if (!token) {
                throw new Error("Unauthorized");
            }
            const response = await axios.put(
                `http://localhost:7227/v1/project/${projectId}`,
                updateData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to update project",
            );
        }
    },
);

export const deleteProject = createAsyncThunk(
    "project/deleteProject",
    async (projectId: string, { rejectWithValue }) => {
        try {
            const token = Cookies.get("accessToken");
            if (!token) {
                throw new Error("Unauthorized");
            }
            await axios.delete(
                `http://localhost:7227/v1/project/${projectId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            return projectId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to delete project",
            );
        }
    },
);

export const toggleCompleteTask = createAsyncThunk(
    "peoject/task/toggleComplete",
    async (taskId: string, { rejectWithValue }) => {
        try {
            const token = Cookies.get("accessToken");
            if (!token) {
                throw new Error("Unauthorized");
            }
            const response = await axios.put(
                `http://localhost:7227/v1/task/${taskId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to toggle task completion",
            );
        }
    },
);

// Slice
const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        toggleTaskCompletion: (state, action: PayloadAction<string>) => {
            const taskId = action.payload;
            const task = state.currentProject?.project.tasks.find(
                (task) => task._id === taskId,
            );
            if (task) {
                task.isComplete = !task.isComplete;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProject.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProject = action.payload.project;
                state.hasTaskAccess = action.payload.hasTaskAccess;
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
            })
            .addCase(toggleCompleteTask.fulfilled, (state, action) => {
                const index = state.currentProject.project.tasks.findIndex(
                    (task) => task._id === action.payload._id,
                );
                if (index !== -1) {
                    state.currentProject.project.tasks[index].isComplete =
                        !state.currentProject.project.tasks[index].isComplete;
                }
                state.error = null;
                state.loading = false;
            })
            .addCase(toggleCompleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleCompleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { toggleTaskCompletion } = projectSlice.actions;

export default projectSlice.reducer;
