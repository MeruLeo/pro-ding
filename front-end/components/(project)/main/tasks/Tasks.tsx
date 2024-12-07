/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import { TaskProps } from "@/types/project/members";
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "@/app/features/task/taskSlice";
import Task from "../../task/Task";

export interface ProjectTasksProps {
    projectId: string;
}

const ProjectTasks: React.FC<ProjectTasksProps> = ({ projectId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading, error } = useSelector(
        (state: RootState) => state.task,
    );

    useEffect(() => {
        dispatch(fetchAllTasks(projectId));
    }, [dispatch, projectId]);

    if (loading) return <p>Loading ...</p>;
    if (error) {
        const errorMessage =
            error.msg || error.message || "An unexpected error occurred.";
        return <p>{errorMessage}</p>;
    }

    return (
        <>
            <h5 className="text-3xl font-bold mb-6 mt-10">تسک های شما</h5>
            <ul className=" flex flex-wrap justify-between items-start">
                {tasks.map((task: TaskProps) => (
                    <Task key={task._id} {...task} />
                ))}
            </ul>
        </>
    );
};

export default ProjectTasks;
