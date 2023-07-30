import React, { useState, useEffect } from 'react';
import QuizSelect from './QuizSelect'
import Questionboard from './QuestionBoard';
import Scoreboard from './Scoreboard';
import { User, QuizData } from './types';

const App: React.FC = () => {
  const [userState, setUserState] = useState<User[]>([]);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [quizDataFetched, setQuizDataFetched] = useState(false);

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
      {
        !quizDataFetched ? (
          <div className = "quizSelect"><QuizSelect quizDataFetched={quizDataFetched} setQuizDataFetched={setQuizDataFetched} quizData={quizData} setQuizData={setQuizData} userState={userState} setUserState={setUserState} /></div>
        )
        : (
          <div className="questionBoard"><Questionboard quizData={quizData} setQuizData={setQuizData} userState={userState} setUserState={setUserState} /></div>
        )
      }
      <div className="scoreBoard"><Scoreboard userState={userState} setUserState={setUserState} /></div>
    </div>
  );
};

export default App;
