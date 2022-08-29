const BACKEND_URL = "http://localhost:4000";
const NAV_MENU = [
  { name: "Beranda", route: "/" },
  { name: "Klasemen", route: "/klasemen" },
];

const EMPTY_STR = "‎";

const STUDY = [
  { name: "Semua Jurusan", value: "" },
  { name: "Teknik Informatika", value: "TEKNIK INFORMATIKA" },
  { name: "Sistem Informasi", value: "SISTEM INFORMASI" },
];

const STUDY_NAME = STUDY.slice(1, STUDY.length).map((el) => el.value);

const SEMESTER = [
  { name: "Sepanjang masa", value: "" },
  { name: "Semester 1", value: 1 },
  { name: "Semester 2", value: 2 },
  { name: "Semester 3", value: 3 },
  { name: "Semester 4", value: 4 },
  { name: "Semester 5", value: 5 },
  { name: "Semester 6", value: 6 },
  { name: "Semester 7", value: 7 },
  { name: "Semester 8", value: 8 },
];

const SEMESTER2 = [
  { name: "Semua Semester", value: "" },
  { name: "Semester 1", value: 1 },
  { name: "Semester 2", value: 2 },
  { name: "Semester 3", value: 3 },
  { name: "Semester 4", value: 4 },
  { name: "Semester 5", value: 5 },
  { name: "Semester 6", value: 6 },
  { name: "Semester 7", value: 7 },
  { name: "Semester 8", value: 8 },
  { name: "Semester 9", value: 9 },
  { name: "Semester 10", value: 10 },
  { name: "Semester 11", value: 11 },
  { name: "Semester 12", value: 12 },
  { name: "Semester 13", value: 13 },
  { name: "Semester 14", value: 14 },
];

const TYPE = [
  { name: "Semua tipe", value: "" },
  { name: "Catatan", value: "CATATAN" },
  { name: "Tugas", value: "TUGAS" },
  { name: "Karya", value: "KARYA" },
  { name: "Jurnal", value: "JURNAL" },
  { name: "UTS", value: "UTS" },
  { name: "UAS", value: "UAS" },
];

export {
  BACKEND_URL,
  STUDY,
  SEMESTER,
  NAV_MENU,
  TYPE,
  SEMESTER2,
  STUDY_NAME,
  EMPTY_STR,
};
