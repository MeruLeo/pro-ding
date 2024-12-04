/* eslint-disable prettier/prettier */
import Image from "next/image";
import React from "react";

export interface ProjectHeaderProps {
    icon?: string;
    name: string;
    description: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
    icon,
    name,
    description,
}) => {
    return (
        <header className="flex flex-col justify-center items-center">
            <div>
                <Image
                    src={`/imgs/projects-icon/${icon}`}
                    alt={`${name}`}
                    width={200}
                    height={200}
                    className="rounded-full w-56 h-56 object-cover border-3 border-zinc-700"
                />
            </div>
            <div className="my-4">
                <h3 className="font-bold text-3xl mb-4">{name}</h3>
                <p className="bg-grayDark p-4 rounded-3xl font-bold">
                    {description}
                </p>
            </div>
        </header>
    );
};

export default ProjectHeader;
