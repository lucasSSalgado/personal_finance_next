import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Header from "./componenets/Header"
import AuthWrapper from "./componenets/AuthWrapper"
import PieChart from "./componenets/charts/PieChart"
import getUpdatePrice from "./serverFunctions"

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.from('stocks').select('symbol, country, quantity')
  const stockDataList: any[] = []

  if (data?.length !== undefined) {
    for (let i = 0; i < data?.length; i++) {
      const actualStock = data[i]
      const symbol = actualStock.symbol
      const stockprice = await getUpdatePrice(symbol, actualStock.country, actualStock.quantity)
      stockDataList.push({ symbol, stockprice })
    }
  }

  return (
    <AuthWrapper>
      <Header />
      <main className="m-auto w-8/12 mt-5">
        <h1 className="text-center text-3xl">Your Assets</h1>
        {/* inside the braces create a deshboard component */}
        { 
          stockDataList.length !== 0 &&
          <PieChart data={ stockDataList } /> 
        }
      </main>
    </AuthWrapper>
  )
}
