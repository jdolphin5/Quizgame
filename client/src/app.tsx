import React from 'react';
import { useState } from 'react';
import Questionboard from './Questionboard';
import Scoreboard from './Scoreboard';

const App: React.FC = () => {
  const [userState, setUserState] = useState(0);
  
  return (
    <div className = 'root'>
      <div className="questionBoard"><Questionboard userState={userState} setUserState={setUserState}/></div>
      <div className="scoreBoard"><Scoreboard userState={userState} setUserState={setUserState}/></div>
    </div>
  );
};

export default App;
