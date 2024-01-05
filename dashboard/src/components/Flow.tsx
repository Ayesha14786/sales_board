import React from 'react';
import ReactFlow, { Position } from 'react-flow-renderer'; // Assuming you are using react-flow-renderer
import 'react-flow-renderer/dist/style.css';

const initialNodes = [
  { 'doctype': 'Lead', 'level': 0, 'parent': 'Lead' },
  { 'doctype': 'Customer', 'level': 1, 'parent': 'Lead' },
  { 'doctype': 'Issue', 'level': 1, 'parent': 'Lead' },
  { 'doctype': 'Prospect', 'level': 1, 'parent': 'Lead' },
  { 'doctype': 'Comment', 'level': 1, 'parent': 'Lead' },
  { 'doctype': 'Activity Log', 'level': 1, 'parent': 'Lead' },
  { 'doctype': 'Contact', 'level': 1, 'parent': 'Lead' },
  { 'doctype': 'Opportunity', 'level': 1, 'parent': 'Lead' },
  { 'doctype': 'Quotation', 'level': 1, 'parent': 'Lead' },
  {'doctype': 'Tax Rule', 'level': 2, 'parent': 'Customer'}, 
  {'doctype': 'Dunning', 'level': 2, 'parent': 'Customer'}, 
  {'doctype': 'Sales Invoice', 'level': 2, 'parent': 'Customer'}, 
  {'doctype': 'POS Invoice Merge Log', 'level': 2, 'parent': 'Customer'}, 
  {'doctype': 'POS Invoice', 'level': 2, 'parent': 'Customer'}, 
  {'doctype': 'Bank Guarantee', 'level': 2, 'parent': 'Customer'}, 
  {'doctype': 'Coupon Code', 'level': 2, 'parent': 'Customer'}, 
  {'doctype': 'Pricing Rule', 'level': 2, 'parent': 'Customer'},
  {'doctype': 'POS Profile', 'level': 2, 'parent': 'Customer'}, 
  {'doctype': 'Purchase Order', 'level': 2, 'parent': 'Customer'}, 
  {'doctype': 'Timesheet', 'level': 2, 'parent': 'Customer'}, 
  {'doctype': 'Project', 'level': 2, 'parent': 'Customer'}, 
  {'doctype': 'Sales Order', 'level': 2, 'parent': 'Customer'}, 
  {'doctype': 'Installation Note', 'level': 2, 'parent': 'Customer'}, 
  {'doctype': 'SMS Center', 'level': 2, 'parent': 'Customer'}, 
  {'doctype': 'Blanket Order', 'level': 2, 'parent': 'Customer'}, 
  {'doctype': 'Production Plan', 'level': 2, 'parent': 'Customer'},   
  {'doctype': 'Quotation', 'level': 2, 'parent': 'Opportunity'}, 
  {'doctype': 'Prospect', 'level': 2, 'parent': 'Opportunity'}, 
  {'doctype': 'Comment', 'level': 2, 'parent': 'Opportunity'}, 
  {'doctype': 'View Log', 'level': 2, 'parent': 'Opportunity'},   
  {'doctype': 'Sales Order', 'level': 2, 'parent': 'Quotation'}, 
  {'doctype': 'Comment', 'level': 2, 'parent': 'Quotation'}, 
  {'doctype': 'Activity Log', 'level': 2, 'parent': 'Quotation'}
];

const calculatePosition = (level: number, targetIndex: number) => {
  const x = 350 * level;
  const y = 300 + 75 * (targetIndex % 2 === 0 ? targetIndex/2 : -Math.floor(targetIndex/2 ));
  return { x, y };
};

const Flow = () => {
  const nodes = initialNodes.flatMap((node, index) => [
    {
      id: node.doctype,
      data: { label: node.doctype },
      position: calculatePosition(node.level, index),
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    },
  ]);

  const edges = initialNodes.flatMap((record) =>
    record.parent ? [{
      id: `${record.doctype}-${record.parent}`,
      source: record.parent,
      target: record.doctype,
      animated: true,
    }] : []
  );

  return <ReactFlow nodes={nodes} edges={edges}/>;
};

export default Flow;
