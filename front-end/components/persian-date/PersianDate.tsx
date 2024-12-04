import React, { useEffect, useState } from "react";
import moment from "jalali-moment";

interface PersianDateProps {
    createdAt: string | undefined | null; // اجازه مقادیر نامعتبر
    className?: string; // کلاس CSS اختیاری
}

const PersianDate: React.FC<PersianDateProps> = ({ createdAt, className }) => {
    const [formattedDate, setFormattedDate] = useState<string>("");

    useEffect(() => {
        if (!createdAt) {
            // در صورت عدم وجود تاریخ، مقدار پیش‌فرض
            setFormattedDate("تاریخ نامعتبر");
            return;
        }

        // تابع تبدیل اعداد انگلیسی به فارسی
        const convertNumbersToPersian = (text: string): string => {
            const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
            return text.replace(/[0-9]/g, (digit) => persianNumbers[+digit]);
        };

        // تبدیل تاریخ به فرمت فارسی
        const convertToPersianDate = (isoDate: string): string => {
            const formattedDate = moment(isoDate, moment.ISO_8601, true) // بررسی فرمت ISO
                .locale("fa")
                .format("YYYY/MM/DD");
            return convertNumbersToPersian(formattedDate);
        };

        try {
            const date = convertToPersianDate(createdAt);
            setFormattedDate(date);
        } catch (error) {
            // در صورت خطا در پردازش تاریخ
            setFormattedDate("تاریخ نامعتبر");
        }
    }, [createdAt]);

    return <span className={className}>{formattedDate}</span>;
};

export default PersianDate;
