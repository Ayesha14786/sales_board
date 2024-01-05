// Ftest1Wrapper.tsx
import  { useEffect } from 'react';
import Ftest1 from './Ftest1';
import { useFrappeGetCall } from 'frappe-react-sdk';
 
const Ftest1Wrapper = () => {
  const { data, error, isValidating } = useFrappeGetCall('sales_board.sales_board.get_average');
  
  if (error) {
    console.error('Error fetching data:', error);
  }

  if (isValidating) {
    return <div>Loading ....</div>;
  }
  
  const res = data.message
  return <Ftest1 value={res} />;
};

export default Ftest1Wrapper;
