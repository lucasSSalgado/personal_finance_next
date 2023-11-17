'use server'
const getUpdatePrice = async (symbol: string, country: string, quantity: number) => {
    let resp: any
    if (country === 'USA' || country === 'London') {
        resp = await fetch(`https://realstonks.p.rapidapi.com/${symbol}`, {
            headers: {
                'X-RapidAPI-Key': process.env.NEXT_PUBLIC_REALSTOCKS_KEY as string,
                'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
            }
        }) 
    } else if (country === 'Brazil') {
        resp = await fetch(`https://brapi.dev/api/quote/${symbol}?token=${process.env.NEXT_PUBLIC_BRAPI_KEY}`)
    } 

    resp = await resp.json()
    //https://brapi.dev/api/v2/currency?currency=USD-BRL&token=eJGEyu8vVHctULdVdHYzQd

    let price: number
    if (country === 'Brazil') {
        
        const dolar = await getDolar()
        price = resp.results[0].regularMarketPrice / dolar
    } else { 
        price = resp.price 
    }    
    const value = price * quantity
    return value
} 

const getDolar = async () => {
    const coinData = await fetch(`htt'ps://brapi.dev/api/v2/currency?currency=USD-BRL&token=${process.env.NEXT_PUBLIC_BRAPI_KEY}`) 
    const jsonData = await coinData.json() 
    return jsonData.currency[0].bidPrice
}

export default getUpdatePrice