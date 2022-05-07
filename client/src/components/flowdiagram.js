import React, { useState, useRef } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls,
  } from 'react-flow-renderer';
//import initialElements from "./initial-elements"
import Sidebar from "./sidebar"

const initialElements = [
    {
      id: 'horizontal-1',
      sourcePosition: 'right',
      type: 'input',
      className: 'dark-node',
      data: { label: 'Input' },
      position: { x: 0, y: 80 },
    },
    {
      id: 'horizontal-2',
      sourcePosition: 'right',
      targetPosition: 'left',
      data: { label: 'A Node' },
      position: { x: 250, y: 0 },
    },
    {
      id: 'horizontal-3',
      sourcePosition: 'right',
      targetPosition: 'left',
      data: { label: 'Node 3' },
      position: { x: 250, y: 160 },
    },
    {
      id: 'horizontal-4',
      sourcePosition: 'right',
      targetPosition: 'left',
      data: { label: 'Node 4' },
      position: { x: 500, y: 0 },
    },
    {
      id: 'horizontal-5',
      sourcePosition: 'top',
      targetPosition: 'bottom',
      data: { label: 'Node 5' },
      position: { x: 500, y: 100 },
    },
    {
      id: 'horizontal-6',
      sourcePosition: 'bottom',
      targetPosition: 'top',
      data: { label: 'Node 6' },
      position: { x: 500, y: 230 },
    },
    {
      id: 'horizontal-7',
      sourcePosition: 'right',
      targetPosition: 'left',
      data: { label: 'Node 7' },
      position: { x: 750, y: 50 },
    },
    {
      id: 'horizontal-8',
      sourcePosition: 'right',
      targetPosition: 'left',
      data: { label: 'Node 8' },
      position: { x: 750, y: 300 },
    },
    {
      id: 'horizontal-e1-2',
      source: 'horizontal-1',
      type: 'step',
      target: 'horizontal-2',
      animated: true,
    },
    {
      id: 'horizontal-e1-3',
      source: 'horizontal-1',
      type: 'step',
      target: 'horizontal-3',
      animated: true,
    },
    {
      id: 'horizontal-e1-4',
      source: 'horizontal-2',
      type: 'step',
      target: 'horizontal-4',
      label: 'edge label',
    },
    {
      id: 'horizontal-e3-5',
      source: 'horizontal-3',
      type: 'step',
      target: 'horizontal-5',
      animated: true,
    },
    {
      id: 'horizontal-e3-6',
      source: 'horizontal-3',
      type: 'step',
      target: 'horizontal-6',
      animated: true,
    },
    {
      id: 'horizontal-e5-7',
      source: 'horizontal-5',
      type: 'smoothstep',
      target: 'horizontal-7',
      animated: true,
    },
    {
      id: 'horizontal-e6-8',
      source: 'horizontal-6',
      type: 'smoothstep',
      target: 'horizontal-8',
      animated: true,
    },
  ];

//const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();
const onNodeMouseEnter = (event, node) => console.log('mouse enter:', node);
const onNodeMouseMove = (event, node) => console.log('mouse move:', node);
const onNodeMouseLeave = (event, node) => console.log('mouse leave:', node);
const onNodeContextMenu = (event, node) => {
  event.preventDefault();
  console.log('context menu:', node);
};



const graphStyles = { width: "100%", height: "300px" }; //You have to add this or else the code wont work

const HorizontalFlow = () => {
    //const [elements, setElements] = useState(initialElements);
    /*const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));*/
    //const onConnect = (params) => {setElements((els) => addEdge(params, els));}
    /*const changeClassName = () => {
        setElements((elms) =>
        elms.map((el) => {
            if (el.type === 'input') {
            el.className = el.className ? '' : 'dark-node';
            }
            return { ...el };
        })
        );
    };*/

    //------------------------------Drag and drop code
        let id = 0;
        const getId = () => `dndnode_${id++}`;
        
        const reactFlowWrapper = useRef(null);
        const [reactFlowInstance, setReactFlowInstance] = useState(null);
        const [elements, setElements] = useState(initialElements);
        const onConnect = (params) => {setElements((els) => addEdge(params, els));}
        const onElementsRemove = (elementsToRemove) =>{
            setElements((els) => removeElements(elementsToRemove, els));}
        const onLoad = (_reactFlowInstance) => {
            setReactFlowInstance(_reactFlowInstance);}
        const onDragOver = (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        };
        const onDrop = (event) => {
            event.preventDefault();
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');
            const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
            id: getId(),
            type,
            position,
            data: { label: `${type} node` },
            };
            setElements((es) => es.concat(newNode));
        };

    //------------------------------Drag and drop code ends


    return (
        <div className="dndflow">
        <ReactFlowProvider>
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                elements={elements}
                onElementsRemove={onElementsRemove}
                onConnect={onConnect}
                onLoad={onLoad}
                
              
                
                style={graphStyles}
                onDrop={onDrop}
                onDragOver={onDragOver}
                >
            
                <Controls />
                </ReactFlow>
            </div>
            <Sidebar/>
        </ReactFlowProvider>
        </div>
    );
};
export default HorizontalFlow;