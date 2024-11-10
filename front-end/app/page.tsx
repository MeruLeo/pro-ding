"use client";

import {
  CheckIcon,
  ClipboardIcon,
  DocIcon,
  TimeIcon,
} from "@/components/icons/icons";
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import Link from "next/link";
import React, { ReactElement } from "react";

type ProjectStateProps = {
  title: string;
  count: number;
  icon: ReactElement;
  orgColor: string;
  bgColor: string;
  path: string;
};

export default function Home() {
  const projectsStateCard = [
    {
      id: 1,
      title: "پروژه های انجام شده",
      count: 10,
      icon: CheckIcon,
      orgColor: "#22B95C",
      bgColor: "#254941",
      path: "/done",
      progress: 90, // درصد پیشرفت پروژه
    },
    {
      id: 2,
      title: "پروژه های درحال انجام",
      count: 10,
      icon: ClipboardIcon,
      orgColor: "#0DA5E9",
      bgColor: "#203C55",
      path: "/in-progress",
      progress: 70,
    },
    {
      id: 3,
      title: "پروژه های  بعدی",
      count: 10,
      icon: DocIcon,
      orgColor: "#FBBF24",
      bgColor: "#4F4838",
      path: "/upcoming",
      progress: 40,
    },
    {
      id: 4,
      title: "پروژه های تعویق شده",
      count: 10,
      icon: TimeIcon,
      orgColor: "#E24243",
      bgColor: "#4C2F3C",
      path: "/delayed",
      progress: 20,
    },
  ];

  const ProjectStateCard = ({
    title,
    count,
    icon,
    orgColor,
    bgColor,
    path,
  }: ProjectStateProps) => (
    <li
      style={{ backgroundColor: bgColor }}
      className="p-4 rounded-3xl transition-all duration-200 hover:scale-105 flex-1 m-2"
    >
      <Link href={path} className="">
        <header className="text-xl font-bold mb-4 flex items-center justify-between">
          <span>{title}</span>
          <span className="text-md font-bold " style={{ color: orgColor }}>
            {count}
          </span>
        </header>
        <main className="flex items-center">
          <span style={{ color: orgColor }} className="">
            {icon}
          </span>
        </main>
      </Link>
    </li>
  );

  const TasksProgressItem = ({
    progress,
    bgColor,
    orgColor,
  }: {
    progress: number;
    bgColor: string;
    orgColor: string;
  }) => (
    <Card
      className="sm:w-[240px] h-[240px] border-none flex flex-1 sm:m-2 my-2 w-full"
      style={{
        background: `linear-gradient(135deg, ${bgColor}, ${orgColor})`,
      }}
    >
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
          value={progress}
          strokeWidth={4}
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: "border-1 border-white/30",
            content: "text-white/90 text-small font-semibold",
          }}
          variant="bordered"
        >
          پیشرفت پروژه
        </Chip>
      </CardFooter>
    </Card>
  );

  const TasksProgressList = () => (
    <div className="flex justify-between items-center flex-wrap sm:flex-row flex-col">
      {projectsStateCard.map((project) => (
        <TasksProgressItem
          key={project.id}
          progress={project.progress}
          bgColor={project.bgColor}
          orgColor={project.orgColor}
        />
      ))}
    </div>
  );

  return (
    <section>
      <ul className="flex justify-between items-center flex-wrap">
        {projectsStateCard.map((project) => (
          <ProjectStateCard key={project.id} {...project} />
        ))}
      </ul>
      <TasksProgressList />
    </section>
  );
}
