import { useNavigate, useSearchParams } from "@solidjs/router";
import { createEffect, createSignal, onMount } from "solid-js";
import Button from "../components/form/button";
import ErrorIndicator from "../components/form/errorindicator";
import Input from "../components/form/input";

import Loading from "../components/loading";
import LoginCard from "../components/login/logincard";
import { useNotif } from "../hooks/useNotif";
import fetcher from "../utils/fetcher";
import { passwordSchema } from "../validations";

const fetchReset = async (id, token) =>
  await fetcher(encodeURI(`/api/mahasiswa/reset/${id}/${token}`), {
    method: "GET",
  });

const postNewPassword = async (id, token, password, password2) =>
  await fetcher(encodeURI(`/api/mahasiswa/reset/${id}/${token}`), {
    method: "POST",
    body: JSON.stringify({ password, password2 }),
    headers: {
      "Content-Type": "application/json",
    },
  });

function Reset() {
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { id, token } = searchParams;
  const navigate = useNavigate();
  const { showNotif } = useNotif();

  async function verifyToken(id, token) {
    try {
      const verified = await fetchReset(id, token);
      if (verified.error) throw Error(verified.error);

      setLoading(false);
    } catch (error) {
      navigate("/coretan", { replace: true });
      if ((error.message = "jwt expired"))
        return showNotif("error", "Token sudah kadaluarsa");
      showNotif("error", error.message);
    }
  }

  onMount(() => {
    if (!id || !token) return navigate("/coretan", { replace: true });

    verifyToken(id, token);
  });

  async function handleReset(e) {
    setLoading(true);
    e.preventDefault();
    let password = e.target.password.value,
      password2 = e.target.password2.value;

    if (password !== password2) {
      return setError("Kata sandi tidak cocok!");
    }

    try {
      await passwordSchema.validate({ password, password2 });
      const response = await postNewPassword(id, token, password, password2);

      if (response.error) {
        setLoading(false);
        setError(response.error);
        return;
      }

      setLoading(false);
      showNotif("success", "Berhasil mengubah kata sandi");
      navigate("/coretan", { replace: true });
    } catch (error) {
      console.log("acc");
      console.log(error);
      setLoading(false);
      if (error.name == "ValidationError") {
        return setError(error.errors[0]);
      }
      setError(error.error);
    }
  }

  return (
    <section>
      <Show when={!loading()} fallback={<Loading />}>
        <LoginCard title={"Atur ulang kata sandi"}>
          <form onSubmit={handleReset}>
            <Input
              type="password"
              name="password"
              placeholder="Masukkan kata sandi baru"
            />
            <Input
              type="password"
              name="password2"
              placeholder="Konfirmasi kata sandi baru"
            />
            <Show when={error()}>
              <ErrorIndicator message={error()} />
            </Show>
            <Button title={"Atur ulang"} />
          </form>
        </LoginCard>
      </Show>
    </section>
  );
}

export default Reset;
