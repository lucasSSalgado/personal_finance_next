'use client'
import { saveManual } from "@/app/actions"
    import { useFormState } from "react-dom"

export default function FormManual() {
    const[state, formAction] = useFormState(saveManual, null)
    
    return(
        <div>
            <h2 className="text-2xl">Adding assets by hand</h2>
            <form action={formAction} className="mt-5 p-2 border border-slate-200 rounded-md">
                <label htmlFor="title">Investiment Title</label> <br />
                <input className="text-black" type="text" name="title" placeholder="Ex: fixed income.." required /> <br />

                <p className="mt-2">Investment Type</p>
                <input type="radio" name="type" value="fixed" />
                <label htmlFor="fixed">FIXED</label> <br />
                <input type="radio" name="type" value="cash" />
                <label htmlFor="cash">CASH</label> <br />
                <input type="radio" name="type" value="funds" /> 
                <label htmlFor="fund">FUNDS</label> <br />
                <input type="radio" name="type" value="other" /> 
                <label htmlFor="other">OTHER</label> <br />

                <label htmlFor="quantity">Quantity</label> <br />
                <input className="text-black" type="number" name="quantity" /> <br />
                <label htmlFor="value">Value</label> <br />
                <input className="text-black" type="text" name="value" required /> <br />

                <button className="px-1 border border-slate-400 rounded-md mt-2" type="submit">
                    Save in wallet
                </button>
            </form>
        </div>
    )
}