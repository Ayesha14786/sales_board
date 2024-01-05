import React from 'react';

interface Scenario {
  label: string;
  nextLabel?: string;
}

export const Dashboard =()=> {
  const scenarios: Scenario[] = [
    { label: 'Lead', nextLabel: 'Opportunity' },
    { label: 'Opportunity', nextLabel: 'Quotation' },
    { label: 'Quotation', nextLabel: 'Sales Order' },
    // Add more scenarios as needed
  ];

  const renderLabel = (label: string) => (
    <div className="w-28 h-12 text-indigo-500 flex items-center justify-center flex-col rounded-md border-gray-100">
      {label}
    </div>
  );

  return (
    <div className="px-10 flex border border-r w-1/4 h-screen">
    <div className="flex flex-col  mt-8 ml-16" >
     <h1 className="font-bold mb-8">Process Flowchart</h1>
      {scenarios.map((scenario, index) => (
        <React.Fragment key={index}>
          {renderLabel(scenario.label)}

          {/* Connection Line */}
          {scenario.nextLabel && (
            <div className="w-1 h-12 ml-14 bg-gray-200 "></div>
          )}
        </React.Fragment>
      ))}

      {/* Last Rectangle */}
      {scenarios.length > 0 && renderLabel(scenarios[scenarios.length - 1].nextLabel || '')}
    </div>
    </div>
  );
};

