"use client";

import {
  Select,
  SelectItem,
  Avatar,
  Chip,
  SelectedItems,
} from "@nextui-org/react";
import { users } from "./data";

type User = {
  id: number;
  name: string;
  role: string;
  team: string;
  status: string;
  age: string;
  avatar: string;
  email: string;
};

export default function App() {
  return (
    <Select
      items={users}
      label="مهارت های شما"
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Select a user"
      labelPlacement="outside"
      classNames={{
        base: "max-w-xs",
        trigger: "min-h-12 py-2",
      }}
      renderValue={(items: SelectedItems<User>) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key}>{item.data.name}</Chip>
            ))}
          </div>
        );
      }}
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.name}>
          <div className="flex gap-2 items-center">
            <Avatar
              alt={user.name}
              className="flex-shrink-0"
              size="sm"
              src={user.avatar}
            />
            <div className="flex flex-col">
              <span className="text-small">{user.name}</span>
              <span className="text-tiny text-default-400">{user.email}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
