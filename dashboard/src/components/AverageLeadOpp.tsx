import { useFrappeGetCall } from 'frappe-react-sdk';
import { useState } from 'react';

interface EdgeEntry {
  edge: string;
  value: number;
}

export const AverageLeadOpp = () => {
  const { data, error, isValidating } = useFrappeGetCall('sales_board.sales_board.get_average');
  //const [resultVisible, setResultVisible] = useState(false);

  const [showResult, setShowResult] = useState(false);
  
  const ans: EdgeEntry[] = data ? data.message : [];

  const overallAverage = (ans.length > 0 ? ans.reduce((acc, entry) => acc + entry.value, 0) / ans.length : 0).toFixed(2);


  const handleButtonClick = () => {
    setShowResult(true);
    //setResultVisible(true);
  };
  const handleResultClick = () => {
    //setResultVisible(false);
    setShowResult(false)
  };
  
  
  return (
    <div className='flex items-center'>
      <button onClick={handleButtonClick} className=' font-bold text-xl text-white lg:px-3 lg:py-2 ' >
        Average conversion time
      </button>
      {isValidating && <p></p>}
      {showResult  &&  (
         <div className='flex lg:ml-8'>
        <p className=' text-xl font-bold cursor-pointer lg:px-2 lg:py-2 rounded-lg text-black bg-indigo-300 transition duration-500 ease-in-out transform hover:scale-105 hover:bg-orange-200' onClick={handleResultClick}>{overallAverage}</p>
        </div>
      )}

      {error && <p>Error fetching data: {error.message}</p>}
    </div>
  );
};
