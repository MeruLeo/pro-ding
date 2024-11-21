"use client";

import Image from "next/image";
import Link from "next/link";
import React, { ReactElement, useEffect } from "react";
import {
    UserIcon,
    InboxIcon,
    ChartIcon,
    LogoutIcon,
    ArrowLeftIcon,
} from "@/components/icons/icons";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/user/userSlice";
import PersianDate from "@/components/persian-date/PersianDate";

// --- ProfileHeader Props ---
interface ProfileHeaderProps {
    avatar: string;
    name: string;
    bio: string;
    createdAt: string;
}

// --- ProfileMainAction Props ---
interface ProfileMainActionProps {
    path: string;
    icon: React.ReactElement;
    label: string;
}

// --- Profile Header Component ---
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    avatar,
    name,
    bio,
    createdAt,
}) => (
    <header className="bg-grayDark flex flex-col justify-center items-center p-4 rounded-3xl m-1">
        <div className="absolute top-0 border-1 border-grayLight left-0 m-3 py-1 px-2 rounded-full bg-zinc-900">
            <span>
                <PersianDate createdAt={`${createdAt}`} />
            </span>
        </div>
        <div className=" rounded-full">
            <Image
                alt={`${name}'s avatar`}
                src={avatar || "/imgs/avatars/default.jpg"}
                width={120}
                height={120}
                className="rounded-full w-[120px] h-[120px]"
            />
        </div>
        <div>
            <h3 className="font-bold text-xl mt-4 mb-2">{name}</h3>
            <p className="py-2 px-4 bg-zinc-900 rounded-full w-full">{bio}</p>
        </div>
    </header>
);

// --- Profile Main Action Component ---
const ProfileMainAction: React.FC<ProfileMainActionProps> = ({
    icon,
    label,
    path,
}) => (
    <li className="w-full m-1 transition-all duration-200 hover:scale-95">
        <Link
            href={path}
            className="flex justify-between bg-zinc-900 items-center  p-6 rounded-3xl transition-all duration-200 hover:bg-zinc-800"
        >
            <div className="flex ">
                <span className="text-grayLight ml-3">{icon}</span>
                <h5 className="font-bold">{label}</h5>
            </div>
            <ArrowLeftIcon />
        </Link>
    </li>
);

// --- Profile Component ---
export default function Profile() {
    const dispatch = useDispatch<AppDispatch>();
    const { avatar, username, bio, loading, createdAt, error } = useSelector(
        (state: RootState) => state.user,
    );

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    // --- Default Avatar Handling ---
    const userAvatar = avatar
        ? `/imgs/avatars/${avatar}`
        : "/imgs/avatars/me.jpg";

    console.log(userAvatar);

    return (
        <div className="flex p-3 justify-center bg-grayDark rounded-[2rem] w-[30rem] items-stretch flex-col absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            {/* Profile Header */}
            <ProfileHeader
                avatar={userAvatar}
                name={username || "نام کاربری"}
                bio={bio || "بیو"}
                createdAt={"2024/11/11"}
            />

            {/* Profile Main Actions */}
            <ul className="flex flex-wrap justify-center">
                {profileMainActions.map((action, index) => (
                    <ProfileMainAction key={index} {...action} />
                ))}
            </ul>
        </div>
    );
}

// --- Profile Actions ---
const profileMainActions: ProfileMainActionProps[] = [
    {
        label: "حساب کاربری",
        icon: <UserIcon />,
        path: "profile/user-account",
    },
    {
        label: "صندوق ورودی",
        icon: <InboxIcon />,
        path: "profile/inbox",
    },
    {
        label: "فعالیت‌ها",
        icon: <ChartIcon />,
        path: "profile/activities",
    },
];
