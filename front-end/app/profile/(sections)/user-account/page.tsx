"use client";

import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Input, Tabs, Tab, Divider } from "@nextui-org/react";
import {
  PhotoIcon,
  AtIcon,
  EmailIcon,
  TextIcon,
  UserSolidIcon,
  ArrowLeftIcon,
  LogoutIcon,
  SignalSlashIcon,
  TrashIcon,
} from "@/components/icons/icons";
import { AppDispatch, RootState } from "../../../store";
import {
  fetchUser,
  uploadAvatar,
  updateUser,
  clearUser,
  disabledUser,
  deleteUser,
} from "@/app/features/user/userSlice";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ActionWarnModal from "@/components/warn-modals/ActionWarnModal";

interface UserAvatarProps {
  src: string | null;
  size: number;
  alt: string;
  onClick: () => void;
}

interface UserSettingsProps {
  label: string;
  icon: ReactElement;
  onClick: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt, size, onClick }) => {
  const avatarSrc =
    src?.startsWith("/") || src?.startsWith("http")
      ? src
      : "/imgs/avatars/me.jpg";

  return (
    <div className="relative">
      <Image
        alt={alt}
        src={avatarSrc}
        width={size}
        height={size}
        className="rounded-full cursor-pointer object-cover w-[120px] h-[120px]"
        onClick={onClick}
      />
      <button
        onClick={onClick}
        className="absolute bottom-0 right-0 bg-bgLight text-bgMain p-1 rounded-full z-50"
      >
        <PhotoIcon />
      </button>
    </div>
  );
};

const UserInfoBox: React.FC<{
  label: string;
  value: string;
  onClick: () => void;
}> = ({ label, value, onClick }) => (
  <button
    onClick={onClick}
    className="p-4 flex flex-col my-2 w-full bg-grayDark text-white rounded-3xl shadow-md cursor-pointer hover:bg-zinc-800 transition hover:scale-95"
  >
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-lg font-bold">{value}</p>
  </button>
);

