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
        const { status } = await supabase.from('stocks').select().eq('symbol', arraySize[0])
        if (status === 200) {
            await supabase.from('stocks').update({ quantity: quantity }).eq('symbol', arraySize[0])
        } else {
            await supabase.from('stocks').insert({ symbol: arraySize[0], country: 'London', quantity: quantity })
        }
    } else {
        const { status } = await supabase.from('stocks').select().eq('symbol', stockName)
        if (status === 200) {
            await supabase.from('stocks').update({ quantity: quantity }).eq('symbol', stockName)
        } else {
            await supabase.from('stocks').insert({ symbol: stockName, country: 'London', quantity: quantity })
        }
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
    const code = formData.get('code')
    const quantity = formData.get('quantity')

    const { data, status } = await supabase.from('cripto').select().eq('code', code)
    if (status === 200 && data?.length !== 0) {
        await supabase.from('cripto').update({ quantity: quantity }).eq('code', code)
    } else {
        await supabase.from('cripto').insert({ name: coinName, code: code, quantity: quantity })
    }
}