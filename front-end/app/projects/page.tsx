/* eslint-disable prettier/prettier */
"use client";

import Link from "next/link";
import React from "react";
import { Progress } from "@nextui-org/progress";
import { Avatar } from "@nextui-org/avatar";
import { Button, Divider } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons";
import { WorkIconProjectPage } from "@/components/icons/icons";

interface ProjectProps {
    name: string;
    tag: string;
    progress: number;
    members: string[];
    startDate: string;
    link: string;
}

interface ProjectStatItemProps {
    count: number;
    label: string;
}

const ProjectStatItem: React.FC<ProjectStatItemProps> = ({ count, label }) => (
    <li className="flex flex-col items-center mx-4">
        <span className="text-2xl font-bold">{count}</span>
        <span>{label}</span>
    </li>
);

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
                    <p className="bg-blueDark rounded-full w-fit py-0.5 px-4">
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
                    {members.map((member, index) => (
                        <Avatar
                            key={index}
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            size="sm"
                            isBordered
                            radius="full"
                        />
                    ))}
                </ul>
                <div>{startDate}</div>
            </footer>
        </Link>
    </li>
);
const ProjectsPage = () => {
    const projectStats = [
        { count: 0, label: "پروژه فعال" },
        { count: 0, label: "پروژه تکمیل شده" },
        { count: 0, label: "پروژه در انتظار" },
        { count: 0, label: "کل پروژه‌ها" },
    ];

    const projects = [
        {
            name: "Project 1",
            tag: "Tag 1",
            progress: 50,
            members: ["Member 1", "Member 2"],
            startDate: "۱۴۰۳/۱۲/۱۲",
            link: "/project/1",
        },
        {
            name: "Project 1",
            tag: "Tag 1",
            progress: 50,
            members: ["Member 1", "Member 2"],
            startDate: "۱۴۰۳/۱۲/۱۲",
            link: "/project/1",
        },
        {
            name: "Project 1",
            tag: "Tag 1",
            progress: 50,
            members: ["Member 1", "Member 2"],
            startDate: "۱۴۰۳/۱۲/۱۲",
            link: "/project/1",
        },
        {
            name: "Project 2",
            tag: "Tag 2",
            progress: 75,
            members: ["Member 3", "Member 4"],
            startDate: "۱۴۰۳/۱۱/۱۵",
            link: "/project/2",
        },
        {
            name: "Project 3",
            tag: "Tag 3",
            progress: 30,
            members: ["Member 5", "Member 6"],
            startDate: "۱۴۰۳/۱۰/۰۱",
            link: "/project/3",
        },
        {
            name: "Project 4",
            tag: "Tag 4",
            progress: 90,
            members: ["Member 7", "Member 8"],
            startDate: "۱۴۰۳/۰۹/۲۰",
            link: "/project/4",
        },
        {
            name: "Project 5",
            tag: "Tag 5",
            progress: 90,
            members: ["Member 7", "Member 8"],
            startDate: "۱۴۰۳/۰۹/۲۰",
            link: "/project/5",
        },
    ];

    return (
        <section className="w-full flex flex-col justify-center items-center">
            <header className="mb-8">
                <div className="mt-36 bg-grayDark p-1 rounded-full w-fit">
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
                    <ul className="flex flex-wrap justify-between">
                        {projectStats.map((stat, index) => (
                            <ProjectStatItem
                                key={index}
                                count={stat.count}
                                label={stat.label}
                            />
                        ))}
                    </ul>
                </header>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {projects.map((project, index) => (
                        <Project
                            name={project.name}
                            tag={project.tag}
                            progress={project.progress}
                            members={project.members}
                            startDate={project.startDate}
                            link={project.link}
                            key={index}
                        />
                    ))}
                </ul>
            </main>
        </section>
    );
};

export default ProjectsPage;
