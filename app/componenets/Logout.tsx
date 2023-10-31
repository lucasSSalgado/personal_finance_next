'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function Logout() {
    const supabase = createClientComponentClient()
    const router = useRouter()
    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return (
        <>        
            <button onClick={handleLogout}>
                Logout
            </button>
            <br/>
        </>

    )
}