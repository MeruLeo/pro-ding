"use client";

import Image from "next/image";
import Link from "next/link";
import React, { ReactElement, useEffect } from "react";
import {
  UserIcon,
  InboxIcon,
  ChartIcon,
  LogoutIcon,
} from "@/components/icons/icons";
import { AppDispath, RootState } from "./../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/user/userSlice";

interface ProfileHeaderProps {
  avatar: string;
  name: string;
  bio: string;
}

interface ProfileMainActionProps {
  path: string;
  icon: ReactElement;
  label: string;
}

const profileMainActions = [
  {
    label: "حساب کاربری",
    icon: UserIcon,
    path: "/",
  },
  {
    label: "صندوق ورودی",
    icon: InboxIcon,
    path: "/",
  },
  {
    label: "فعالیت ها",
    icon: ChartIcon,
    path: "/",
  },
];

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ avatar, name, bio }) => (
  <header className="bg-grayDark flex flex-col justify-center items-center p-4 rounded-3xl m-1">
    <div className="bg-grayLight p-1 rounded-full">
      <Image
        alt={`${name}s avatar`}
        src={avatar}
        width={120}
        height={120}
        className="rounded-full"
      />
    </div>
    <div>
      <h3 className="font-bold text-xl mt-4 mb-2">{name}</h3>
      <p>{bio}</p>
    </div>
  </header>
);

const ProfileMainAction: React.FC<ProfileMainActionProps> = ({
  icon,
  label,
  path,
}) => (
  <li className="w-72 m-1">
    <Link
      href={path}
      className="flex flex-col justify-between items-center bg-grayDark p-4 rounded-3xl transition-all duration-200 hover:bg-zinc-800"
    >
      <span className="text-greenDark">{icon}</span>
      <h5 className="font-bold mt-2">{label}</h5>
    </Link>
  </li>
);

export default function Profile() {
  const dispatch = useDispatch<AppDispath>();
  const { avatar, username, bio, loading, error } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(username);

  return (
    <section>
      <ProfileHeader
        avatar={avatar || "/imgs/avatars/me.jpg"}
        name={username || "نام کاربری"}
        bio={bio || "بیو"}
      />
      <ul className="flex">
        {profileMainActions.map((action, index) => (
          <ProfileMainAction key={index} {...action} />
        ))}
      </ul>
    </section>
  );
}
