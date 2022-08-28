export const capitalize = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .map((el) => el[0].toUpperCase() + el.substring(1))
    .join(" ");

export const refresher = () =>
  Math.floor(Math.random() * 9999999999 + 1).toString();
