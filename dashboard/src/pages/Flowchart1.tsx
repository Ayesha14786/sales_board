import { useState } from 'react';
import ReactFlow, { Position } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: 0,
    source: 'Lead',
    level: 0,
    target: [
      {
        id: 1,
        level: 1,
        label: 'prospect'
      },
      {
        id: 2,
        level: 1,
        label: 'quotation'
      },
      {
        id: 3,
        level: 1,
        label: 'opportunity'
      }
    ]
  }
];

const calculatePosition = (level:number, targetIndex:number) => {
  const x = 0 + 200 * level;
  const y = 300 + 75 * (targetIndex % 2 === 0 ? targetIndex / 2 : -Math.floor(targetIndex / 2));  
  console.log((targetIndex % 2 === 0 ? targetIndex / 2 : -Math.floor(targetIndex / 2))); 
  return { x, y };
};

export const Flowchart1 = () => {
  const nodes = initialNodes.flatMap((node) => [
    {
      id: node.id.toString(),
      data: { label: node.source },
      position: calculatePosition(node.level,0),
      sourcePosition: Position.Right,
      targetPosition: Position.Left
    },
    ...node.target.map((targetNode, index) => ({
      id: targetNode.id.toString(),
      data: { label: targetNode.label },
      position: calculatePosition(targetNode.level, index + 1),
      sourcePosition: Position.Right,
      targetPosition: Position.Left
    }))
  ]);

  const edges = initialNodes.flatMap((record) =>
    record.target.map((targetNode) => ({
      id: `${record.id}-${targetNode.id}`,
      source: record.id.toString(),
      target: targetNode.id.toString(),
      animated: true
    }))
  );

  return <ReactFlow nodes={nodes} edges={edges}/>;
};
