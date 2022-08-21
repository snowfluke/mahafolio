import { Link } from "@solidjs/router";

function Home() {
  return (
    <section>
      <div className="grid grid-cols-12">
        <div className="col-start-1 md:col-start-2 col-end-13 md:col-end-12">
          <input type="text" className="px-4 md:px-8 py-4 outline-green rounded w-full responsive-text truncate" placeholder="Cari kemajuan mahasiswa berdasarkan nama atau nim..." />
        </div>
      </div>
      <div className="grid grid-cols-12 mt-10 justify-items-stretch">
        <div className="col-start-2 justify-self-end">
          <div className="mt-12 -rotate-90">
            <button className="responsive-text r-4 border-l-2 border-r-2 bg-white tracking-widest font-semibold text-green py-2 px-10">Masuk</button>
          </div>
        </div>
        <div className="col-start-3 -ml-8 col-end-13">
          <div className="flex items-center space-x-8">
            <button className="bg-green responsive-text text-white font-semibold px-10 py-2 tracking-widest">Cari</button>
            <span className="responsive-text">
              Selamat datang kembali,{" "}
              <Link href="#" className="underline text-green underline-offset-2">
                wilisetiawan087@gmail.com
              </Link>
            </span>
          </div>
          <div>
            <div className="relative mt-4 bg-white px-6 pt-14 pb-8 md:p-8 shadow-[0_10px_5px_-3px_rgb(0,0,0,0.1)]">
              <div className="absolute top-0 right-0 h-0 w-0 rotate-180 border-b-[50px] border-r-[50px] border-l-[0px] border-b-gray border-r-transparent border-l-transparent"></div>
              <div className="absolute top-0 right-0 h-0 w-0 border-b-[50px] border-r-[50px] border-t-[0px] border-b-slate-200 border-r-transparent border-l-transparent"></div>
              <div>
                <span className="responsive-text">
                  Menampilkan pencarian untuk "<span className="font-semibold">Setiawan</span>"{" "}
                </span>
                <table className="table-fixed overflow-x-scroll my-4 w-full responsive-text">
                  <tbody>
                    <Link href="#" className="table-row border-b border-slate-700/50">
                      <td className="md:w-[10%] lg:w-[5%] w-[15%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center truncate">1</span>
                        </div>
                      </td>
                      <td className="pl-3 md:w-[80%] lg:w-[85%] w-[65%]">
                        195520018 _ 1TI6A _ Willy <span className="font-semibold">Setiawan</span>
                      </td>
                      <td className="text-right lg:w-[10%] w-[20%]">
                        <span>1200</span>pts
                      </td>
                    </Link>
                    <Link href="#" className="table-row border-b border-slate-700/50">
                      <td className="md:w-[10%] lg:w-[5%] w-[15%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center truncate">2</span>
                        </div>
                      </td>
                      <td className="pl-3 md:w-[80%] lg:w-[85%] w-[75%]">
                        195520020 _ 1TI6A _ Diky <span className="font-semibold">Setiawan</span>
                      </td>
                      <td className="text-right lg:w-[10%] w-[10%]">
                        <span>1100</span>pts
                      </td>
                    </Link>
                    <Link href="#" className="table-row border-b border-slate-700/50">
                      <td className="md:w-[10%] lg:w-[5%] w-[15%] border-r border-slate-700/50 p-1">
                        <div className="border border-slate-700/50 flex items-center">
                          <span className="mx-auto px-2 text-center truncate">3</span>
                        </div>
                      </td>
                      <td className="pl-3 md:w-[80%] lg:w-[85%] w-[75%]">
                        195520015 _ 1TI6A _ Henky Fajar <span className="font-semibold">Setiawan</span>
                      </td>
                      <td className="text-right lg:w-[10%] w-[10%]">
                        <span>1050</span>pts
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
export default Home;
