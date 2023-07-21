import React from 'react';
import { useState } from 'react';
import PlayerBoard from './PlayerBoard';
import ControlArea from './ControlArea';

const App: React.FC = () => {
  const [sharedState, setSharedState] = useState(0);
  return (
    <div className = 'root'>
      <div className="playerBoard"><PlayerBoard sharedState={sharedState} setSharedState={setSharedState}/></div>
      <div className="controlArea"><ControlArea sharedState={sharedState} setSharedState={setSharedState}/></div>
    </div>
  );
};

export default App;
