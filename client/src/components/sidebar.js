import React from 'react';
export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, `"type":'input'`)} draggable style={{borderStyle: "dotted", borderColor: "red", width: 100, textAlign: "center"}}>
        Input Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, `{"type":"default","name":"HeatX", "sourcePosition": "right", "targetPosition": "left" }`)} draggable>
        HeatX 
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, `{"type":"default", "name":"Distillation", "sourcePosition": "right", "targetPosition": "left"}`)} draggable>
        Distillation column 
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, `{"type":"output", "name":"Test", "sourcePosition": "right", "targetPosition": "left"}`)} draggable>
        Output Node
      </div>
    </aside>
  );
};