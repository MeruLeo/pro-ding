/* eslint-disable prettier/prettier */
export type TaskProps = {
    _id: string;
    title: string;
    description: string;
    startDate: string;
    isActive: boolean;
    endDate?: string;
    assignee: MemberProps;
    isComplete: boolean;
    complete: () => void;
};

export interface MemberProps {
    name: string;
    avatar?: string;
    username: string;
    tasks: TaskProps[];
}
