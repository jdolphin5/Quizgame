import React, { useState, useEffect } from 'react';
import Questionboard from './Questionboard';
import Scoreboard from './Scoreboard';
import { User } from './types';

const App: React.FC = () => {
  const [userState, setUserState] = useState<User[]>([]);

  useEffect(() => {
    const myUser: User = {
      user_id: 1,
      username: "test_user",
      question_and_answer: {},
      score: 0,
    };

    setUserState([...userState, myUser]);
  }, []);

  return (
    <div className = 'root'>
      <div className="questionBoard"><Questionboard userState={userState} setUserState={setUserState}/></div>
      <div className="scoreBoard"><Scoreboard userState={userState} setUserState={setUserState}/></div>
    </div>
  );
};

export default App;
