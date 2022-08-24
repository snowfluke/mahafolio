// @ts-check

export default async function fetcher(endpoint, headers) {
  try {
    let response = await fetch(endpoint, headers);
    let json = await response.json();
    try {
      if (!json) {
        return { error: "Terjadi kesalahan - Tidak ditemukan!" };
      }
      return json;
    } catch (e) {
      console.error(e);
      return { error: e.message };
    }
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}
