export function generateChartColors(size: number): string[] {
    let colorsArray = []

    for (let i = 0; i < size; i++) {
        const red = Math.floor(Math.random() * 256)
        const green = Math.floor(Math.random() * 256)
        const blue = Math.floor(Math.random() * 256)

        const rgba = `rgba(${red}, ${green}, ${blue}, 1)`
        colorsArray.push(rgba)
    }

    return colorsArray
}