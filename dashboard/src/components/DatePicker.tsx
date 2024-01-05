import React, { useState, useEffect } from 'react';

interface DatePickerProps {
  onDateChange: (fromDate: string, toDate: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  useEffect(() => {
    // Notify parent component about date changes
    onDateChange(fromDate, toDate);
  }, [fromDate, toDate, onDateChange]);

  return (
    <div className=' flex lg:space-x-6  lg:justify-center lg:items-center border lg:px-4 lg:py-3 rounded-md transition-transform duration-300 hover:shadow-lg bg-indigo-300'>
      <div className='flex flex-col lg:space-y-4  lg:justify-center '>
      <p className='text-gray-100 font-medium'>From Date :</p>
      <input
        type="date"
        placeholder="From Date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className='bg-indigo-300 lg:mr-4 '
      />
      </div>
      <div className='flex flex-col lg:space-y-4 lg:justify-center '>
        <p className='text-gray-100 font-medium'>To Date :</p>
      <input
        type="date"
        placeholder="To Date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className='bg-indigo-300 '
      />
     </div>
    </div>
  );
};

export default DatePicker;
