// @ts-check

import { BACKEND_URL } from "./constant";

export default async function fetcher(endpoint, headers) {
  try {
    let response = await fetch(BACKEND_URL + endpoint, headers);
    let json = await response.json();
    if (!json) {
      return { error: "Terjadi kesalahan!" };
    }

    return json;
  } catch (error) {
    return { error: error.message };
  }
}
