"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { MiniCheckIcon, SignalIcon } from "../icons/icons";

export default function StatusIsland() {
  const statusIslandItems = [
    {
      key: "project",
      label: "پروژه",
      icon: <i class="fi fi-sr-bullseye-arrow"></i>,
      description: "پروژه تستی",
    },
    {
      key: "owner",
      label: "مالک",
      icon: <i class="fi fi-sr-user"></i>,
      description: "امیرعلی الله‌وردی",
    },
    {
      key: "start_date",
      label: "تاریخ شروع",
      icon: <i class="fi fi-sr-calendar-lines-pen"></i>,
      description: "۱۴۰۳/۱۱/۱۲",
    },
    {
      key: "end_date",
      label: "تاریخ پایان",
      icon: <i class="fi fi-sr-challenge"></i>,
      description: "۱۴۰۴/۰۰/۰۰",
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
            >
              {item.icon} {item.label}
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
