import { useContext } from "solid-js";
import { UserContext } from "../contexts/UserContext";

export const useModal = () => {
  const [, , , , modal, { showModal, closeModal }] = useContext(UserContext);

  return { modal, showModal, closeModal };
};
