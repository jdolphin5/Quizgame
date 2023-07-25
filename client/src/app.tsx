import React from 'react';
import { useState } from 'react';
import QuestionBoard from './QuestionBoard';
import Scoreboard from './Scoreboard';

const App: React.FC = () => {
  const [userState, setUserState] = useState(0);
  
  return (
    <div className = 'root'>
      <div className="playerBoard"><QuestionBoard userState={userState} setUserState={setUserState}/></div>
      <div className="controlArea"><Scoreboard userState={userState} setUserState={setUserState}/></div>
    </div>
  );
};

export default App;
