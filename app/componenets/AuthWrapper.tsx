import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function AuthWrapper({ children }: { children:React.ReactNode }) {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()
    const session = data.session

    if (!session) {
    redirect('/login')
    }
  
    return(
        <>
            { children }
        </>
    )
}