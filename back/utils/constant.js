// @ts-check

const RANDOM = (min, max) => Math.floor(Math.random() * (max - min) + min);

const SCORING = {
  CATATAN: () => RANDOM(1, 5),
  MATERI: () => RANDOM(6, 10),
  TUGAS: () => RANDOM(11, 15),
  KARYA: () => RANDOM(16, 20),
  JURNALNASIONAL: () => RANDOM(21, 25),
  JURNALINTERNASIONAL: () => RANDOM(26, 30),
};
const FOLIO_CATEGORIES = Object.keys(SCORING);
const STUDY = ["TEKNIK INFORMATIKA", "SISTEM INFORMASI"];

module.exports = { FOLIO_CATEGORIES, SCORING, STUDY };
