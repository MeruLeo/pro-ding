"use client";

import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { AppDispatch, RootState } from "../../store";
import { fetchUser, uploadAvatar } from "@/app/features/user/userSlice";

interface UserAvatarProps {
  src: string | null;
  size: number;
  alt: string;
  onClick: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt, size, onClick }) => {
  const avatarSrc =
    src?.startsWith("/") || src?.startsWith("http")
      ? src
      : "/imgs/avatars/me.jpg";

  return (
    <Image
      alt={alt}
      src={avatarSrc}
      width={size}
      height={size}
      className="rounded-full cursor-pointer object-cover"
      onClick={onClick}
    />
  );
};

const UserAccount: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { username, email, bio, avatar, name, loading, error } = useSelector(
    (state: RootState) => state.user,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const isNew = !avatar; // بررسی اینکه آیا آواتار قبلاً وجود دارد یا نه
      dispatch(uploadAvatar({ file, isNew }));
    }
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p className="text-red-500">خطا: {error}</p>;

  const userAvatar = avatar
    ? `/imgs/avatars/${avatar}`
    : "/imgs/avatars/me.jpg";

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg max-w-sm mx-auto">
      <UserAvatar
        onClick={handleAvatarClick}
        src={userAvatar}
        alt={`${name || "کاربر"}'s avatar`}
        size={120}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="mt-4 text-center">
        <h2 className="text-xl font-bold">{name || "کاربر بدون نام"}</h2>
        <p className="text-sm text-gray-400">
          {username || "بدون نام‌کاربری"}@
        </p>
        <p className="mt-2">{bio || "بدون توضیحات"}</p>
        <p className="mt-2 text-gray-500">{email || "بدون ایمیل"}</p>
      </div>
    </div>
  );
};

export default UserAccount;
