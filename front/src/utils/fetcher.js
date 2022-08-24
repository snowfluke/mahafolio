// @ts-check

import { BACKEND_URL } from "./constant";

export default async function fetcher(endpoint, headers) {
  try {
    let response = await fetch(BACKEND_URL + endpoint, headers);
    let json = await response.json();
    try {
      if (!json) {
        return { error: "Terjadi kesalahan - Tidak ditemukan!" };
      }
      return json;
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}
