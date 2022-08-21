import { Link } from "@solidjs/router";
import { createSignal, Show } from "solid-js";

function Landing() {
  const [modalJurusan, setModalJurusan] = createSignal(true);
  const [modalTime, setModalTime] = createSignal(true);

  return (
    <section>
      <div className="flex items-center justify-center sm:justify-end space-x-4 responsive-text">
        <div>
          <div class="dropdown relative">
            <button
              class="dropdown-toggle flex items-center whitespace-nowrap bg-green px-4 md:px-6 py-2.5 leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
              type="button"
              id="dropdownJurusan"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setModalJurusan(!modalJurusan())}
            >
              Semua Jurusan
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" class="ml-4 w-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
              </svg>
            </button>
            <Show when={!modalJurusan()}>
              <ul class="dropdown-menu absolute z-50 float-left m-0 mt-1 w-full list-none rounded-lg border-none bg-white bg-clip-padding py-2 text-left shadow-lg" aria-labelledby="dropdownJurusan">
                <li>
                  <a class="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4 text-xs md:text-sm font-normal text-gray-700 hover:bg-gray-100" href="#">
                    Teknik Informatika
                  </a>
                </li>
                <li>
                  <a class="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4 text-xs md:text-sm font-normal text-gray-700 hover:bg-gray-100" href="#">
                    Sistem Informasi
                  </a>
                </li>
              </ul>
            </Show>
          </div>
        </div>
        <div>
          <div class="dropdown relative">
            <button
              class="dropdown-toggle flex items-center whitespace-nowrap bg-green px-4 md:px-6 py-2.5 leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
              type="button"
              id="dropdownTime"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setModalTime(!modalTime())}
            >
              Sepanjang Waktu
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" class="ml-4 w-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
              </svg>
            </button>
            <Show when={!modalTime()}>
              <ul class="dropdown-menu absolute z-50 float-left m-0 mt-1 w-full list-none rounded-lg border-none bg-white bg-clip-padding py-2 text-left shadow-lg" aria-labelledby="dropdownTime">
                <li>
                  <a class="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4    text-xs md:text-sm font-normal text-gray-700 hover:bg-gray-100" href="#">
                    Semester 1
                  </a>
                </li>
                <li>
                  <a class="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4  text-xs md:text-sm font-normal text-gray-700 hover:bg-gray-100" href="#">
                    Semester 2
                  </a>
                </li>
                <li>
                  <a class="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4 text-xs md:text-sm font-normal text-gray-700 hover:bg-gray-100" href="#">
                    Semester 3
                  </a>
                </li>
                <li>
                  <a class="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4 text-xs md:text-sm font-normal text-gray-700 hover:bg-gray-100" href="#">
                    Semester 4
                  </a>
                </li>
                <li>
                  <a class="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4 text-xs md:text-sm font-normal text-gray-700 hover:bg-gray-100" href="#">
                    Semester 5
                  </a>
                </li>
              </ul>
            </Show>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-10 justify-items-stretch">
        <div className="col-start-2 justify-self-end">
          <div className="mt-14 -rotate-90">
            <button className="responsive-text r-4 border-l-2 border-r-2 bg-white tracking-widest font-semibold text-green py-2 px-10">Bagikan</button>
          </div>
        </div>
        <div className="col-start-3 -ml-8 col-end-13">
          <div>
            <div className="relative bg-white px-6 pt-14 pb-8 md:p-8 shadow-[0_10px_5px_-3px_rgb(0,0,0,0.1)]">
              <div className="absolute top-0 right-0 h-0 w-0 rotate-180 border-b-[50px] border-r-[50px] border-l-[0px] border-b-gray border-r-transparent border-l-transparent"></div>
              <div className="absolute top-0 right-0 h-0 w-0 border-b-[50px] border-r-[50px] border-t-[0px] border-b-slate-200 border-r-transparent border-l-transparent"></div>
              <div>
                <span className="responsive-text">Klasemen perolehan poin mahafolio:</span>
                <table className="table-fixed overflow-x-scroll my-4 w-full responsive-text">
                  <tbody>
                    <Link href="#" className="table-row border-b border-slate-700/50">
                      <td className="md:w-[10%] lg:w-[5%] w-[15%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center bg-emas text-white border-none">
                          <span className="mx-auto px-2 text-center truncate">1</span>
                        </div>
                      </td>
                      <td className="pl-3 md:w-[80%] lg:w-[85%] w-[65%]">
                        Willy Setiawan
                        <span className="ml-2">👑</span>
                      </td>
                      <td className="text-right lg:w-[10%] w-[20%]">
                        <span>1200</span>pts
                      </td>
                    </Link>
                    <Link href="#" className="table-row border-b border-slate-700/50">
                      <td className="md:w-[10%] lg:w-[5%] w-[15%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center bg-perak text-white border-none">
                          <span className="mx-auto px-2 text-center truncate">2</span>
                        </div>
                      </td>
                      <td className="pl-3 md:w-[80%] lg:w-[85%] w-[65%]">Diky Setiawan</td>
                      <td className="text-right lg:w-[10%] w-[20%]">
                        <span>1190</span>pts
                      </td>
                    </Link>
                    <Link href="#" className="table-row border-b border-slate-700/50">
                      <td className="md:w-[10%] lg:w-[5%] w-[15%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center bg-perunggu text-white border-none">
                          <span className="mx-auto px-2 text-center truncate">3</span>
                        </div>
                      </td>
                      <td className="pl-3 md:w-[80%] lg:w-[85%] w-[65%]">Henky Fajar Syafani</td>
                      <td className="text-right lg:w-[10%] w-[20%]">
                        <span>1150</span>pts
                      </td>
                    </Link>
                    <Link href="#" className="table-row border-b border-slate-700/50">
                      <td className="md:w-[10%] lg:w-[5%] w-[15%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center truncate">4</span>
                        </div>
                      </td>
                      <td className="pl-3 md:w-[80%] lg:w-[85%] w-[65%]">Awal Ariansyah</td>
                      <td className="text-right lg:w-[10%] w-[20%]">
                        <span>1100</span>pts
                      </td>
                    </Link>
                    <Link href="#" className="table-row border-b border-slate-700/50">
                      <td className="md:w-[10%] lg:w-[5%] w-[15%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center truncate">5</span>
                        </div>
                      </td>
                      <td className="pl-3 md:w-[80%] lg:w-[85%] w-[65%]">Imam Fahrudin</td>
                      <td className="text-right lg:w-[10%] w-[20%]">
                        <span>1090</span>pts
                      </td>
                    </Link>
                    <Link href="#" className="table-row border-b border-slate-700/50">
                      <td className="md:w-[10%] lg:w-[5%] w-[15%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center truncate">6</span>
                        </div>
                      </td>
                      <td className="pl-3 md:w-[80%] lg:w-[85%] w-[65%]">Fadhli Cuk</td>
                      <td className="text-right lg:w-[10%] w-[20%]">
                        <span>1050</span>pts
                      </td>
                    </Link>
                    <Link href="#" className="table-row border-b border-slate-700/50">
                      <td className="md:w-[10%] lg:w-[5%] w-[15%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center truncate">7</span>
                        </div>
                      </td>
                      <td className="pl-3 md:w-[80%] lg:w-[85%] w-[65%]">Maknum Munib</td>
                      <td className="text-right lg:w-[10%] w-[20%]">
                        <span>1040</span>pts
                      </td>
                    </Link>
                    <Link href="#" className="table-row border-b border-slate-700/50">
                      <td className="md:w-[10%] lg:w-[5%] w-[15%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center truncate">8</span>
                        </div>
                      </td>
                      <td className="pl-3 md:w-[80%] lg:w-[85%] w-[65%]">Edgar Miko</td>
                      <td className="text-right lg:w-[10%] w-[20%]">
                        <span>1030</span>pts
                      </td>
                    </Link>
                    <Link href="#" className="table-row border-b border-slate-700/50">
                      <td className="md:w-[10%] lg:w-[5%] w-[15%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center truncate">9</span>
                        </div>
                      </td>
                      <td className="pl-3 md:w-[80%] lg:w-[85%] w-[65%]">Tiyol</td>
                      <td className="text-right lg:w-[10%] w-[20%]">
                        <span>1020</span>pts
                      </td>
                    </Link>
                    <Link href="#" className="table-row border-b border-slate-700/50">
                      <td className="md:w-[10%] lg:w-[5%] w-[15%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center truncate">10</span>
                        </div>
                      </td>
                      <td className="pl-3 md:w-[80%] lg:w-[85%] w-[65%]">Sari</td>
                      <td className="text-right lg:w-[10%] w-[20%]">
                        <span>1000</span>pts
                      </td>
                    </Link>
                  </tbody>
                </table>
                <div className="flex justify-end mt-6 responsive-text select-none">
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
export default Landing;
