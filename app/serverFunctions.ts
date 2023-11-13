const getUpdatePrice = async (symbol: string, country: string, quantity: number) => {
    let resp: any

    if (country === 'USA') {
        resp = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE}`)
    } else if (country === 'Brazil') {
        resp = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.SAO&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE}`)
    } else if (country === 'London') {
        resp = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.LON&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE}`)
    }

    resp = await resp.json()

    const data = resp['Global Quote']
    const price = data['05. price']
    const value = price * quantity

    return value
} 

export default getUpdatePrice