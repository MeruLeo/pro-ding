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
}

// Initial state
const initialState: ProjectState = {
    currentProject: null,
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

// Slice
const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setProjectProgress: (state, action: PayloadAction<number>) => {
            if (state.currentProject) {
                state.currentProject.progress = action.payload;
            }
        },
        addTask: (state, action: PayloadAction<Task>) => {
            if (state.currentProject) {
                state.currentProject.tasks.push(action.payload);
            }
        },
        removeTask: (state, action: PayloadAction<string>) => {
            if (state.currentProject) {
                state.currentProject.tasks = state.currentProject.tasks.filter(
                    (task) => task.id !== action.payload,
                );
            }
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            if (state.currentProject) {
                const index = state.currentProject.tasks.findIndex(
                    (task) => task.id === action.payload.id,
                );
                if (index !== -1) {
                    state.currentProject.tasks[index] = action.payload;
                }
            }
        },
        addMember: (state, action: PayloadAction<ProjectMember>) => {
            if (state.currentProject) {
                state.currentProject.members.push(action.payload);
            }
        },
        removeMember: (state, action: PayloadAction<string>) => {
            if (state.currentProject) {
                state.currentProject.members =
                    state.currentProject.members.filter(
                        (member) => member.id !== action.payload,
                    );
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
                state.currentProject = action.payload;
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
            .addCase(createProject.fulfilled, (state, action) => {
                state.projects.push(action.payload);
                state.error = null;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                const index = state.projects.findIndex(
                    (project) => project.id === action.payload.id,
                );
                if (index !== -1) {
                    state.projects[index] = action.payload;
                }
                if (
                    state.currentProject &&
                    state.currentProject.id === action.payload.id
                ) {
                    state.currentProject = action.payload;
                }
                state.error = null;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.projects = state.projects.filter(
                    (project) => project.id !== action.payload,
                );
                if (
                    state.currentProject &&
                    state.currentProject.id === action.payload
                ) {
                    state.currentProject = null;
                }
                state.error = null;
            });
    },
});

export const {
    setProjectProgress,
    addTask,
    removeTask,
    updateTask,
    addMember,
    removeMember,
} = projectSlice.actions;

export default projectSlice.reducer;
