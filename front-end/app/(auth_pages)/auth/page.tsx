"use client";

// 1. ایمپورت‌های خارجی
import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import { Divider, Card, CardBody, Tabs, Tab, Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

// 2. ایمپورت‌های داخلی
import DynamicForm from "../../../components/form/DynamicForm";
import { LoginIcon, PlusIcon } from "../../../components/icons/icons";
import { AppDispatch } from "../../store";
import { login, register } from "../../features/auth/authSlice";

// تایپ‌های مربوط به مقادیر فرم‌ها
type LoginValues = {
  identifier: string;
  password: string;
};

type RegisterValues = {
  username: string;
  email: string;
  password: string;
  name: string;
};

// تایپ مربوط به فیلدها
type FieldType = {
  name: string;
  label: string;
  type: "number" | "text" | "password" | "email"; // شامل انواع مختلف
  icon?: JSX.Element;
  placeholder: string;
  validation: Yup.StringSchema<string, Yup.AnyObject>;
};

// فیلدهای فرم ورود
const loginFields: FieldType[] = [
  {
    name: "identifier",
    label: "نام کاربری یا ایمیل",
    type: "text",
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
    placeholder: "رمز عبور خود را وارد کنید",
    validation: Yup.string()
      .min(6, "حداقل ۶ کاراکتر لازم است")
      .required("رمز عبور اجباری است"),
  },
];

// فیلدهای فرم ثبت‌نام
const signUpFields: FieldType[] = [
  {
    name: "username",
    label: "نام کاربری",
    type: "text",
    placeholder: "نام کاربری خود را وارد کنید",
    validation: Yup.string().required("این فیلد اجباری است"),
  },
  {
    name: "name",
    label: "نام",
    type: "text",
    placeholder: "نام خود را وارد کنید",
    validation: Yup.string().required("نام اجباری است"),
  },
  {
    name: "email",
    label: "ایمیل",
    type: "email",
    placeholder: "ایمیل خود را وارد کنید",
    validation: Yup.string()
      .email("ایمیل نامعتبر است")
      .required("ایمیل اجباری است"),
  },
  {
    name: "password",
    label: "رمز عبور",
    type: "password",
    placeholder: "رمز عبور خود را وارد کنید",
    validation: Yup.string()
      .min(6, "حداقل ۶ کاراکتر لازم است")
      .required("رمز عبور اجباری است"),
  },
];

const AuthPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"login" | "sign-up">("login");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleAuth = async (values: LoginValues | RegisterValues) => {
    const action = selectedTab === "login" ? login : register;
    await dispatch(action({ values, router }));
  };

  return (
    <div className="flex justify-center w-full items-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <Head>
        <title>{selectedTab === "login" ? "ورود" : "ثبت نام"}</title>
      </Head>
      <Card className="max-w-md w-full shadow-lg rounded-3xl">
        <CardBody className="p-8">
          <h2 className="text-center text-4xl font-bold text-gray-300 my-4">
            {selectedTab === "login" ? "ورود به " : "ثبت نام در "}
            <span className="grad-bg">پرودینگ</span>
          </h2>
          <Tabs
            aria-label="Auth Tabs"
            fullWidth
            selectedKey={selectedTab}
            onSelectionChange={(key) =>
              setSelectedTab(key as "login" | "sign-up")
            }
            className="mb-4"
            radius="full"
          >
            <Tab key="login" title="ورود">
              <DynamicForm<LoginValues>
                fields={loginFields}
                onSubmit={handleAuth}
                btn={
                  <Button
                    fullWidth
                    icon={<LoginIcon />}
                    type="submit"
                    className="bg-greenDark"
                    variant="shadow"
                  >
                    ورود
                  </Button>
                }
              />
              <Link
                href="/forgot-password"
                className="text-greenDark my-4 text-center transition-all duration-200 hover:scale-95 flex justify-center items-center"
              >
                بازیابی رمز عبور
              </Link>
            </Tab>
            <Tab key="sign-up" title="ثبت نام">
              <DynamicForm<RegisterValues>
                fields={signUpFields}
                onSubmit={handleAuth}
                btn={
                  <Button
                    fullWidth
                    icon={PlusIcon}
                    type="submit"
                    className="bg-greenDark"
                    variant="shadow"
                  >
                    ثبت نام
                  </Button>
                }
              />
            </Tab>
          </Tabs>
          <Divider />
          <Link
            href="/"
            className="text-center text-sm mt-4 block text-greenDark"
          >
            بازگشت به صفحه اصلی
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default AuthPage;
