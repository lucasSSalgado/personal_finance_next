'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function Login() {
    const supabase = createClientComponentClient()  
    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        })
    }

    return (
        <main>
            <button onClick={handleLogin}>Login with Github</button>
        </main>
    )
}