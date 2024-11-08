"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Head from "next/head";
import toast from "react-hot-toast";
import * as Yup from "yup";
import DynamicForm from "../../components/form/DynamicForm";
import NormalButton from "../../components/button/NormBtn";
import { LinkIcon, LoginIcon, PlusIcon } from "../../components/icons/icons";
import { Divider, Card, CardBody, Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";

// فیلدهای فرم ورود
const loginFields = [
  {
    name: "identifier",
    label: "نام کاربری یا ایمیل",
    type: "text",
    icon: null,
    placeholder: "نام کاربری یا ایمیل خود را وارد کنید",
    validation: Yup.string()
      .required("این فیلد اجباری است")
      .test(
        "is-username-or-email",
        "لطفا ایمیل یا نام کاربری معتبر وارد کنید",
        (value) =>
          !!value &&
          (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
            /^[a-zA-Z0-9_]+$/.test(value)),
      ),
  },
  {
    name: "password",
    label: "رمز عبور",
    type: "password",
    icon: null,
    placeholder: "رمز عبور خود را وارد کنید",
    validation: Yup.string()
      .min(6, "حداقل ۶ کاراکتر لازم است")
      .required("رمز عبور اجباری است"),
  },
];

// فیلدهای فرم ثبت‌نام
const signUpFields = [
  {
    name: "username",
    label: "نام کاربری",
    type: "text",
    icon: null,
    placeholder: "نام کاربری خود را وارد کنید",
    validation: Yup.string().required("این فیلد اجباری است"),
  },
  {
    name: "email",
    label: "ایمیل",
    type: "email",
    icon: null,
    placeholder: "ایمیل  خود را وارد کنید",
    validation: Yup.string().required("رمز عبور اجباری است"),
  },
  {
    name: "password",
    label: "رمز عبور",
    type: "password",
    icon: null,
    placeholder: "رمز عبور خود را وارد کنید",
    validation: Yup.string()
      .min(6, "حداقل ۶ کاراکتر لازم است")
      .required("رمز عبور اجباری است"),
  },
];

const AuthPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<React.Key>("login");
  const router = useRouter();

  const handleAuth = async (values: { [key: string]: any }) => {
    try {
      const endpoint =
        selectedTab === "login" ? "/v1/auth/login" : "/v1/auth/register";
      const response = await axios.post(
        `http://localhost:7227${endpoint}`,
        values,
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      toast.success("عملیات موفقیت‌آمیز بود");
      // router.push("/"); // هدایت به صفحه اصلی
    } catch (err: any) {
      toast.error("خطایی رخ داد.");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Head>
        <title>{selectedTab === "login" ? "ورود" : "ثبت نام"}</title>
      </Head>
      <Card className="max-w-md w-full shadow-lg rounded-3xl" shadow="lg">
        <CardBody className="p-8">
          <h2 className="text-center text-4xl font-bold text-gray-300 my-4">
            {selectedTab === "login" ? "ورود به " : "ثبت نام در "}
            <span className="grad-bg">پرودینگ</span>
          </h2>
          <Tabs
            aria-label="Auth Tabs"
            fullWidth
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
            className="mb-4"
            radius="full"
          >
            <Tab key="login" title="ورود">
              <DynamicForm
                fields={loginFields}
                onSubmit={handleAuth}
                btn={
                  <NormalButton
                    fullWidth
                    title="ورود"
                    icon={LoginIcon}
                    type="submit"
                    color="warning"
                    variant="shadow"
                  />
                }
              />
              <Link
                href="/forgot-password"
                className="text-yellow-500 my-4 text-center transition-all duration-200 hover:scale-95 flex justify-center items-center"
              >
                بازیابی رمز عبور {LinkIcon}
              </Link>
            </Tab>
            <Tab key="sign-up" title="ثبت نام">
              <DynamicForm
                fields={signUpFields}
                onSubmit={handleAuth}
                btn={
                  <NormalButton
                    fullWidth
                    title="ثبت نام"
                    icon={PlusIcon}
                    type="submit"
                    color="warning"
                    variant="shadow"
                  />
                }
              />
            </Tab>
          </Tabs>
          <Divider />
          <Link
            href="/"
            className="text-center text-sm mt-4 block text-yellow-500"
          >
            بازگشت به صفحه اصلی
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default AuthPage;
