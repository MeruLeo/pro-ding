/* eslint-disable prettier/prettier */
"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { Progress } from "@nextui-org/progress";
import { Avatar } from "@nextui-org/avatar";
import { Button, Divider } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons";
import { WorkIconProjectPage } from "@/components/icons/icons";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "../features/project/projectSlice";
import PersianDate from "@/components/persian-date/PersianDate";

interface ProjectMember {
    name: string;
    avatar?: string;
}

interface ProjectProps {
    name: string;
    tag: string;
    progress: number;
    members: ProjectMember[];
    startDate: string;
    link: string;
}

const Project: React.FC<ProjectProps> = ({
    name,
    tag,
    progress,
    members,
    startDate,
    link,
}) => (
    <li className="w-full transition-all flex justify-center items-center m-4 duration-200 hover:scale-100">
        <Link
            href={link}
            className="flex flex-col border-1 border-zinc-700 items-center p-4 transition-all rounded-[2.5rem] duration-200 bg-grayDark hover:scale-95 w-full max-w-xs"
        >
            <main className="w-full">
                <div className="flex flex-col justify-center items-center">
                    <h3 className="font-bold text-lg mb-2">{name}</h3>
                    <p
                        className={`rounded-full w-fit py-0.5 px-4 ${
                            {
                                "انجام شده": "bg-green-500 text-white",
                                "لغو شده": "bg-red-500 text-white",
                                "برنامه ریزی": "bg-blue-500 text-white",
                                تعویق: "bg-yellow-500 text-black",
                            }[tag] || "bg-gray-500 text-white"
                        }`}
                    >
                        {tag}
                    </p>
                </div>
                <div className="w-full mt-4">
                    <Progress
                        aria-label="project-progress"
                        value={progress}
                        dir="rtl"
                        label="پیشرفت"
                        color="success"
                        showValueLabel={true}
                    />
                </div>
            </main>
            <Divider className="my-4" />
            <footer className="w-full flex justify-between items-center">
                <ul className="flex">
                    {members.slice(0, 3).map((member, index) => (
                        <Avatar
                            key={index}
                            src={
                                `/imgs/avatars/${member.avatar}` ||
                                "https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            }
                            size="sm"
                            isBordered
                            radius="full"
                        />
                    ))}
                </ul>
                <div>{PersianDate({ createdAt: startDate })}</div>
            </footer>
        </Link>
    </li>
);

const ProjectsPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { projects, loading, error } = useSelector(
        (state: RootState) => state.project,
    );

    useEffect(() => {
        dispatch(fetchAllProjects());
    }, [dispatch]);

    if (loading) {
        return <p>در حال بارگذاری...</p>;
    }

    if (error) {
        const errorMessage =
            typeof error === "string"
                ? error
                : error.message || "An error occurred";
        return <p>خطا در بارگذاری پروژه‌ها: {errorMessage}</p>;
    }

    return (
        <section className="w-full flex flex-col justify-center items-center">
            <header className="mb-8">
                <div className="bg-grayDark p-1 rounded-full w-fit">
                    <input
                        type="text"
                        className="bg-transparent outline-none p-2 "
                        placeholder="جستجو ... "
                    />
                    <Button isIconOnly radius="full" variant="faded">
                        <SearchIcon />
                    </Button>
                </div>
            </header>
            <main className="w-full flex flex-col justify-center items-center">
                <header className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 flex justify-center items-center">
                        پروژه ها
                        <WorkIconProjectPage />
                    </h2>
                </header>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {projects.map((project, index) => (
                        <Project
                            key={index}
                            link={`/projects/${project._id}`}
                            members={project.members}
                            name={project.name}
                            progress={project.progress}
                            startDate={project.startDate}
                            tag={project.status}
                        />
                    ))}
                </ul>
            </main>
        </section>
    );
};

export default ProjectsPage;
