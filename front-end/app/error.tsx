"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error | { [key: string]: any }; // برای انواع مختلف خطا
    reset: () => void;
}) {
    // استخراج پیام خطا
    const errorMessage =
        error instanceof Error
            ? error.message // اگر نوع Error است
            : error.message || "خطای ناشناخته رخ داده است"; // در صورت ساختار متفاوت

    const componentStack = error._componentStack || null; // بررسی وجود استک خطا

    return (
        <div className="p-4 text-center">
            <h2 className="text-red-500 text-lg font-bold">
                مشکلی پیش آمده است
            </h2>
            <p className="text-gray-700 my-2">{errorMessage}</p>
            {componentStack && (
                <pre className=" p-2 rounded-md text-xs text-left max-h-48 overflow-auto">
                    {componentStack}
                </pre>
            )}
            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => reset()}
            >
                تلاش دوباره
            </button>
        </div>
    );
}
