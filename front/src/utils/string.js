import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatDate = (time) =>
  dayjs(time).locale("id").format("DD MMMM YYYY");

export const timeFromNow = (time) => dayjs(time).locale("id").fromNow();

export const capitalize = (str) => {
  if (!str) return "";

  return str.length <= 3
    ? str
    : str
        .toLowerCase()
        .split(" ")
        .map((el) => el[0].toUpperCase() + el.substring(1))
        .join(" ");
};

export const refresher = () => Date.now().toString();

export const elipsis = (str) =>
  str.length < 100 ? str : str.substring(0, 70) + "...";

export const wordsCase = (str) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((el) => el[0].toUpperCase() + el.substring(1))
    .join(" ");
};

export const titleCase = (str) => {
  if (!str) return "";
  return str[0].toUpperCase() + str.substring(1);
};

export const abbreviate = (str) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((el) => el[0])
    .join("");
};
