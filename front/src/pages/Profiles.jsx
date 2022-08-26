import { Link } from "@solidjs/router";
import { createSignal, Show } from "solid-js";

function Profiles() {
  const [modalTipe, setModalTipe] = createSignal(true);
  const [modalSemester, setModalSemester] = createSignal(true);

  return (
    <section>
      <div className="mb-10 space-y-2">
        <div className="flex justify-end items-center responsive-text">
          <span>wilisetiawan29@gmail.com</span>
        </div>
        <div className="flex justify-between space-x-4 h-30">
          <div className="flex flex-col md:w-[25%] responsive-text">
            <span className="text-green font-semibold text-4xl">10823pts</span>
            <span className="text-green font-semibold text-xl">
              Willy Setiawan
            </span>
          </div>

          <div
            class="hidden md:block bg-cover bg-center md:w-[60%] h-30"
            style="background-image: url(/src/assets/profile.png)"
          ></div>
          <div>
            <img src="/src/assets/profile.png" alt="Profil" className="w-32" />
          </div>
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div className="flex flex-col responsive-text">
            <span>Teknik Informatika</span>
            <span>Semester 6</span>
          </div>
          <div className="text-right md:text-left">
            <span className="italic responsive-text">
              Set your mind to be adaptive” Stoic wannabe. Nillionaire.
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 items-center justify-center sm:justify-start responsive-text lg:space-x-4">
        <div className="flex space-x-4">
          <div class="dropdown relative">
            <button
              class="dropdown-toggle flex items-center whitespace-nowrap bg-green px-4 md:px-6 py-2.5 leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
              type="button"
              id="dropdownSemester"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setModalSemester(!modalSemester())}
            >
              Semua Semester
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                class="ml-4 w-2"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                ></path>
              </svg>
            </button>
            <Show when={!modalSemester()}>
              <ul
                class="dropdown-menu absolute z-50 float-left m-0 mt-1 w-full list-none  border-none bg-white bg-clip-padding py-2 text-left shadow-lg"
                aria-labelledby="dropdownSemester"
              >
                <li>
                  <a
                    class="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4    text-xs md:text-sm font-normal text-gray-700 hover:bg-gray-100"
                    href="#"
                  >
                    Semester 1
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4  text-xs md:text-sm font-normal text-gray-700 hover:bg-gray-100"
                    href="#"
                  >
                    Semester 2
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4 text-xs md:text-sm font-normal text-gray-700 hover:bg-gray-100"
                    href="#"
                  >
                    Semester 3
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4 text-xs md:text-sm font-normal text-gray-700 hover:bg-gray-100"
                    href="#"
                  >
                    Semester 4
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4 text-xs md:text-sm font-normal text-gray-700 hover:bg-gray-100"
                    href="#"
                  >
                    Semester 5
                  </a>
                </li>
              </ul>
            </Show>
          </div>

          <div class="dropdown relative">
            <button
              class="dropdown-toggle flex items-center whitespace-nowrap bg-green px-4 md:px-6 py-2.5 leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
              type="button"
              id="dropdownJurusan"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setModalTipe(!modalTipe())}
            >
              Semua Tipe
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                class="ml-4 w-2"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                ></path>
              </svg>
            </button>
            <Show when={!modalTipe()}>
              <ul
                class="dropdown-menu absolute z-50 float-left m-0 mt-1 w-full list-none border-none bg-white bg-clip-padding py-2 text-left shadow-lg"
                aria-labelledby="dropdownJurusan"
              >
                <li>
                  <a
                    class="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4 text-xs md:text-sm font-normal text-gray-700 hover:bg-gray-100"
                    href="#"
                  >
                    Teknik Informatika
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4 text-xs md:text-sm font-normal text-gray-700 hover:bg-gray-100"
                    href="#"
                  >
                    Sistem Informasi
                  </a>
                </li>
              </ul>
            </Show>
          </div>
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Filter judul atau mata kuliah ..."
            className="text-center lg:text-left w-64 outline-none responsive-text truncate px-6 py-1.5 border-y-2 border-green"
          />
        </div>
      </div>
      <div className="grid grid-cols-12 mt-10 justify-items-stretch">
        <div className="col-start-1 col-end-13">
          <div>
            <div className="relative bg-white px-6 pt-14 pb-8 md:p-8 shadow-[0_10px_5px_-3px_rgb(0,0,0,0.1)]">
              <div className="absolute top-0 right-0 h-0 w-0 rotate-180 border-b-[50px] border-r-[50px] border-l-[0px] border-b-gray border-r-transparent border-l-transparent"></div>
              <div className="absolute top-0 right-0 h-0 w-0 border-b-[50px] border-r-[50px] border-t-[0px] border-b-slate-200 border-r-transparent border-l-transparent"></div>
              <div>
                <span className="responsive-text">
                  Menampilkan kemajuan perkuliahan di{" "}
                  <span className="font-semibold">“semua semester”</span> dan{" "}
                  <span className="font-semibold">“semua tipe”</span> :
                </span>
                <table className="table-fixed overflow-x-scroll my-4 w-full responsive-text">
                  <tbody>
                    <Link
                      href="#"
                      className="table-row border-b border-slate-700/50"
                    >
                      <td className="sm:w-[20%] md:w-[15%] lg:w-[10%] w-[40%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center font-semibold truncate">
                            10/07/2022
                          </span>
                        </div>
                      </td>
                      <td className="pl-3 sm:w-[80%] md:w-[85%] lg:w-[90%] w-[60%]">
                        Mock up desain hasil tahap analisis{" "}
                      </td>
                    </Link>
                    <Link
                      href="#"
                      className="table-row border-b border-slate-700/50"
                    >
                      <td className="sm:w-[20%] md:w-[15%] lg:w-[10%] w-[40%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center font-semibold truncate">
                            10/07/2022
                          </span>
                        </div>
                      </td>
                      <td className="pl-3 sm:w-[80%] md:w-[85%] lg:w-[90%] w-[60%]">
                        Gambaran ERD sistem perpustakaan{" "}
                      </td>
                    </Link>
                    <Link
                      href="#"
                      className="table-row border-b border-slate-700/50"
                    >
                      <td className="sm:w-[20%] md:w-[15%] lg:w-[10%] w-[40%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center font-semibold truncate">
                            10/07/2022
                          </span>
                        </div>
                      </td>
                      <td className="pl-3 sm:w-[80%] md:w-[85%] lg:w-[90%] w-[60%]">
                        Mock up desain hasil tahap analisis{" "}
                      </td>
                    </Link>
                    <Link
                      href="#"
                      className="table-row border-b border-slate-700/50"
                    >
                      <td className="sm:w-[20%] md:w-[15%] lg:w-[10%] w-[40%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center font-semibold truncate">
                            10/07/2022
                          </span>
                        </div>
                      </td>
                      <td className="pl-3 sm:w-[80%] md:w-[85%] lg:w-[90%] w-[60%]">
                        Mock up desain hasil tahap analisis{" "}
                      </td>
                    </Link>
                    <Link
                      href="#"
                      className="table-row border-b border-slate-700/50"
                    >
                      <td className="sm:w-[20%] md:w-[15%] lg:w-[10%] w-[40%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center font-semibold truncate">
                            10/07/2022
                          </span>
                        </div>
                      </td>
                      <td className="pl-3 sm:w-[80%] md:w-[85%] lg:w-[90%] w-[60%]">
                        Mock up desain hasil tahap analisis{" "}
                      </td>
                    </Link>
                    <Link
                      href="#"
                      className="table-row border-b border-slate-700/50"
                    >
                      <td className="sm:w-[20%] md:w-[15%] lg:w-[10%] w-[40%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center font-semibold truncate">
                            10/07/2022
                          </span>
                        </div>
                      </td>
                      <td className="pl-3 sm:w-[80%] md:w-[85%] lg:w-[90%] w-[60%]">
                        Mock up desain hasil tahap analisis{" "}
                      </td>
                    </Link>
                    <Link
                      href="#"
                      className="table-row border-b border-slate-700/50"
                    >
                      <td className="sm:w-[20%] md:w-[15%] lg:w-[10%] w-[40%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center font-semibold truncate">
                            10/07/2022
                          </span>
                        </div>
                      </td>
                      <td className="pl-3 sm:w-[80%] md:w-[85%] lg:w-[90%] w-[60%]">
                        Mock up desain hasil tahap analisis{" "}
                      </td>
                    </Link>
                    <Link
                      href="#"
                      className="table-row border-b border-slate-700/50"
                    >
                      <td className="sm:w-[20%] md:w-[15%] lg:w-[10%] w-[40%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center font-semibold truncate">
                            10/07/2022
                          </span>
                        </div>
                      </td>
                      <td className="pl-3 sm:w-[80%] md:w-[85%] lg:w-[90%] w-[60%]">
                        Mock up desain hasil tahap analisis{" "}
                      </td>
                    </Link>
                    <Link
                      href="#"
                      className="table-row border-b border-slate-700/50"
                    >
                      <td className="sm:w-[20%] md:w-[15%] lg:w-[10%] w-[40%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center font-semibold truncate">
                            10/07/2022
                          </span>
                        </div>
                      </td>
                      <td className="pl-3 sm:w-[80%] md:w-[85%] lg:w-[90%] w-[60%]">
                        Mock up desain hasil tahap analisis{" "}
                      </td>
                    </Link>
                    <Link
                      href="#"
                      className="table-row border-b border-slate-700/50"
                    >
                      <td className="sm:w-[20%] md:w-[15%] lg:w-[10%] w-[40%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center font-semibold truncate">
                            10/07/2022
                          </span>
                        </div>
                      </td>
                      <td className="pl-3 sm:w-[80%] md:w-[85%] lg:w-[90%] w-[60%]">
                        Mock up desain hasil tahap analisis{" "}
                      </td>
                    </Link>
                  </tbody>
                </table>
                <div className="flex justify-between mt-6 responsive-text select-none">
                  <nav aria-label="Page navigation">
                    <ul class="inline-flex -space-x-px">
                      <li>
                        <a href="#" class="py-2 px-3 leading-tight font-bold">
                          1
                        </a>
                      </li>
                      <li>
                        <a href="#" class="py-2 px-3 leading-tight">
                          2
                        </a>
                      </li>
                      <li>
                        <a href="#" class="py-2 px-3 leading-tight">
                          3
                        </a>
                      </li>
                    </ul>
                  </nav>

                  <span className="text-slate-700/70">Sinar Galaksi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Profiles;
