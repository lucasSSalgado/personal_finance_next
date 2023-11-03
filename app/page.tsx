import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Logout from "./componenets/Logout"
import Header from "./componenets/Header"

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()
  const session = data.session

  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <Header />
      <main className="m-auto w-8/12 mt-5">
        <h1 className="text-center text-3xl">Your Assets</h1>
        <p>GRAFICOS ALEATÓRIOS AQUI</p>
      </main>
    </>
  )
}
