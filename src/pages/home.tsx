import MyBillsCard from "@/app/molecules/MyBillsCard";
import Header from "@/app/organisms/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="pt-8 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-64">
        <div className="bg-white border border-gray-200 rounded-lg shadow flex flex-row p-6">
          <div className="flex flex-col justify-between w-full pr-7">
            <div className="flex flex-col">
              <p>Boa tarde,</p>
              <p className="flex items-center gap-1">
                <strong>Trummer!</strong>
                <img src="/sunAndCloud.svg" className="w-10" />
              </p>
            </div>

            <div className="grid grid-rows-4 grid-flow-col gap-4">
              <div className="flex flex-col rounded-lg border border-white bg-[#fefdf9] shadow-lg flex-grow ml-4 items-center justify-center h-16">
                <p className="text-gray-500 font-semibold">receita mensal</p>
                <p className="text-lg font-medium text-[#1ABE4E]">R$ 0,00</p>
              </div>
              <div className="flex flex-col rounded-lg border border-white bg-[#fefdf9] shadow-lg flex-grow ml-4 items-center justify-center h-16">
                <p className="text-gray-500 font-semibold">despesa mensal</p>
                <p className="text-lg font-medium text-red-600">R$ 0,00</p>
              </div>
              <a
                href="#"
                className="flex flex-row rounded-lg border border-white bg-[#fefdf9] shadow-lg flex-grow ml-4 items-center justify-center h-16 font-semibold"
              >
                <img src="/increase.svg" className="w-10 mr-1" />
                ver relatórios
              </a>
            </div>
          </div>
          <div className="border-l border-[#ebebeb] pl-7 bg-transparent">
            <h2 className="text-lg font-bold">Acesso rápido</h2>
            <ul className="flex items-center mt-6 text-xs font-normal">
              <li>
                <a
                  href="#"
                  className="w-[82px] p-4 h-[103px] flex flex-col items-center pt-4 transition-opacity duration-300 ease-in opacity-100"
                >
                  <img src="/minusSign.svg" className="w-8" />
                  DESPESA
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-[82px] p-4 h-[103px] flex flex-col items-center pt-4 transition-opacity duration-300 ease-in opacity-100"
                >
                  <img src="/plus.svg" className="w-8" />
                  RECEITA
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-[82px] p-4 h-[103px] flex flex-col items-center pt-4 transition-opacity duration-300 ease-in opacity-100"
                >
                  <img src="/investmentIcon.svg" className="w-8" />
                  INVESTIR
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="w-[82px] p-4 h-[103px] flex flex-col items-center pt-4 transition-opacity duration-300 ease-in opacity-100"
                >
                  <img src="/alertSign.svg" className="w-8" />
                  LIMITAR GASTOS
                </a>
              </li>
            </ul>
          </div>
        </div>
      <MyBillsCard />
      </div>
    </>
  );
}
