import moment from "jalali-moment";

const PersianDate = ({ createdAt }: { createdAt: string }) => {
    const convertNumbersToPersian = (text: string) => {
        const englishNumbers = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
        ];
        const persianNumbers = [
            "۰",
            "۱",
            "۲",
            "۳",
            "۴",
            "۵",
            "۶",
            "۷",
            "۸",
            "۹",
        ];

        return text.replace(
            /[0-9]/g,
            (char) => persianNumbers[parseInt(char, 10)],
        );
    };

    const convertToPersian = (isoDate: string) => {
        const formattedDate = moment(isoDate).locale("fa").format("YYYY/MM/DD");
        return convertNumbersToPersian(formattedDate);
    };

    return <>{convertToPersian(createdAt)}</>;
};

export default PersianDate;
