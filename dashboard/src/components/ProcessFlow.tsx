import { Lead } from "./Lead"

import { Chart1 } from "./Chart1"
import { Opportunity } from "./Opportunity"
//import { LineChart } from "./LineChart"


export const ProcessFlow = () => {
  return (
    <div className="flex flex-col py-12 px-14 space-y-8">
      <h2 className="font-bold text-center text-lg">Dashboard</h2>
      <div className="flex space-x-10 justify-center items-center">
        
        <div className="w-1/3 h-1/2 p-3 border border-gray-200 rounded-lg flex flex-col justify-center ">
            <Opportunity />
        </div> 
        <div className="w-1/3 h-1/2 p-3 border border-gray-200 rounded-lg flex flex-col justify-center ">
            <Lead />
        </div> 
        
      </div>
      {/*<div className="flex space-x-10 w-4/5 flex-col space-y-4">
        <h2 className="font-semibold">Incoming Lead</h2>
        <Chart1 />
      </div>
      <div className="flex space-x-10 w-4/5 flex-col space-y-4">
        <h2 className="font-semibold">Performance Metric</h2>
        
  </div>*/}
    </div>
  )
}
