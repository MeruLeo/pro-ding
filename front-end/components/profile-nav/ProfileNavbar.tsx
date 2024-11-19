"use client";

import React, { ReactElement } from "react";
import { usePathname } from "next/navigation";
import {
  UserIcon,
  InboxIcon,
  ChartIcon,
  BackIcon,
} from "@/components/icons/icons";
import Link from "next/link";

interface ProfileNavProps {
  title: string;
  icon: ReactElement;
  path: string;
}

const ProfileNavItem: React.FC<ProfileNavProps> = ({ title, icon, path }) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <li className={`w-full transition-all  duration-200 hover:scale-95 `}>
      <Link
        href={path}
        className={`flex justify-between   items-center p-4 m-1 rounded-full transition-all duration-200 hover:bg-zinc-800 ${
          isActive
            ? "bg-bgMain cursor-default hover:bg-bgMain hover:scale-105 border-1 border-zinc-700"
            : ""
        }`}
      >
        <div className="flex">
          <span className="text-grayLight">{icon}</span>
        </div>
      </Link>
    </li>
  );
};

const ProfileNav = () => {
  const profileNavItems: ProfileNavProps[] = [
    {
      title: "حساب کاربری",
      icon: <UserIcon />,
      path: "/profile/user-account",
    },
    {
      title: "صندوق ورودی",
      icon: <InboxIcon />,
      path: "/profile/inbox",
    },
    {
      title: "فعالیت‌ها",
      icon: <ChartIcon />,
      path: "/profile/activities",
    },
  ];

  return (
    <ul className="fixed right-4 bg-grayDark rounded-full border-1 border-zinc-700 top-1/2 -translate-y-1/2">
      <li className={`w-full transition-all duration-200 hover:scale-95 `}>
        <Link
          href={"#"}
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
          className={`flex justify-between  items-center p-4 m-1 rounded-full transition-all duration-200 hover:bg-zinc-800 `}
        >
          <div className="flex">
            <span className="text-grayLight">
              <BackIcon />
            </span>
          </div>
        </Link>
      </li>
      {profileNavItems.map((item, index) => (
        <ProfileNavItem key={index} {...item} />
      ))}
    </ul>
  );
};

export default ProfileNav;
