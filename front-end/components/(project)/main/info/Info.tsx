/* eslint-disable padding-line-between-statements */
import {
    BoxsIcon,
    CalendarDays,
    GroupIcon,
    InfoIcon,
    OwnerIcon,
    Calendar,
} from "@/components/icons/icons";
import PersianDate from "@/components/persian-date/PersianDate";
import PersianNumber from "@/components/persian-num/PersianNum";
import { MemberProps } from "@/types/project/members";
import React from "react";

/* eslint-disable prettier/prettier */
interface ProjectInfoProps {
    icon: JSX.Element;
    labelKey: string;
    value: any;
}
export interface ProjectInfosProps {
    status: string;
    owner: MemberProps;
    startDate: string;
    endDate: string;
    members: MemberProps[];
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ icon, labelKey, value }) => {
    return (
        <li className="bg-grayDark rounded-full border-1 border-zinc-700 w-[20rem]  flex justify-between items-center p-5">
            <div className="flex">
                {icon}
                <span className="mr-3 font-bold">{labelKey}</span>
            </div>
            <div>{value}</div>
        </li>
    );
};

const ProjectInfos: React.FC<ProjectInfosProps> = ({
    members,
    owner,
    status,
    startDate,
    endDate,
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
            value: <PersianDate createdAt={startDate} />,
        },
        {
            icon: <OwnerIcon />,
            labelKey: "مالک",
            value: owner.name,
        },
        {
            icon: <CalendarDays />,
            labelKey: "تاریخ پایان",
            value: <PersianDate createdAt={endDate} />,
        },
        {
            icon: <GroupIcon />,
            labelKey: "اعضا",
            value: <PersianNumber number={members?.length ?? 0} />,
        },
        {
            icon: <BoxsIcon />,
            labelKey: "اهمیت",
            value: "زیاد",
        },
    ];
    return (
        <div className="flex flex-col justify-center items-center">
            <ul className="py-0.5 my-6 grid grid-cols-2 gap-4">
                {projectInfos.map((projectInfo, index) => (
                    <ProjectInfo key={index} {...projectInfo} />
                ))}
            </ul>
        </div>
    );
};

export default ProjectInfos;
