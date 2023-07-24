import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PlayerBoard from './PlayerBoard';
import ControlArea from './ControlArea';
import { QuizData } from './types';

const App: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [sharedState, setSharedState] = useState(0);
  
  useEffect(() => {
    const quizId = 1;
    const numQuestions = 5;
    axios.get(`http://localhost:3000/api/quiz/${quizId}/questions/${numQuestions}`) // Send a GET request to your server's /api/quiz route
      .then((response: any) => {
        setQuizData(response.data); // Update the state with the fetched quiz data
      })
      .catch((error: any) => {
        console.error('Error fetching quiz data:', error);
      });
  }, []);
  
  return (
    <div className = 'root'>
      { quizData !== null && (
      <div className="playerBoard"><PlayerBoard sharedState={sharedState} quizData={quizData} setSharedState={setSharedState} setQuizData={setQuizData}/></div>
      )}
      <div className="controlArea"><ControlArea sharedState={sharedState} setSharedState={setSharedState}/></div>
    </div>
  );
};

export default App;
