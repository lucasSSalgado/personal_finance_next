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
    } else if (country === 'brazil') {
        stockResp = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.SAO&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE}`)
    } else {
        stockResp = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.LON&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE}`)
    }

    const stockData = await stockResp.json()
    return stockData['Global Quote']
}

export async function saveStock(prevState: any, formData: FormData) {
    const stockName = formData.get('stock')
    const quantity = Number(formData.get('number'))
    const supabase = createServerComponentClient({ cookies })

    let sanitizeStockName = String(stockName)   
    let arraySize = sanitizeStockName.split('.')

    if (arraySize.length == 2) {
        saveBasedOnSymbol(arraySize[0], arraySize[1], quantity)
    } else {
        const { status } = await supabase.from('stocks').select().eq('symbol', stockName)
        if (status === 200) {
            await supabase.from('stocks').update({ quantity: quantity }).eq('symbol', stockName)
        } else {
            await supabase.from('stocks').insert({ symbol: stockName, country: 'USA', quantity: quantity })
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

export async function saveManual(prevState: any, formData: FormData) {
    const title = formData.get('title')
    const type = formData.get('type')
    let quantity = Number(formData.get('quantity'))
    const value = Number(formData.get('value'))

    if (quantity === null || quantity === undefined) quantity = 0

    const supabase = createServerComponentClient({ cookies }) 
    const resp = await supabase.from('other').insert({ title: title, type: type, quantity: quantity, value: value})
    if (resp.status === 201) return true
    else return false
} 

// utils
async function saveBasedOnSymbol(symbol: String, country: String, quantity: Number) {
    const supabase = createServerComponentClient({ cookies })
    const { status } = await supabase.from('stocks').select().eq('symbol', symbol)
    let countryName: String = ''

    if (country === 'LON') countryName = 'London'
    if (country === 'SAO') countryName = 'Brazil'

    if (status == 200) {
        await supabase.from('stocks').update({ quantity: quantity }).eq('symbol', symbol)
    } else {
        await supabase.from('stocks').insert({ symbol: symbol, country: countryName, quantity: quantity })
    }
}