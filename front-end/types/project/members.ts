/* eslint-disable prettier/prettier */
export type TaskProps = {
    _id: string;
    title: string;
    description: string;
    startDate: string;
    endDate?: string;
    assignee: string;
    isComplete: boolean;
};

export interface MemberProps {
    name: string;
    avatar?: string;
    username: string;
    tasks: TaskProps[];
}
