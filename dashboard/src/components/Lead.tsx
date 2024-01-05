import { useState, useEffect } from 'react';
import { useFrappePostCall } from 'frappe-react-sdk'; // Replace with the actual path

export const Lead = () => {
  const { call, result } = useFrappePostCall('sales_board.sales_board.get_lead_count_in_date_range');

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Make the API call whenever fromDate or toDate changes
  useEffect(() => {
    const fetchData = async () => {
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

        // Access the result, loading, error, isCompleted here
        // console.log('Result:', result);
        // console.log('Loading:', loading);
        // console.log('Error:', error);
        // console.log('Is Completed:', isCompleted);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [fromDate, toDate, call]);

  return (
    <div className='text-center'>
     
      <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className='m-4 bg-gray-100 text-indigo-500' placeholder='fromdate'/>

     
      <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className='m-4 bg-gray-100 text-indigo-500' placeholder='todate'/>

      
      
      <p className='font-bold mb-2 text-lg text-gray-500'> Lead Count :  &nbsp; {result && <span className='text-indigo-500'>{result.message}</span>}</p>
    </div>
  );
}
