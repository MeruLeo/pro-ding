/* eslint-disable prettier/prettier */
"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../../features/project/projectSlice";
import { AppDispatch, RootState } from "../../store";
import { Avatar } from "@nextui-org/avatar";
import {
    BoxsIcon,
    Calendar,
    CalendarDays,
    GroupIcon,
    InfoIcon,
    OwnerIcon,
} from "@/components/icons/icons";
import PersianDate from "@/components/persian-date/PersianDate";
import { Progress } from "@nextui-org/progress";

interface TaskProps {
    title: string;
    startDate: string;
    endDate?: string;
    assignee: string;
    isComplete: boolean;
}

interface MemberProps {
    name: string;
    avatar?: string;
    username: string;
    tasks: TaskProps[];
}

interface ProjectProps {
    icon: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    members: MemberProps[];
    progress: number;
    owner: MemberProps;
    status: string;
    tasks: TaskProps[];
}

const ProjectInfo = ({
    icon,
    labelKey,
    value,
}: {
    icon: JSX.Element;
    labelKey: string;
    value: any;
}) => (
    <li className="bg-grayDark rounded-full border-1 border-zinc-700 w-[20rem]  flex justify-between items-center p-5">
        <div className="flex">
            {icon}
            <span className="mr-3 font-bold">{labelKey}</span>
        </div>
        <div>{value}</div>
    </li>
);

const Project: React.FC<ProjectProps> = ({
    name,
    tasks,
    status,
    description,
    owner,
    endDate,
    startDate,
    icon,
    members,
    progress,
}) => {
    const projectInfos = [
        {
            icon: <InfoIcon />,
            labelKey: "وضعیت",
            value: status,
        },
        {
            icon: <Calendar />,
            labelKey: "تاریخ شروع",
            value: PersianDate(startDate),
        },
        {
            icon: <CalendarDays />,
            labelKey: "تاریخ پایان",
            value: PersianDate(endDate),
        },
        {
            icon: <OwnerIcon />,
            labelKey: "مالک",
            value: "Amirali",
        },
        {
            icon: <GroupIcon />,
            labelKey: "اعضا",
            value: members.length,
        },
        {
            icon: <BoxsIcon />,
            labelKey: "اهمیت",
            value: `زیاد`,
        },
    ];

    return (
        <section className="flex flex-col justify-center items-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-[45rem]">
            <header className="flex flex-col justify-center items-center">
                <Avatar
                    src={`/imgs/projects-icon/${icon}`}
                    radius="full"
                    style={{ width: "10rem", height: "10rem" }}
                />
                <div className="mt-6">
                    <h2 className="text-5xl  font-bold mb-2">{name}</h2>
                    <p className="text-2xl font-bold">{description}</p>
                </div>
            </header>
            <main className="">
                <div className="flex flex-col justify-center items-center">
                    <ul className="py-0.5 my-6 grid grid-cols-2 gap-4">
                        {projectInfos.map((projectInfo, index) => (
                            <ProjectInfo key={index} {...projectInfo} />
                        ))}
                    </ul>
                </div>

                <div className="bg-grayDark p-10 rounded-[2.5rem]">
                    <Progress
                        value={progress}
                        label={`میزان پیشرفت پروژه`}
                        showValueLabel={true}
                        color="success"
                    />
                </div>
            </main>
        </section>
    );
};

const ProjectPage = () => {
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
    }, [projectId, dispatch]);

    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطا: {error}</p>;

    return (
        <div>
            {currentProject ? (
                <>
                    <Project
                        key={`project-values`}
                        {...currentProject.project}
                    />
                </>
            ) : (
                <p>پروژه‌ای پیدا نشد</p>
            )}
        </div>
    );
};

export default ProjectPage;
