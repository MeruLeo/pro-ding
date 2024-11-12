"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import {
  MiniCheckIcon,
  SignalIcon,
  WorkIcon,
  UserIcon,
  Calendar,
  CalendarDays,
} from "../icons/icons";

export default function StatusIsland() {
  const statusIslandItems = [
    {
      key: "project",
      description: "پروژه",
      icon: WorkIcon,
      label: "پروژه تستی",
    },
    {
      key: "owner",
      description: "مالک",
      icon: UserIcon,
      label: "امیرعلی الله‌وردی",
    },
    {
      key: "start_date",
      description: "تاریخ شروع",
      icon: Calendar,
      label: "۱۴۰۳/۱۱/۱۲",
    },
    {
      key: "end_date",
      description: "تاریخ پایان",
      icon: CalendarDays,
      label: "۱۴۰۴/۰۰/۰۰",
    },
  ];

  return (
    <div className="fixed left-1/2 -translate-x-1/2 mt-3 z-50">
      <Dropdown>
        <DropdownTrigger>
          <Button variant="faded" radius="full" startContent={SignalIcon}>
            جزیره وضعیت
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          disabledKeys={["project", "owner", "start_date", "end_date"]}
        >
          {statusIslandItems.map((item) => (
            <DropdownItem
              key={item.key}
              color="primary"
              variant="faded"
              description={item.description}
              startContent={item.icon}
            >
              {item.label}
            </DropdownItem>
          ))}
          <DropdownItem
            key="done-task"
            color="primary"
            variant="faded"
            endContent={MiniCheckIcon}
          >
            انجام داده شد
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
