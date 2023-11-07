'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { generateChartColors } from './utils'

export default function PieChart({ data }:{ data: any }) {

    ChartJS.register(ArcElement, Tooltip, Legend)
    const arrayOfColor = generateChartColors(data.length)

    const stockData = {
        labels: data.map((elem: any) => elem.symbol),
        datasets: [
            {
                label: 'value',
                data: data.map((elem: any) => elem.quantity),
                backgroundColor: arrayOfColor
            }
        ]
    }

    return (
        <Pie data={stockData} />
    )
}