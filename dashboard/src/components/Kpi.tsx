import  { useState } from 'react'
import Lcount from './Lcount'
import DatePicker from './DatePicker';
import { AverageLeadOpp } from './AverageLeadOpp';
import Ftest1Wrapper from './Ftest1Wrapper';
import Ocount from './Ocount';
import QLcountReason from './QLcountReason';

export const Kpi = () => {
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
  
    const handleDateChange = (newFromDate: string, newToDate: string) => {
      setFromDate(newFromDate);
      setToDate(newToDate);
    };
  return (
    <div className='flex lg:flex-row lg:p-5 md:p-2 lg:h-screen lg:w-full'>
   <div className='flex flex-col shadow-md border lg:w-1/4 lg:h-screen lg:py-10 bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-500 rounded-lg lg:mr-2'>
    <div className='lg:px-8 lg:text-2xl font-bold text-white'>Dashboard</div>
    <div className='lg:w-1/4 border-b-2 border-white lg:px-2 lg:py-2 lg:ml-9'></div>
    <div className='flex  lg:justify-center lg:items-center lg:mt-10 '> 
      <DatePicker onDateChange={handleDateChange} />
    </div>
    <div className='lg:px-8 lg:py-8 lg:mt-5  flex flex-col'>
      <p className='text-xl font-bold text-white '>Key Performance Metrics</p>
      <div className='lg:w-3/5 border-b-2 border-white lg:px-2 lg:py-2 '></div>
    </div>
    <div className='flex flex-col lg:ml-5 lg:space-y-6'>
      <AverageLeadOpp />
      <Lcount fromDate={fromDate} toDate={toDate} />              
      <Ocount fromDate={fromDate} toDate={toDate}/>
    
    </div>   
    <div className='flex flex-col  lg:mt-14'>
      <QLcountReason fromDate={fromDate} toDate={toDate} />
    </div>
    </div>
    <div className='flex lg:h-screen lg:w-3/4 lg:ml-2  bg-gray-100'>
        <Ftest1Wrapper />
    </div>
  </div>
  )
}
