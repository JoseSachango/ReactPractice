import React, { useEffect, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Handle
} from 'react-flow-renderer';
//import CustomUpdateNode from "./customUpdateNode"
//import './updatenode.css';
const initialElements = [
  { id: '1', data: { label: '-' }, position: { x: 100, y: 100 }, type: "spoon"  },
  { id: '2', data: { label: 'Node 2', mass:"50kg", energy:"16kj"  }, position: { x: 100, y: 200 },  },
  { id: '3', data: { label: 'Node 3', mass:"24kg", energy:"64kj"  }, position: { x: 300, y: 150 },  },
  { id: '4', data: { label: 'Node 4', mass:"20kg", energy:"14kj" }, position: { x: 500, y: 150 },  },
  { id: '5', data: { label: 'Node 5', mass:"54kg", energy:"94kj"  }, position: { x: 700, y: 100},  },
  { id: 'e1-2', source: '1', target: '2', },
];

const graphStyles = { width: "100%", height: "300px" }; //You have to add this or else the code wont work

const customNodeStyles = {
    background: '#9CA8B3',
    color: '#FFF',
    padding: 10,
  };

/*const onElementClick = (event, element) => {
    console.log('This is the click element: ', element)
    setElementClickedId(element.id)

};*/

const UpdateNode = () => {
    const [elements, setElements] = useState(initialElements);
    const [nodeName, setNodeName] = useState('');
    const [nodeMass, setNodeMass] = useState("")
    const [nodeEnergy, setNodeEnergy] = useState("")
    const [nodeBg, setNodeBg] = useState('#eee');
    const [elementInput, setElementInput] = useState()
    const [elementClickedId, setElementClickedId] = useState("")
    const [elementClickedLabel, setElementClickedLabel] = useState("") // Need this when you don't want to change the label of the element you clicked on
    const onConnect = (params) => {
        //Write something here that does a calculation on params.sourceHandle use data.text or data.whatever
        params.targetHandle = params.sourceHandle
        setElements((els) => addEdge({ ...params, animated: true, style: { stroke: '#000' } }, els) )
    
        console.log("This is the params variable: ",params)
      };

    const onElementClick = (event, element) => {
        console.log('This is the click element: ', element)
        setElementClickedId(element.id)
        setElementClickedLabel(element.data.label)
        setNodeName(element.data.label)
        setNodeMass(element.data.mass)
        setNodeEnergy(element.data.energy)
    
    };
    //create an element input every time a node is dropped on the canvas
    //switch to editing that element input whenever you click on the node
    // use useState to transfer values between different nodes when the edges connect
    // The key's are use state and use effect

    const [nodeHidden, setNodeHidden] = useState(false);

    //--------------------------
    
    //-------------------------

    // Do I have to generate multiple use effects or can I just use one? 
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


    


   



    return (
    <>   
      <ReactFlow 
      elements={elements} 
      defaultZoom={1.5}
      onConnect={onConnect} 
      minZoom={0.2} 
      maxZoom={4} 
      onElementClick={onElementClick}
      style={graphStyles}
      nodeTypes={{spoon: ({ data }) => {
          return(
            <div style={customNodeStyles}>
                <Handle type="target" position="left" style={{ borderRadius: 0 }} />
                <div>{data.label}</div>
                
                <Handle
                    type="source"
                    position="right"
                    id="a"
                    style={{ top: '30%', borderRadius: 0 }}
                />
                <Handle
                    type="source"
                    position="right"
                    id="b"
                    style={{ top: '70%', borderRadius: 0 }}
                />
            </div>

          )
      }}}
      >


      </ReactFlow>
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
               



        {/*<div className="updatenode__controls">
          <label>label:</label>
          <input
            value={nodeName}
            onChange={(evt) => setNodeName(evt.target.value)}
          />
          <label className="updatenode__bglabel">background:</label>
          <input value={nodeBg} onChange={(evt) => setNodeBg(evt.target.value)} />
          <div className="updatenode__checkboxwrapper">
            <label>hidden:</label>
            <input
              type="checkbox"
              checked={nodeHidden}
              onChange={(evt) => setNodeHidden(evt.target.checked)}
            />
          </div>
        </div>*/}
    </>
    );
  };
  export default UpdateNode;