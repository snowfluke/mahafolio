export const capitalize = (str) =>
  str
    .toLowerCase()
    .split(" ")
    .map((el) => el[0].toUpperCase() + el.substring(1))
    .join(" ");
