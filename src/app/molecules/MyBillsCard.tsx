import Image from "next/image"
import Rectangle21 from "../../../public/Rectangle21.svg"

export default function MyBillsCard() {

    return(
        <>
            <div className="bg-white w-[632px] h-[400px] rounded-lg mt-5 shadow-gray shadow-lg">
                <div>
                    <div className="flex">
                        <div><Image
                        src={Rectangle21}
                        alt=""
                        /></div>
                        <div className=" ml-3">
                            <p>Saldo geral</p>
                            <p>R$</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}