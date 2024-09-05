import Header from "@/app/components/Header";

export default function Home() {
  return (
    <>
      <Header></Header>;
      <div style={{ padding: "0 12.5rem 0" }}>
        <div className="bg-white border border-gray-200 rounded-lg shadow  flex flex-row p-6">
          <div
            className="flex flex-col justify-between w-full "
            style={{ paddingRight: "1.75rem" }}
          >
            <div className="flex flex-col">
              <p>Boa tarde,</p>
              <p className="flex items-center gap-1">
                <strong>Trummer!</strong>
                <img src="/sunAndCloud.svg" className="w-10"></img>
              </p>
            </div>

            <div className="grid grid-rows-4 grid-flow-col gap-4">
              <div className="flex-col flex rounded-lg border border-white bg-[#fefdf9] shadow-lg flex-grow ml-4 items-center justify-center h-16">
                <p className="text-gray-500 font-semibold">receita mensal</p>
                <p
                  className="text-lg font-medium "
                  style={{ color: "#1ABE4E" }}
                >
                  R$ 0,00
                </p>
              </div>
              <div className="flex-col flex rounded-lg border border-white bg-[#fefdf9] shadow-lg flex-grow ml-4 items-center justify-center h-16">
                <p className="text-gray-500 font-semibold">despesa mensal</p>
                <p className="text-lg font-medium text-red-600">R$ 0,00</p>
              </div>
              <a
                href="#"
                className="flex-row flex rounded-lg border border-white bg-[#fefdf9] shadow-lg flex-grow ml-4 items-center justify-center h-16 font-semibold"
              >
                <img src="/increase.svg" className="w-10 gap-1"></img>
                ver relatórios
              </a>
            </div>
          </div>
          <div
            className="border-l border-[#ebebeb] bg-transparent"
            style={{ paddingLeft: 30 }}
          >
            <h2 className="text-lg font-bold ">Acesso rápido</h2>
            <ul className="flex items-center mt-6 text-xs font-normal">
              <li>
                <a
                  href="#"
                  className="w-[82px] p-4 h-[103px] flex flex-col items-center pt-4 transition-opacity duration-300 ease-in opacity-100"
                >
                  <img src="/minusSign.svg" className="w-8"></img>
                  DESPESA
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-[82px] p-4 h-[103px] flex flex-col items-center pt-4 transition-opacity duration-300 ease-in opacity-100"
                >
                  <img src="/plus.svg" className="w-8"></img>
                  RECEITA
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-[82px] p-4 h-[103px] flex flex-col items-center pt-4 transition-opacity duration-300 ease-in opacity-100"
                >
                  <img src="/investmentIcon.svg" className="w-8"></img>
                  INVESTIR
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-[82px] p-4 h-[103px] flex flex-col items-center pt-4 transition-opacity duration-300 ease-in opacity-100"
                >
                  <img src="/alertSign.svg" className="w-8"></img>
                  LIMITAR GASTOS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
