import React, { useState, useEffect } from 'react';
import QuizSelect from './QuizSelect'
import UsernameSelect from './UsernameSelect';
import Questionboard from './QuestionBoard';
import Scoreboard from './Scoreboard';
import { User, QuizData } from './types';

const App: React.FC = () => {
  const [usernameSelected, setUsernameSelected] = useState<boolean>(false);
  const [userState, setUserState] = useState<User[]>([]);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [quizDataFetched, setQuizDataFetched] = useState(false);


  return (
    <div className = 'root'>
      {
      !usernameSelected ? (
        <div className="usernameSelect">
          <UsernameSelect
            usernameSelected={usernameSelected}
            setUsernameSelected={setUsernameSelected}
            userState={userState}
            setUserState={setUserState}
          />
        </div>
      )
        : 
      !quizDataFetched ? (
        <div className="quizSelect">
          <QuizSelect
            quizDataFetched={quizDataFetched}
            setQuizDataFetched={setQuizDataFetched}
            quizData={quizData}
            setQuizData={setQuizData}
            userState={userState}
            setUserState={setUserState}
          />
        </div>
      ) : (
        <div className="questionBoard">
          <Questionboard
            quizData={quizData}
            setQuizData={setQuizData}
            userState={userState}
            setUserState={setUserState}
          />
        </div>
      )
    }
      <div className="scoreBoard"><Scoreboard userState={userState} setUserState={setUserState} /></div>
    </div>
  );
};

export default App;
