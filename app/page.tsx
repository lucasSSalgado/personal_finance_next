import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Header from "./componenets/Header"
import AuthWrapper from "./componenets/AuthWrapper"
import PieChart from "./componenets/charts/PieChart"

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.from('stocks').select() 

  return (
    <AuthWrapper>
      <Header />
      <main className="m-auto w-8/12 mt-5">
        <h1 className="text-center text-3xl">Your Assets</h1>
        <p>GRAFICOS ALEATÓRIOS AQUI</p>

        <PieChart data={data} />
      </main>
    </AuthWrapper>
  )
}
