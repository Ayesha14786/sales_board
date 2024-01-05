import React from 'react';
import { useFrappeGetCall } from 'frappe-react-sdk';
import ReactFlow, { Position } from 'react-flow-renderer';

interface Msg{
    doctype: string,
    level: number,
    parent: string
}
const parentYValues: { [parent: string]: number } = {};
const calculatePosition = (level:number, targetIndex:number, totalNodes:Msg[]) => {
  {/*const currentNodeCount = (totalNodes.filter(record => record.level === level)).length
console.log(" Printing from calculatePosition", currentNodeCount)*/}
 //x axis calculation
  const x = 300 * level;
  //count no. of nodes has same parent
  const parentNodeCounts: { [parent: string]: number } = {};
  totalNodes.forEach(record => {
    if (record.level === level ) {
      parentNodeCounts[record.parent] = (parentNodeCounts[record.parent] || 0) + 1;
      //console.log(parentNodeCounts[record.parent])
    }
  });
 const currentNodeCount = parentNodeCounts[totalNodes[targetIndex].parent] || 0; 
  var parentY = parentYValues[totalNodes[targetIndex].parent] || 0   
  var y;
  if (currentNodeCount === 1) {
    y = parentY;    
  } else {
     // Calculate y position based on targetIndex
     if(currentNodeCount > 2){
        var offsetMultiplier = targetIndex % 2 === 0  ? 1*(currentNodeCount/2): -1*(currentNodeCount/2) ;
        //console.log((currentNodeCount - targetIndex)/(targetIndex))
     }
     else{
      var offsetMultiplier = targetIndex % 2 === 0  ? 1 : -1 ;
     }
     // Adjust this value based on your requirements
     const yOffset = 60;
     
     y = parentY + offsetMultiplier * yOffset;
  }  
  parentYValues[totalNodes[targetIndex].doctype] = y 
  return { x, y };
};

//generate color for node in same level
const generateNodeColor = ( level: number) => {
  const hue = (level * 60) % 360; // Adjust this as needed
  const saturation = 70; // Adjust this as needed
  const lightness = 70; // Adjust this as needed
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;

};
//generate color for edge
const generateColor = (str:string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = (hash & 0x00ffffff).toString(16).toUpperCase();
  return `#${'00000'.substring(0, 6 - color.length)}${color}`;
};

const Flow = () => {

  //fetching the whitelisted method
  const { data, error, isValidating } = useFrappeGetCall('sales_board.sales_board.get_document_flow_from_root_document');

  if (error) {
    console.error('Error fetching data:', error);
  }

  if (isValidating) {
    // You can show a loading indicator here if needed
    return <div>Loading...</div>;
  }

  const initialNodes:Msg[] = data.message;
  
  const nodes = initialNodes.map((node, index) => (
   
  {
    // arguments needed to create node in react-flow
    id: node.doctype,
    data: { label: node.doctype },
    style: {
      background: generateNodeColor(  node.level) ,
      
    },
    position: calculatePosition(node.level, index, initialNodes),// set the position of node
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
   
  }));
  //console.log('From Flow after Node fetch', nodes)
  const edges = initialNodes.flatMap((record) =>
    record.parent && record.parent !== record.doctype
      ? [
          {
            id: `${record.doctype}-${record.parent}`,
            source: record.parent,
            target: record.doctype,
            animated: true,
            style: {
              stroke: generateColor(record.parent), // Set color based on parent
              strokeWidth: 2,
            },
          },
        ]
      : []
  );

 

  return(
    <div className="h-full">
      <ReactFlow nodes={nodes} edges={edges} zoomOnDoubleClick={false} zoomOnScroll={true} fitView/>
    </div>
  )
};

export default Flow;
