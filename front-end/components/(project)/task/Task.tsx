/* eslint-disable prettier/prettier */
import React from "react";
import { TaskProps } from "@/types/project/members";
import PersianDate from "@/components/persian-date/PersianDate";
import { Button } from "@nextui-org/button";
import { ArrowLeftIcon, CheckIcon, TimeIcon } from "@/components/icons/icons";

const Task: React.FC<TaskProps> = ({
    _id,
    title,
    description,
    assignee,
    isComplete,
    isActive,
    startDate,
    endDate,
    complete,
}) => {
    return (
        <div className="bg-grayDark border-1 my-4 border-zinc-700 p-4 rounded-[3rem] w-[20rem]">
            <header>
                <h4 className="text-2xl font-bold">{title}</h4>
                <p>{description}</p>
            </header>
            <main className="my-4">
                <span className="font-bold p-2 rounded-full">
                    {assignee.name}
                </span>
                <div className="flex justify-between items-center mt-4">
                    <span className=" bg-zinc-700 p-1 px-4 rounded-full">
                        {<PersianDate createdAt={startDate} />}
                    </span>
                    <ArrowLeftIcon />
                    <span className="bg-zinc-700 p-1 px-4 rounded-full">
                        <PersianDate createdAt={endDate} />
                    </span>
                </div>
            </main>
            <footer>
                <Button
                    fullWidth
                    radius="full"
                    size="lg"
                    color={isComplete ? "success" : "primary"}
                    variant="faded"
                    disabled={isComplete}
                    endContent={isComplete ? <CheckIcon /> : <TimeIcon />}
                    className="font-bold text-lg"
                >
                    {isComplete ? "انجام شده" : "در انتظار انجام"}
                </Button>
            </footer>
        </div>
    );
};

export default Task;
