import { Progress } from "@nextui-org/progress";
import React from "react";

export interface ProjectProgressProps {
    progress: number;
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({ progress }) => {
    return (
        <div className="bg-grayDark p-8 rounded-[2rem] border-1 border-zinc-700">
            <Progress
                value={progress}
                showValueLabel
                color="success"
                label="میزان پیشرفت پروژه"
                className="font-bold"
            />
        </div>
    );
};

export default ProjectProgress;
