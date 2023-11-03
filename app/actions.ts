'use server'
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export async function getStockData(prevState: any, formData: FormData) {
    let symbol = String(formData.get('symbol'))
    symbol = symbol.toLowerCase()
    const country = formData.get('country')
    let stockResp: Response

    if (country === 'usa') {
        stockResp = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE}`)
    } else {
        stockResp = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.LON&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE}`)
    }

    const stockData = await stockResp.json()
    return stockData['Global Quote']
}

export async function saveStock(prevState: any, formData: FormData) {
    const stockName = formData.get('stock')
    const quantity = formData.get('number')
    const supabase = createServerComponentClient({ cookies })

    let sanitizeStockName = String(stockName)
    let arraySize = sanitizeStockName.split('.')

    if (arraySize.length == 2) {
        await supabase.from('stocks').insert({ symbol: arraySize[0], country: 'London', quantity: quantity })
    } else {
        await supabase.from('stocks').insert({ symbol: stockName, country: 'USA', quantity: quantity })
    }
}

export async function getCriptoData(prevState: any, formData: FormData) {
    const criptoName = formData.get('cripto')
    const criptoResp = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${criptoName}&to_currency=USD&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE}`)
    const criptoData = await criptoResp.json()

    return criptoData['Realtime Currency Exchange Rate']
}

export async function saveCripto(prevState: any, formData: FormData) {
    const supabase = createServerComponentClient({ cookies })

    const coinName = formData.get('coin')
    const quantity = formData.get('quantity')

    console.log(coinName, quantity)
}