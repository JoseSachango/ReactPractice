import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';
export default memo(({ data }) => {
  return (
    <>
      <Handle
        type="target"
        position="left"
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
      />
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
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: 10, background: '#555' }}
      />
      <Handle
        type="source"
        position="right"
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
      />
    </>
  );
});