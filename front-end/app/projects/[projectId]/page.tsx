"use client";

/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { fetchProject } from "@/app/features/project/projectSlice";
import { useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import ProjectHeader, {
    ProjectHeaderProps,
} from "@/components/(project)/header/Header";
import ProjectInfos, {
    ProjectInfosProps,
} from "@/components/(project)/main/info/Info";
import ProjectProgress, {
    ProjectProgressProps,
} from "@/components/(project)/main/progress/Progress";
import ProjectMembers, {
    ProjectMembersProps,
} from "@/components/(project)/main/members/Members";
import ProjectTasks, {
    ProjectTasksProps,
} from "@/components/(project)/main/tasks/Tasks";

interface ProjectProps {
    header: ProjectHeaderProps;
    infos: ProjectInfosProps;
    progress: ProjectProgressProps;
    members: ProjectMembersProps;
    projectId: string;
}

const Project: React.FC<ProjectProps> = ({
    header,
    infos,
    progress,
    members,
    projectId,
}) => {
    return (
        <section>
            <ProjectHeader {...header} />
            <ProjectInfos {...infos} />
            <ProjectProgress {...progress} />
            <ProjectMembers {...members} />
            <ProjectTasks projectId={projectId} />
        </section>
    );
};

export default function ProjectPage() {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { projectId } = params;

    const { currentProject, loading, error } = useSelector(
        (state: RootState) => state.project,
    );

    useEffect(() => {
        if (projectId && typeof projectId === "string") {
            dispatch(fetchProject(projectId));
        }
    }, [dispatch, projectId]);

    if (loading) return <p>درحال بارگذاری ...</p>;
    if (error) return <p>{error.msg || error.message}</p>;

    return (
        <section className="relative top-24">
            {currentProject ? (
                <>
                    <Project
                        header={{ ...currentProject }}
                        infos={{
                            ...currentProject,
                        }}
                        progress={{ ...currentProject }}
                        members={{ ...currentProject }}
                        projectId={projectId}
                    />
                </>
            ) : (
                <p>پروژه‌‌ای یافت نشد.</p>
            )}
        </section>
    );
}
