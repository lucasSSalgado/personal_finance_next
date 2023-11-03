import Link from "next/link";
import Logout from "./Logout";

export default async function Headers() { 
    return(
        <header className="flex p-2 justify-evenly m-auto bg-slate-700 h-14">
            <div className="flex p-2 justify-evenly w-8/12">
                <Link className="hover:bg-slate-50" href='/'>Home</Link>
                <Link href='/stocks'>Stocks</Link>
                <Link href='/cripto'>Cripto</Link>
                <Link href='/manual'>Manual</Link>
            </div>
            <Logout />                    
        </header>
    )
}