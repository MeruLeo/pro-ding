/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client";

import Link from "next/link";
import React, { useState, ReactElement } from "react";
import {
    UserIcon,
    ArrowRightIcon,
    MenuIcon,
    SquaresIcon,
    TasksIcon,
    SharesIcon,
    SendCommentsIcon,
    PlusIcon,
} from "../icons/icons";
import { usePathname } from "next/navigation";
import { Divider } from "@nextui-org/react";

interface MainPathProps {
    path: string;
    icon: ReactElement;
    label: string;
}

const MainPath: React.FC<MainPathProps> = ({ path, icon, label }) => {
    const pathname = usePathname();
    const isActive = pathname === path;
    return (
        <li className="w-full transition-all duration-200 hover:scale-95">
            <Link
                href={path}
                className={`flex items-center p-4 w-56 rounded-full transition-all duration-200 -my-1 hover:bg-zinc-800 ${
                    isActive
                        ? "bg-blueDark cursor-default hover:bg-blueDark hover:scale-105 border-1 border-zinc-700"
                        : ""
                }`}
            >
                <span>{icon}</span>
                <span className="font-bold mr-3">{label}</span>
            </Link>
        </li>
    );
};

const ProjectSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const mainPaths = [
        {
            label: "همه پروژه ها",
            path: "/projects",
            icon: <SquaresIcon />,
        },
        {
            label: "پروژه های من",
            path: "/",
            icon: <UserIcon />,
        },
        {
            label: "تسک های من",
            path: "/",
            icon: <TasksIcon />,
        },
    ];
    const anotherPaths = [
        {
            label: "فایل های آپلودی",
            path: "/",
            icon: <SharesIcon />,
        },
        {
            label: "نظرات ارسالی",
            path: "/",
            icon: <SendCommentsIcon />,
        },
    ];

    return (
        <>
            <button
                className={`fixed top-4 p-3 border-2 border-zinc-700 shadow-2xl rounded-full bg-grayDark hover:scale-95 transition-all duration-300 ${
                    isOpen ? "right-72 " : "right-4 "
                }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <ArrowRightIcon /> : <MenuIcon />}
            </button>

            <nav
                className={`fixed top-0 h-screen rounded-t-[2.5rem] z-50 700 shadow-2xl mt-4 flex flex-col bg-grayDark text-white p-4 transition-all duration-300 ${
                    isOpen ? "right-0 w-64" : "-right-64"
                }`}
            >
                <ul className="flex flex-col gap-4">
                    {mainPaths.map((mainPath, index) => (
                        <MainPath key={index} {...mainPath} />
                    ))}
                </ul>
                <Divider className="my-4" />
                <ul className="flex flex-col gap-4">
                    <MainPath
                        key={`new`}
                        icon={<PlusIcon />}
                        label="پروژه جدید"
                        path="/"
                    />
                </ul>
                <Divider className="my-4" />
                <ul className="flex flex-col gap-4">
                    {anotherPaths.map((mainPath, index) => (
                        <MainPath key={index} {...mainPath} />
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default ProjectSidebar;
