'use client'
import { useFormState } from "react-dom"
import { getStockData } from '@/app/actions'
import StockData from "./StockData"

export default function FormStock() { 
    const [state, formAction] = useFormState(getStockData, null)

    return(
        <div className="">
            <form className="border border-slate-200 p-2 rounded-md" action={formAction}>
                <label className="text-xl" htmlFor="symbol">Enter Stock Symbol</label> <br />
                <input className="text-black mt-2 px-1" type="text" name="symbol" /> <br />
                
                <input className="mt-4" type="radio" id="usa" name="country" value="usa" required/> 
                <label htmlFor="usa">USA</label><br/>
                <input type="radio" id="london" name="country" value="london" required/>
                <label htmlFor="london">London</label><br />
                <button className="border border-slate-50 rounded px-1 mt-2
                hover:bg-slate-200 hover:text-black" type="submit">
                    Search
                </button>
            </form>

            {   
                state &&
                <StockData stock={state} />
            }       
        </div>
    )
}