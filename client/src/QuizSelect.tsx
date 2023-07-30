import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { QuizSelectProps, Quiz } from './types';
import axios from 'axios';

let quizId = 1;
let numQuestions = 5;

const QuizSelect: React.FC<QuizSelectProps> = ({ quizDataFetched, setQuizDataFetched, quizData, setQuizData, userState, setUserState }) => {

    //useState hook needed for any value that either effects the rendering of the React component
    //or that does not remain constant over the lifecycle of the component
    const [quizDataOptions, setQuizDataOptions] = useState<Quiz[] | null>(null);
    

    useEffect(() => {
        axios.get(`http://localhost:3000/api/quiz`) // /api/quiz/${quizId}/questions/${numQuestions} route
          .then((response: any) => {
            console.log(response.data);
            setQuizDataOptions(response.data); // Update the state with the fetched quiz data
        })
          .catch((error: any) => {
            console.error('Error fetching quiz data:', error);
          });

      }, []);

    const handleQuizButtonClick = (selectedQuizId : number) => {
        quizId = selectedQuizId;
        numQuestions = 5;
        axios.get(`http://localhost:3000/api/quiz/${quizId}/questions/${numQuestions}`) // /api/quiz/${quizId}/questions/${numQuestions} route
        .then((response: any) => {
            console.log("quiz selected and selected quiz returned");
            setQuizData(response.data); // Update the state with the fetched quiz data
            setQuizDataFetched(true);
            })
        .catch((error: any) => {
            console.error('Error fetching quiz data:', error);
        });
    }

    return (
        <div>
            <div className="header2">
                <div className="gameName">
                    Quiz Game
                </div>
                <div className="quizName">Select Quiz</div>
                <div className="timer"></div>
            </div>
            <div className="body2">
                
                <div>
                <h2>Select Quiz</h2>
                    {quizDataOptions !== null ? (
                        quizDataOptions.map((quizOption) => (
                        <Button
                            key={quizOption.quiz_id}
                            variant="contained"
                            color="primary"
                            onClick={() => handleQuizButtonClick(quizOption.quiz_id)}
                        >
                            {quizOption.title}
                        </Button>
                        ))
                    )
                    
                    
                    : (
                        <p>Loading...</p>
                    )}
                    <h4>Please select a Quiz above</h4>
                </div>
            </div>
        </div>
      );
    };

export default QuizSelect;