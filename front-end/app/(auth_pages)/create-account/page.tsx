"use client";

import * as Yup from "yup";
import DynamicForm from "@/components/form/DynamicForm";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/react";
import Head from "next/head";
import { useState } from "react";

export default function CreateAccountPage() {
  const [profileImage, setProfileImage] = useState(null);

  const accountFields = [
    {
      name: "name",
      label: "نام",
      type: "text",
      icon: null,
      placeholder: "نام  خود را وارد کنید",
      validation: Yup.string().required("نام اجباری است"),
    },
    {
      name: "bio",
      label: "بیوگرافی",
      type: "text",
      icon: null,
      placeholder: "چند کلمه درباره خودتان",
      validation: Yup.string(),
    },
  ];

  const test = () => {
    console.log(true);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex items-center justify-center w-96">
      <Head>
        <title>ساخت حساب</title>
      </Head>
      <Card className="max-w-md w-full shadow-lg rounded-3xl" shadow="lg">
        <CardBody className="p-8">
          <h2 className="text-center text-4xl font-bold text-gray-300 my-4">
            <span className="grad-bg">تکمیل حساب</span>
          </h2>

          <div className="flex justify-center my-6">
            <label htmlFor="profileImageInput" className="cursor-pointer">
              <div
                className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden"
                style={{
                  backgroundImage: `url(${profileImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!profileImage && (
                  <span className="text-gray-500 text-sm">آپلود عکس</span>
                )}
              </div>
              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </label>
          </div>

          <DynamicForm
            fields={accountFields}
            onSubmit={test}
            btn={
              <Button
                fullWidth
                type="submit"
                className="bg-greenDark"
                variant="shadow"
              >
                ساخت حساب
              </Button>
            }
          />
        </CardBody>
      </Card>
    </div>
  );
}
