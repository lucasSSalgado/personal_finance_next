'use client'
import { saveCripto } from "@/app/actions"
import { useFormState } from "react-dom"

export default function CriptoData({ data } : { data: any }) {
    let price = Number(data['5. Exchange Rate'])
    price = Number(price.toFixed(2))

    const[state, formAction] = useFormState(saveCripto, null)

    return (
        <form action={formAction} className="mt-5 border border-slate-50 rounded-md p-2">
            <p>Coin name: { data['2. From_Currency Name'] }</p> 
            <p>Price (US$): { price }</p>
            <input type="number" placeholder="Add to your wallet" name="quantity" /> <br />
            
            <input type="text" name="coin" value={data['2. From_Currency Name']} readOnly className="hidden" />
            <input type="text" name="code" value={data['1. From_Currency Code']} readOnly className="hidden" />
            <button className="border-slate-50 border mt-3 px-1 rounded
                hover:bg-slate-200 hover:text-black" 
                type="submit">
                save in wallet    
            </button>    

            {
                state !== null && <div className="mt-2"> Successfully saved </div>
            }
        </form>
    )
}