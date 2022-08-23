// @ts-check

const RANDOM = (min, max) => Math.floor(Math.random() * (max - min) + min);

const SCORING = {
  CATATAN: () => RANDOM(1, 5),
  TUGAS: () => RANDOM(6, 10),
  KARYA: () => RANDOM(11, 13),
  JURNAL: () => RANDOM(14, 17),
  UTS: () => RANDOM(18, 25),
  UAS: () => RANDOM(26, 30),
};
const FOLIO_CATEGORIES = Object.keys(SCORING);
const STUDY = ["TEKNIK INFORMATIKA", "SISTEM INFORMASI"];

module.exports = { FOLIO_CATEGORIES, SCORING, STUDY };
