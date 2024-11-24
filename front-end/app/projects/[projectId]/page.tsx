/* eslint-disable prettier/prettier */
"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProject,
    completeTask,
    toggleCompleteTask,
    toggleTaskCompletion,
} from "../../features/project/projectSlice";
import { AppDispatch, RootState } from "../../store";
import { Avatar } from "@nextui-org/avatar";
import {
    ArrowLeftIcon,
    BoxsIcon,
    Calendar,
    CalendarDays,
    CheckIcon,
    ClockIcon,
    GroupIcon,
    InfoIcon,
    OwnerIcon,
} from "@/components/icons/icons";
import PersianDate from "@/components/persian-date/PersianDate";
import { Progress } from "@nextui-org/progress";
import Link from "next/link";
import Carousel from "@/components/task-carousel/TaskCarousel";
import { Button } from "@nextui-org/button";

type TaskProps = {
    _id: string;
    title: string;
    description: string;
    startDate: string;
    endDate?: string;
    assignee: string;
    isComplete: boolean;
};

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

interface MemberAvatarProps extends Omit<MemberProps, "avatar"> {
    avatar?: string;
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

const MemberAvatar: React.FC<MemberAvatarProps> = ({ avatar, username }) => (
    <li>
        <Avatar
            src={`/imgs/avatars/${avatar}`}
            alt={`${username}s avatar`}
            radius="full"
            size="lg"
            className="w-16 h-16"
            isBordered={true}
        />
    </li>
);

const Task: React.FC<TaskProps & { onComplete: (taskId: string) => void }> = ({
    _id,
    title,
    description,
    startDate,
    endDate,
    assignee,
    isComplete,
    onComplete,
}) => (
    <li className="bg-grayDark w-[20rem] h-[14.5rem] p-4 border-1 border-zinc-700 rounded-[2.5rem]">
        <header className="">
            <h4 className="font-bold text-2xl">{title}</h4>
            <p>{description}</p>
        </header>
        <main className="flex items-center justify-between my-4">
            <span className="bg-zinc-700 border-1 border-zinc-500 p-2 rounded-full m-2">
                {PersianDate({ createdAt: startDate })}
            </span>
            <ArrowLeftIcon />
            <span className="bg-zinc-700 border-1 border-zinc-500 p-2 rounded-full m-2">
                {endDate ? PersianDate({ createdAt: endDate }) : "نامشخص"}
            </span>
        </main>
        <footer>
            <Button
                endContent={isComplete ? <CheckIcon /> : <ClockIcon />}
                fullWidth
                className="flex items-center text-lg"
                style={{ padding: "1.5rem" }}
                radius="full"
                variant="faded"
                color={isComplete ? "success" : "primary"}
                onClick={() => onComplete(_id)}
            >
                {isComplete ? "انجام شده" : "انجام دادم"}
            </Button>
        </footer>
    </li>
);

const Project: React.FC<
    ProjectProps & {
        onCompleteTask: (taskId: string) => void;
        showTasks: boolean;
    }
> = ({
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
    showTasks,
    onCompleteTask,
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
        <section className="flex flex-col justify-center items-center  relative top-20">
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

                <div className="bg-grayDark p-10 rounded-[2.5rem] border-1 border-zinc-700">
                    <Progress
                        value={progress}
                        label={`میزان پیشرفت پروژه`}
                        showValueLabel={true}
                        color="success"
                    />
                </div>

                <div className="flex justify-between items-center w-full">
                    <ul className="bg-grayDark border-1 border-zinc-700 flex mt-8 p-2 rounded-full">
                        {members.map((member, index) => (
                            <MemberAvatar key={index} {...member} />
                        ))}
                    </ul>
                    <Link
                        href={`/`}
                        className="bg-grayDark border-1 h-16 justify-center items-center border-zinc-700 flex mt-8 p-2 rounded-full"
                    >
                        <span className="ml-4">همه اعضا</span>
                        <ArrowLeftIcon />
                    </Link>
                </div>

                <div>
                    {showTasks ? (
                        <div>
                            <Carousel
                                items={tasks.map((task) => ({
                                    id: task._id,
                                    content: (
                                        <Task
                                            key={task._id}
                                            {...task}
                                            onComplete={() =>
                                                onCompleteTask(task._id)
                                            }
                                        />
                                    ),
                                }))}
                            />
                        </div>
                    ) : (
                        <p>شما دسترسی به مشاهده تسک‌ها را ندارید.</p>
                    )}
                </div>
                <div className="flex justify-between items-center w-full">
                    <ul className="bg-grayDark border-1 border-zinc-700 flex mt-8 p-2 rounded-full">
                        {members.map((member, index) => (
                            <MemberAvatar key={index} {...member} />
                        ))}
                    </ul>
                    <Link
                        href={`/`}
                        className="bg-grayDark border-1 h-16 justify-center items-center border-zinc-700 flex mt-8 p-2 rounded-full"
                    >
                        <span className="ml-4">همه اعضا</span>
                        <ArrowLeftIcon />
                    </Link>
                </div>
                <div className="flex justify-between items-center w-full">
                    <ul className="bg-grayDark border-1 border-zinc-700 flex mt-8 p-2 rounded-full">
                        {members.map((member, index) => (
                            <MemberAvatar key={index} {...member} />
                        ))}
                    </ul>
                    <Link
                        href={`/`}
                        className="bg-grayDark border-1 h-16 justify-center items-center border-zinc-700 flex mt-8 p-2 rounded-full"
                    >
                        <span className="ml-4">همه اعضا</span>
                        <ArrowLeftIcon />
                    </Link>
                </div>
            </main>
        </section>
    );
};

const ProjectPage = () => {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { projectId } = params;

    const { currentProject, loading, error, hasTaskAccess } = useSelector(
        (state: RootState) => state.project,
    );

    useEffect(() => {
        if (projectId && typeof projectId === "string") {
            dispatch(fetchProject(projectId));
        }
    }, [projectId, dispatch]);

    const handleCompleteTask = (taskId: string) => {
        dispatch(toggleCompleteTask(taskId));
    };

    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>{error.msg || error.message}</p>;

    return (
        <div>
            {currentProject ? (
                <>
                    <Project
                        key={`project-values`}
                        {...currentProject.project}
                        onCompleteTask={handleCompleteTask}
                        showTasks={hasTaskAccess}
                    />
                </>
            ) : (
                <p>پروژه‌ای پیدا نشد</p>
            )}
        </div>
    );
};

export default ProjectPage;
