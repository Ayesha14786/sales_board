import  {  useEffect } from 'react';
import { useFrappePostCall } from 'frappe-react-sdk'; // Replace with the actual path



export const Opp = () => {
  const { call, result } = useFrappePostCall('sales_board.sales_board.get_opportunity_count_in_date_range');
  //console.log(fromDate, toDate)
  // Make the API call whenever fromDate or toDate changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Validate user input if necessary
       

        const params = {
          from_date: '01/11/2023',
          to_date: '01/12/2023',
        };

        await call(params);

       
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [call]);

  // Reset the result when fDate or tDate changes
  
  //console.log(result)
  return  result.message;
};
