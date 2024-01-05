import { useFrappeGetCall } from 'frappe-react-sdk';
import ReactFlow, {  Position, ReactFlowProvider} from 'react-flow-renderer';


interface Msg {
  doctype: string;
  level: number;
  parent: string;
}

// Initialize with a value that won't match any actual level

const calculatePosition = (level: number, targetIndex: number) => {
  const x = 300 * level;

  const y = targetIndex%2===0? 200 + (60 * -(targetIndex)/2) : 200 + (60 * targetIndex/2) ; // Adjust the spacing factor (25) as needed

  return { x, y };
};


const generateNodeColor = (level: number) => {
  const hue = (level * 60) % 360;
  const saturation = 70;
  const lightness = 70;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const generateColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = (hash & 0x00ffffff).toString(16).toUpperCase();
  return `#${'00000'.substring(0, 6 - color.length)}${color}`;
};


interface EdgeItem {
  edge: string;
  value: string;
}

const Ftest1= ({value}: { value: EdgeItem[] }) => {
  const { data, error, isValidating } = useFrappeGetCall('sales_board.sales_board.get_document_flow_from_root_document');
  //console.log(value)
  
  if (error) {
    console.error('Error fetching data:', error);
  }

  if (isValidating) {
    return <div>Loading ....</div>;
  }

  const initialNodes: Msg[] = data.message;
  
  
  const nodes = initialNodes.map((node, index) => {
    return {
      id: node.doctype,
      data: { label: node.doctype },
      style: {
        background: generateNodeColor(node.level),
        
      },
      position: calculatePosition(node.level, index),
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };
  });
  const nodeCount = initialNodes.length
  const edges = initialNodes.flatMap((record) =>
    record.parent && record.parent !== record.doctype
      ? [
          {
            id: `${record.parent}-${record.doctype}`,
            source: record.parent,
            target: record.doctype,
            animated: true,
            label: (value.find((item: EdgeItem) => item.edge === `${record.parent}-${record.doctype}`) || { value: "NC" }).value.toString(),
            style: {
              stroke: generateColor(record.parent), // Set color based on parent
              strokeWidth: 2,
            },
          },
        ]
      : []
  );
  
  
  
  return (
    <div className="lg:h-screen lg:w-full">
      <div className='text-right lg:mb-5 rounded-lg lg:px-8 font-bold text-xl lg:py-5 border bg-gradient-to-r from-indigo-400 to-indigo-500 text-white '>
        Total no. of documents:  <span className='font-medium'>{nodeCount}</span>
      </div>
      {!isValidating && !error && (
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            zoomOnDoubleClick={false}
            zoomOnScroll={true}
            fitView
          />
          
          
        </ReactFlowProvider>
      )}
    </div>
  );
};

export default Ftest1;