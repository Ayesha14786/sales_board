import  { useState } from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodesData = [
  { label: 'Input Node' },
  { label: 'Default Node' },
  { label: 'Default Node' },
  { label: 'Default Node' },
  { label: 'Output Node' },
];

const initialEdges = [
  { id: 'e1-2', source: '0', target: '1', animated: true },
  { id: 'e1-3', source: '0', target: '2', animated: true },
  { id: 'e3-4', source: '2', target: '3', animated: true },
  { id: 'e4-5', source: '3', target: '4', animated: true },
  
];

export const FlowChart = () => {
  const calculateXPosition = (index:number, totalNodes:number) => {
    
    // Adjust this calculation based on your preference
    return (index / (totalNodes - 1)) * 300;
  };

  const [nodes, setNodes] = useState(
    initialNodesData.map((data, index) => ({
      id: index.toString(),
      data: { ...data },
      position: { x:0, y: calculateXPosition(index, initialNodesData.length)},
      style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: '100px'},
    }))
  );

  const [edges, setEdges] = useState(initialEdges);

  return <ReactFlow nodes={nodes} edges={edges} fitView style={{width: '50%'}} />;
};