import React from 'react';
import { useState } from 'react';
import PlayerBoard from './PlayerBoard';
import ControlArea from './ControlArea';

const App: React.FC = () => {
  const [userState, setUserState] = useState(0);
  
  return (
    <div className = 'root'>
      <div className="playerBoard"><PlayerBoard userState={userState} setUserState={setUserState}/></div>
      <div className="controlArea"><ControlArea userState={userState} setUserState={setUserState}/></div>
    </div>
  );
};

export default App;
