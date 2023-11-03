import Link from "next/link";
import Logout from "./Logout";

export default async function Headers() { 
    return(
        <header className="flex p-2 justify-evenly m-auto bg-slate-700 h-14">
            <div className="flex p-2">
                <Link href="/">LOGO</Link>
            </div>
            <div className="flex p-2 justify-evenly w-6/12">
                <Link href='/stocks'>Stocks</Link>
                <Link href='/cripto'>Cripto</Link>
                <Link href='/manual'>Manual</Link>
                <Link href='/about'>About</Link>
            </div>
            <Logout />                    
        </header>
    )
}