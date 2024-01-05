import { useFrappePostCall } from 'frappe-react-sdk';
import { useState } from 'react';

type Daterange = {
  fromDate: string;
  toDate: string;
};

const Ocount = ({ fromDate, toDate }: Daterange) => {
  const { call, result, loading, isCompleted } = useFrappePostCall('sales_board.sales_board.get_opportunity_count_in_date_range');
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

  return (
    <div className='flex items-center'>
      
      <button onClick={handleButtonClick} className='font-bold text-xl text-white lg:px-3 lg:py-2'>Opportunity Count</button>
      {loading && <p></p>}
      <div className='flex lg:ml-20'>
      {isCompleted && resultVisible && result && <p className='text-xl font-bold cursor-pointer lg:px-3 lg:py-2 lg:ml-2 rounded-lg bg-indigo-300 text-black  transition duration-500 ease-in-out transform hover:scale-105 hover:bg-yellow-200' onClick={handleResultClick}> {result.message}</p>}
      </div>
    </div>
  );
};

export default Ocount;
