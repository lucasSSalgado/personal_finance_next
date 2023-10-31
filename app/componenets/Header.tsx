import Link from "next/link";
import Logout from "./Logout";

export default async function Headers() { 
    return(
        <header className="flex p-2 justify-evenly m-auto">
            <Link href='/'>home</Link>
            <Link href='/stocks'>Stocks</Link>
            <Link href='/cripto'>Cripto</Link>
            <Link href='/manual'>Manual</Link>
            <Logout />                    
        </header>
    )
}