"use client";

import Link from "next/link";
import { ReactElement } from "react";
import { usePathname } from "next/navigation";
import { Tooltip } from "@nextui-org/react";

interface NavItemProps {
  path: string;
  icon: ReactElement;
}

const NavItem: React.FC<NavItemProps> = ({ path, icon }) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <li className="m-2">
      <Tooltip content={`خانه`}>
        <Link
          href={path}
          className={`w-12 h-12 border border-gray-100 hover:bg-zinc-700  rounded-[1rem] flex justify-center items-center text-gray-200 text-xl transition-transform duration-200 hover:bg-opacity-20 active:bg-opacity-30 hover:scale-105 active:scale-95 ${
            isActive
              ? "border-white bg-zinc-700 opacity-60 cursor-default  border-opacity-100 relative after:content-[''] after:absolute after:bottom-[-4px] after:w-5 after:h-2 after:bg-white after:rounded-full"
              : "border-opacity-10"
          }`}
          aria-label="Navigation Item"
        >
          {icon}
        </Link>
      </Tooltip>
    </li>
  );
};

export default function NavbarC(): ReactElement {
  const navItems: NavItemProps[] = [
    {
      path: "/",
      icon: (
        <i className="fi fi-tr-house-blank flex justify-center items-center"></i>
      ),
    },
    {
      path: "/projects",
      icon: (
        <i className="fi fi-tr-bullseye-arrow flex justify-center items-center"></i>
      ),
    },
    {
      path: "/employees",
      icon: (
        <i className="fi fi-tr-employees flex justify-center items-center"></i>
      ),
    },
    {
      path: "/profile",
      icon: (
        <i className="fi fi-tr-member-list flex justify-center items-center"></i>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-2 flex left-1/2 -translate-x-1/2">
      <ul className="flex justify-center items-center rounded-3xl backdrop-blur-lg border border-gray-100 border-opacity-10">
        {navItems.map((item, index) => (
          <NavItem key={index} {...item} />
        ))}
      </ul>
    </nav>
  );
}
