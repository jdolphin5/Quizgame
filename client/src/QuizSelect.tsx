import React, { useState, useEffect } from 'react';
import { Button, Select, FormControl, MenuItem, SelectChangeEvent } from '@mui/material';
import { QuizSelectProps, Quiz } from './types';
import axios from 'axios';

let quizId: number = 1;
let numQuestions = 5;

const QuizSelect: React.FC<QuizSelectProps> = ({ quizDataFetched, setQuizDataFetched, quizData, setQuizData, userState, setUserState }) => {

    //useState hook needed for any value that either effects the rendering of the React component
    //or that does not remain constant over the lifecycle of the component
    const [quizDataOptions, setQuizDataOptions] = useState<Quiz[] | null>(null);
    const [selectedQuizId, setSelectedQuizId] = useState<number>(-1);
    

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(selectedQuizId);
        if (selectedQuizId !== undefined) {
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
    }

    const handleChange = (event: SelectChangeEvent<number>) => {
        const selectedValue = event.target.value;
        console.log(selectedValue);
        if (typeof selectedValue === 'number') {
            setSelectedQuizId(selectedValue);
        }
    };

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
                <form autoComplete="off" onSubmit={handleSubmit}>
                <FormControl>
                    <Select
                        labelId="simple-select-label"
                        value={selectedQuizId}
                        onChange={handleChange}
                        displayEmpty // Add this if you want to display an empty option
                    >
                        {/* Looping through the array */}
                        {quizDataOptions?.map((quizOption) => {
                        return <MenuItem key={quizOption.quiz_id} value={quizOption.quiz_id}>{quizOption.title}</MenuItem>;
                        })}
                    </Select>
                    <Button variant="contained" color="primary" type="submit">
                    Submit
                    </Button>
                    </FormControl>
                </form>
                    <h4>Please select a Quiz above</h4>
                </div>
            </div>
        </div>
      );
    };

export default QuizSelect;