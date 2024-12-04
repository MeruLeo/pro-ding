/* eslint-disable prettier/prettier */
import { ArrowLeftIcon } from "@/components/icons/icons";
import { MemberProps } from "@/types/project/members";
import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface ProjectMembersProps {
    members: MemberProps[];
}

const ProjectMembers: React.FC<ProjectMembersProps> = ({ members }) => {
    return (
        <div className="flex justify-between my-4 items-center">
            <ul className="flex p-2 border-1 border-zinc-700 rounded-full bg-grayDark items-center">
                {members.map((member, index) => (
                    <li key={index} className="flex flex-col">
                        <Avatar
                            src={`/imgs/avatars/${member.avatar}`}
                            alt={`${member.name}`}
                            size="lg"
                            className="w-[5rem] h-[5rem]"
                            isBordered
                        />
                    </li>
                ))}
            </ul>
            <Link
                href={`/members`}
                className="bg-blueDark w-32 border-1 border-zinc-700 flex justify-between items-center p-4 rounded-full"
            >
                همه اعضا
                <ArrowLeftIcon />
            </Link>
        </div>
    );
};

export default ProjectMembers;
