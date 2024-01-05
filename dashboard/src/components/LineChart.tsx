// LineChart.tsx

import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement )
export const Chart1 = () => {
  const data = {
    labels: [
    "19-11-2023",
    "20-11-2023",
    "21-11-2023",
    "22-11-2023",
    "23-11-2023",
    "24-11-2023",
    "25-11-2023",
    "26-11-2023"],
    datasets:[{
      labels: "the weekly state",
      data: [
        0,
        0,
        0,
        3,
        0,
        0,
        3,
        1
      ],
      backgroundColor: 'aqua',
      borderColor: 'rgb(53, 162, 235)',
      pointBorderColor: 'aqua'
    }]
  }
  
  
  return(
    
     <Line data={data} ></Line>
  )
};


