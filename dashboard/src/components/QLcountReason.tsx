import { useFrappePostCall } from 'frappe-react-sdk';
import { useState } from 'react';

type Daterange = {
  fromDate: string;
  toDate: string;
};

const QLcountReason = ({ fromDate, toDate }: Daterange) => {
  const { call, result, loading, isCompleted } = useFrappePostCall('sales_board.sales_board.get_lost_quotations_name_and_reasons');
  const [resultVisible, setResultVisible] = useState(false);

  const handleButtonClick = async () => {
    try {
      // Validate user input if necessary
      if (!fromDate || !toDate) {
        console.error('Please enter both from and to dates.');
        return;
      }

      const params = {
        from_date: fromDate,
        to_date: toDate,
      };

      await call(params);
      setResultVisible(true);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleResultClick = () => {
    setResultVisible(false);
  };
 //console.log(result)
  return (
    <div className='text-center'>
      
      <button onClick={handleButtonClick} className='bg-blue-200 lg:px-3 lg:py-2 rounded-lg text-black hover:shadow-lg'>Lost Quotation</button>
      {loading && <p>Loading...</p>}
      {isCompleted && resultVisible && result && (
     <div className='lg:mt-4'>
     <p className='text-xl lg:mb-3 cursor-pointer'onClick={handleResultClick}>Count: {result.message.length}</p>
     <table className='lg:mt-2 border-collapse border border-gray-700 lg:w-full'>
       <thead>
         <tr className='bg-gray-200'>
           <th className='border border-gray-700 lg:p-2'>Name</th>
           <th className='border border-gray-700 lg:p-2'>Reason</th>
         </tr>
       </thead>
       <tbody>
         {result.message.map((item: { name: string, reason: string }, index: number) => (
           <tr key={index} className='bg-white'>
             <td className='border border-gray-700 lg:p-2'>{item.name}</td>
             <td className='border border-gray-700 lg:p-2'>{item.reason}</td>
           </tr>
         ))}
       </tbody>
     </table>
     
   </div>)}
    </div>
  );
};

export default QLcountReason;
