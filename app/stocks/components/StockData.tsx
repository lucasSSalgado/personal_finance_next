'use client'
import { useFormState } from "react-dom"
import { saveStock } from '@/app/actions'

export default function StockData({ stock }: { stock: any }) {
    const [state, formAction] = useFormState(saveStock, null)
    console.log(stock)

    return (
        <div className="mt-5 border border-slate-50 rounded-md p-2">
            <p>Symbol: { stock['symbol'] }</p>
            <p>Current Price: US$ { stock['price'] }</p>

            <form action={formAction}>
                <label htmlFor="number">Quantity: </label>
                <input className="text-black" type="number" name="number" min={0} required/>
                <input type="text" name="stock" value={ stock['01. symbol'] } className="hidden" readOnly /> <br />
                <button 
                className="border-slate-50 border mt-3 px-1 rounded
                hover:bg-slate-200 hover:text-black" 
                type="submit">
                    Save in wallet
                </button>
            </form>            
        </div>
    )
}