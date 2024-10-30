"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Head from "next/head";
import toast from "react-hot-toast";

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier || !password) {
      toast.error("لطفا هر دو فیلد را پر کنید.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:7227/v1/auth/login", {
        identifier,
        password,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      toast.success("با موفقیت وارد شدید");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "در هنگام ورود خطایی رخ داد.");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Head>
        <title>ورود</title>
      </Head>
      <div className="w-full max-w-md p-8 shadow-lg">
        <h2 className=" font-bold mb-6 text-center text-gray-400 text-5xl">
          ورود به پرودینگ
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              ایمیل یا نام کاربری
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="ایمیل یا نام کاربری خود را وارد کنید"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              رمز عبور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="رمز عبور خود را وارد کنید"
            />
          </div>

          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
