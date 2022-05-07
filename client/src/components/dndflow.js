import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Handle
} from 'react-flow-renderer';
import Sidebar from './sidebar';
import './dnd.css';
import ConnectionLine from './ConnectionLine'
import CustomEdge from './CustomEdge';

const initialElements = [
  {
    id: 'horizontal-150',
    type: 'default',
    sourcePosition: "top",
    targetPosition: "bottom",
    data: { label: 'input node', mass: "24kg",energy:"14kj" },
    position: { x: 250, y: 5 },
  },
  {
    id: 'horizontal-e0-1',
    source: 'horizontal-0',
    type: 'step',
    target: 'horizontal-1',
    animated: true,
  },
  
];
let id = 0;
const getId = () => `horizontal-${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [sourceHandle,setSourceHandle] = useState({})
  const [targetId,setTargetId] = useState("")
  const [nodeName, setNodeName] = useState('');
  const [nodeMass, setNodeMass] = useState("")
  const [nodeEnergy, setNodeEnergy] = useState("")
  const [elementClickedId, setElementClickedId] = useState("")
  const [elementClickedLabel, setElementClickedLabel] = useState("")




  const onConnect = (params) => {
    //Write something here that does a calculation on params.sourceHandle use data.text or data.whatever
    setSourceHandle(JSON.parse(params.sourceHandle))
    setTargetId(params.target)
    setElements((els) => addEdge({ ...params, animated: true, style: { stroke: '#000' } }, els) )

    console.log("This is the params variable: ",params)
    console.log("These are all the elements:  ",elements)
  };//I Don't understand what's going on here.

  //---------------------------------------useEffect for transfering data via edge connect
  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === targetId) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
         

          el.data = {
            ...el.data,
            mass: sourceHandle.mass ,
            energy: sourceHandle.energy  , 
          }; //Source handle should be an object
        }
        return el;
      })
    );
  }, [sourceHandle, setElements,targetId]); 
  //---------------------------------------


  //---------------------------------------useEffect for editing data in the node
  const onElementClick = (event, element) => {
    console.log('This is the click element: ', element)
    setElementClickedId(element.id)
    
    setNodeName(element.data.label)
    setNodeMass(element.data.mass)
    setNodeEnergy(element.data.energy)

};

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === elementClickedId) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
         

          el.data = {
            ...el.data,
            label: nodeName,
          };
        }
        return el;
      })
    );
  }, [nodeName, setElements,elementClickedId]);


  useEffect(() => {
      setElements((els) =>
        els.map((el) => {
          if (el.id === elementClickedId) {
            // it's important that you create a new object here
            // in order to notify react flow about the change
           

            el.data = {
              ...el.data,
              mass: nodeMass,
            };
          }
          return el;
        })
      );
    }, [nodeMass, setNodeMass,elementClickedId]);

    useEffect(() => {
      setElements((els) =>
        els.map((el) => {
          if (el.id === elementClickedId) {
            // it's important that you create a new object here
            // in order to notify react flow about the change
           

            el.data = {
              ...el.data,
              energy: nodeEnergy,
            };
          }
          return el;
        })
      );
    }, [nodeEnergy, setNodeEnergy,elementClickedId]);
  //---------------------------------------


  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
  const graphStyles = { width: "100%", height: "300px" };
  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const typeO = JSON.parse(type)
    //console.log("This is the type of node: ",typeO)
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    //console.log("This is the current id before newNode: ", id)
    const newNode = {
      id: getId(),
      type: typeO.type,
      sourcePosition: typeO.sourcePosition,
      targetPosition: typeO.targetPosition,
      position,
      data: { label: `${typeO.name} node`,text:"all the info here",mass:"",energy:"", properties:{} },
      
    };
    
    //console.log("This is the current id after newNode: ", id)
    //console.log("This is the newEdgeId before newEdge: ",newEdgeId)
    
    
  
    //console.log("This is the current id after newEdge: ", id)
    //console.log("THis is the newEdge object: ", newEdge)
    //console.log("This is the newNode object: ", newNode)
    setElements((es) => es.concat(newNode));
    
    //console.log("This is the new initialelements array: ",elements)
  };

  const edgeTypes = {
    default: CustomEdge,
  };

  //----------------------------Custom nodes
  const customNodeStyles = {
    background: '#9CA8B3',
    color: '#FFF',
    padding: 10,
  };

  const CustomNodeComponent = ({ data }) => {
    return (
      <div style={customNodeStyles}>
        <Handle type="target" position="left" style={{ borderRadius: 0 }} />
        <div>{data.text}</div>
        <Handle
          type="source"
          position="right"
          id={JSON.stringify(data)}
          style={{ top: '30%', borderRadius: 0 }}
        />
        <Handle
          type="source"
          position="right"
          id="b"
          style={{ top: '70%', borderRadius: 0 }}
        />
      </div>
    );
  };

  const nodeTypes = {
    output: CustomNodeComponent,//This applies to all nodes with the name output
    default: CustomNodeComponent,
    input: CustomNodeComponent
  };
  //------------------------------Custom nodes end
  


  return (
    <div className="dndflow">
      <ReactFlowProvider>
        
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            elements={elements}
            onConnect={onConnect}
            onElementClick={onElementClick}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={graphStyles}
            connectionLineComponent={ConnectionLine}
          >
            <Controls />
          </ReactFlow>
          
        </div>
        

            <Sidebar />
            <label>label:</label>
                    <input
                        value={nodeName}
                        onChange={(evt) => setNodeName(evt.target.value)}
                    />
                    <label>label:Mass</label>
                    <input
                        value={nodeMass}
                        onChange={(evt) => setNodeMass(evt.target.value)}
                    />
                    <label>label:Energy</label>
                    <input
                        value={nodeEnergy}
                        onChange={(evt) => setNodeEnergy(evt.target.value)}
                    />
        
      </ReactFlowProvider>
    </div>
  );
};
export default DnDFlow;