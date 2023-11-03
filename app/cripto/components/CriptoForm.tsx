'use client'
import { getCriptoData } from "@/app/actions"
import { useFormState } from "react-dom"
import CriptoData from "./CriptoData"

export default function CriptoForm() {
    const [state, formAction] = useFormState(getCriptoData, null)

    return(
        <div className="mt-5">
            <form className="border border-slate-50 rounded p-2" action={formAction}>
                <input type="radio" id="btc" name="cripto" value="btc" required />
                <label htmlFor="btc">Bitcoin</label> <br />
                <input type="radio" id="eth" name="cripto" value="eth" required />
                <label htmlFor="eth">Ethereum</label> <br />
                <input type="radio" id="usdt" name="cripto" value="usdt" required />
                <label htmlFor="usdt">Tether USDt</label> <br />
                <input type="radio" id="bnb" name="cripto" value="bnb" required />
                <label htmlFor="bnb">Binance Coin</label> <br />
                <input type="radio" id="xrp" name="cripto" value="xrp" required />
                <label htmlFor="xrp">Ripple XRP</label> <br />
                <input type="radio" id="ada" name="cripto" value="ada" required />
                <label htmlFor="ada">Ada Cardano</label> <br />
                <button className="mt-3 border border-slate-50 rounded px-2
                hover:bg-slate-50 hover:text-black" type="submit">
                    search
                </button>
            </form>

            { 
                state && <CriptoData data={state} />
            }
        </div>
    )
}