import React, { useState } from 'react';
import ReactFlow, { Controls, updateEdge, addEdge } from 'react-flow-renderer';
const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node A' },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Node B' },
    position: { x: 100, y: 200 },
  },
  {
    id: '3',
    data: { label: 'Node C' },
    position: { x: 400, y: 200 },
  },
  { id: 'e1-2', source: '1', target: '2', label: 'updatable edge' },
];
const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();
const graphStyles = { width: "100%", height: "300px" };
const UpdatableEdge = () => {
  const [elements, setElements] = useState(initialElements);
  // gets called after end of edge gets dragged to another source or target

  const onConnect = (params) => setElements((els) => addEdge(params, els));
  return (
    <ReactFlow
      elements={elements}
      onLoad={onLoad}
      snapToGrid
     
      onConnect={onConnect}
      style={graphStyles}
    >
      <Controls />
    </ReactFlow>
  );
};
export default UpdatableEdge;