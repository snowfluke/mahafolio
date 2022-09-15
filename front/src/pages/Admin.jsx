import { onMount } from "solid-js";
import { useSignin } from "../hooks/useSignin";
import Button from "../components/form/button";
import ErrorIndicator from "../components/form/errorindicator";
import Input from "../components/form/input";

import Loading from "../components/loading";
import LoginCard from "../components/login/logincard";

function Admin() {
  onMount(() => {
    document.title = `Mahafolio - Admin`;
  });
  const { signinAdmin, isLoading, error } = useSignin();

  async function handleLogin(e) {
    e.preventDefault();
    let email = e.target.email.value,
      password = e.target.password.value;

    signinAdmin(email, password);
  }

  return (
    <section>
      <Show when={!isLoading()} fallback={<Loading />}>
        <LoginCard title={"Mahafolio Admin"}>
          <form onSubmit={handleLogin}>
            <Input type="email" name="email" placeholder="Masukkan email" />
            <Input
              type="password"
              name="password"
              placeholder="Masukkan kata sandi"
            />
            <Show when={error()}>
              <ErrorIndicator message={error()} />
            </Show>
            <Button title={"Masuk"} />
          </form>
        </LoginCard>
      </Show>
    </section>
  );
}

export default Admin;
