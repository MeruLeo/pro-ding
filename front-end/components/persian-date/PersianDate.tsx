import moment from "jalali-moment";

const PersianDate = ({ createdAt }: { createdAt: string }) => {
  const convertToPersian = (isoDate: string) => {
    return moment(isoDate).locale("fa").format("YYYY/MM/DD");
  };

  return convertToPersian(createdAt);
};

export default PersianDate;