const UserSettings: React.FC<UserSettingsProps> = ({
  label,
  icon,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="flex items-center bg-grayDark border-1 border-zinc-700 w-full justify-between my-1 p-4 rounded-3xl gap-2 hover:bg-grayDark transition hover:scale-95"
  >
    <h5>{label}</h5>
    <span>{icon}</span>
  </button>
);

const UserAccount: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { username, email, bio, avatar, name, loading, error } = useSelector(
    (state: RootState) => state.user,
  );
  const [isClosing, setIsClosing] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionModalData, setActionModalData] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const router = useRouter();

  const handleModalClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState<{
    label: string;
    value: string;
    fieldName: string;
    icon: ReactElement;
  } | null>(null);
  const [updatedValue, setUpdatedValue] = useState<string>("");
  const [isWarnModalOpen, setIsWarnModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const isNew = true;
      dispatch(uploadAvatar({ file, isNew }));
    }
  };

  const handleBoxClick = (
    label: string,
    value: string,
    fieldName: string,
    icon: ReactElement,
  ) => {
    setCurrentField({ label, value, fieldName, icon });
    setUpdatedValue(value);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (currentField && updatedValue !== currentField.value) {
      dispatch(
        updateUser({
          field: currentField.fieldName,
          value: updatedValue,
        }),
      ).then(() => {
        setIsModalOpen(false);
      });
    } else {
      toast.error("تغییری اعمال نشده است");
    }
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p className="text-red-500">خطا: {error}</p>;

  const handleLogout = () => {
    dispatch(clearUser());
    router.push("/auth");
  };
  const handleDisable = () => {
    dispatch(disabledUser());
  };
  const handleDelete = () => {
    dispatch(deleteUser());
    router.push("/auth");
  };
  const handleActionModal = (
    title: string,
    message: string,
    onConfirm: () => void,
  ) => {
    setActionModalData({ title, message, onConfirm });
    setIsActionModalOpen(true);
  };

  const userFields = [
    {
      label: "نام",
      value: name || "بدون نام",
      fieldName: "name",
      icon: <UserSolidIcon />,
    },
    {
      label: "نام‌کاربری",
      value: `${username || "بدون نام‌کاربری"}`,
      fieldName: "username",
      icon: <AtIcon />,
    },
    {
      label: "بیو",
      value: bio || "بدون توضیحات",
      fieldName: "bio",
      icon: <TextIcon />,
    },
    {
      label: "ایمیل",
      value: email || "بدون ایمیل",
      fieldName: "email",
      icon: <EmailIcon />,
    },
  ];

  const settingsFields = [
    {
      label: "خروج از حساب",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
    {
      label: "غیرفعال کردن حساب",
      icon: <SignalSlashIcon />,
      onClick: () =>
        handleActionModal(
          "غیرفعال کردن حساب",
          "آیا مطمئن هستید که می‌خواهید حساب خود را غیرفعال کنید؟",
          () => {
            handleDisable();
            setIsActionModalOpen(false);
          },
        ),
    },
    {
      label: "حذف حساب",
      icon: <TrashIcon />,
      onClick: () =>
        handleActionModal(
          "حذف حساب",
          "آیا از حذف حساب خود اطمینان دارید؟ این عملیات غیرقابل بازگشت است.",
          () => {
            handleDelete();
            setIsActionModalOpen(false);
          },
        ),
    },
  ];

  const userAvatar = avatar
    ? `/imgs/avatars/${avatar}`
    : "/imgs/avatars/me.jpg";

  return (
    <>
      <Tabs aria-label="user-account-sections" size="lg" radius="full">
        <Tab key={`edit-info`} title={`ویرایش مشخصات`}>
          <div className="p-4 flex max-w-96 flex-col items-center text-white rounded-[2rem] w-96 mx-auto">
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
            {userFields.map((field) => (
              <UserInfoBox
                key={field.fieldName}
                label={field.label}
                value={field.value}
                icon={field.icon}
                onClick={() =>
                  handleBoxClick(
                    field.label,
                    field.value,
                    field.fieldName,
                    field.icon,
                  )
                }
              />
            ))}

            {(isModalOpen || isClosing) && (
              <div
                className={`fixed inset-0 z-50  bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center ${
                  isClosing ? "close-overlay" : "open-overlay"
                }`}
              >
                <div
                  className={`bg-grayDark ${
                    isClosing ? "close" : "open"
                  } rounded-[2rem] shadow-2xl w-[20rem] max-w-lg p-4 transition-all duration-300`}
                >
                  <span className="flex justify-center items-center mb-4 rounded-full">
                    {currentField?.icon}
                  </span>
                  <h3 className="text-lg font-bold mb-4">
                    ویرایش {currentField?.label}
                  </h3>
                  <Input
                    fullWidth
                    value={updatedValue}
                    onChange={(e) => setUpdatedValue(e.target.value)}
                    placeholder={currentField?.value}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-full w-full"
                      onClick={handleSave}
                    >
                      ذخیره
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-full w-full mr-2"
                      onClick={() => handleModalClose()}
                    >
                      لغو
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Tab>
        <Tab key={`sttings`} title={`تنظیمات حساب`}>
          <div>
            <Link
              href={`/profile`}
              className="bg-grayDark flex p-1 w-[25rem] transition hover:scale-95 border-1 border-zinc-700 rounded-full justify-between items-center"
            >
              <div className="flex items-center">
                <Image
                  src={userAvatar}
                  width={120}
                  height={120}
                  alt={`${name}s avatar`}
                  className="w-[70px] h-[70px] rounded-full"
                />
                <div className="flex flex-col mr-3 items-start">
                  <h4 className="text-xl font-bold">{name}</h4>
                  <p className="text-sm">{username}@</p>
                </div>
              </div>
              <ArrowLeftIcon />
            </Link>

            <ul className="mt-8">
              {settingsFields.map((field, index) => (
                <UserSettings key={index} {...field} />
              ))}
            </ul>
          </div>
          <ActionWarnModal
            isOpen={isActionModalOpen}
            title={actionModalData?.title || ""}
            message={actionModalData?.message || ""}
            onClose={() => setIsActionModalOpen(false)}
            onConfirm={actionModalData?.onConfirm || (() => {})}
          />
        </Tab>
      </Tabs>
    </>
  );
};

export default UserAccount;
