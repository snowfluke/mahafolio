import { useContext } from "solid-js";
import { UserContext } from "../contexts/UserContext";

export const useNotif = () => {
  const [, , notif, { showNotif }] = useContext(UserContext);

  return { notif, showNotif };
};
