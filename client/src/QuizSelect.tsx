import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
    Button,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Slider,
    Typography,
} from '@mui/material';
import { QuizSelectProps, Quiz } from './types';

let numQuestions = 5;

const QuizSelect: React.FC<QuizSelectProps> = ({
    timerValue,
    setTimerValue,
    quizDataFetched,
    setQuizDataFetched,
    quizData,
    setQuizData,
    userState,
    setUserState,
}) => {
    //useState hook needed for any value that either effects the rendering of the React component
    //or that does not remain constant over the lifecycle of the component
    const [quizDataOptions, setQuizDataOptions] = useState<Quiz[] | null>(null);
    const [selectedQuizId, setSelectedQuizId] = useState<number>(-1);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/quiz`) // /api/quiz/${quizId}/questions/${numQuestions} route
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
        if (selectedQuizId !== -1) {
            numQuestions = 5;
            axios
                .get(
                    `http://localhost:3000/api/quiz/${selectedQuizId}/questions/${numQuestions}`
                ) // /api/quiz/${quizId}/questions/${numQuestions} route
                .then((response: any) => {
                    console.log('quiz selected and selected quiz returned');
                    setQuizData(response.data); // Update the state with the fetched quiz data
                    setQuizDataFetched(true);
                })
                .catch((error: any) => {
                    console.error('Error fetching quiz data:', error);
                });
        }
    };

    const handleChange = (event: SelectChangeEvent<number>) => {
        const selectedValue = event.target.value;
        console.log(selectedValue);
        if (typeof selectedValue === 'number') {
            setSelectedQuizId(selectedValue);
        }
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setTimerValue(newValue as number);
        // Other handling logic based on the new value can be added here
    };

    return (
        <div>
            <div className="header2">
                <div className="gameName">Quiz Game</div>
                <div className="quizName">Select Quiz</div>
                <div className="timer"></div>
            </div>
            <div className="body2">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="quizSelectContainer">
                        <div className="quizSelect-row-1-col-1">
                            <Typography id="quiz-dropdown" gutterBottom>
                                Select a quiz topic
                            </Typography>
                        </div>
                        <div className="quizSelect-row-1-col-2">
                            <FormControl>
                                <Select
                                    labelId="simple-select-label"
                                    value={selectedQuizId}
                                    onChange={handleChange}
                                >
                                    {quizDataOptions?.map((quizOption) => {
                                        return (
                                            <MenuItem
                                                key={quizOption.quiz_id}
                                                value={quizOption.quiz_id}
                                            >
                                                {quizOption.title}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className="quizSelect-row-2-col-1">
                            <Typography id="slider" gutterBottom>
                                Timer (seconds): {timerValue}
                            </Typography>
                        </div>
                        <div className="quizSelect-row-2-col-2">
                            <Slider
                                aria-label="Slider"
                                onChange={handleSliderChange}
                                valueLabelDisplay="off"
                                defaultValue={10}
                                step={5}
                                marks
                                min={5}
                                max={30}
                            />
                        </div>
                        <div className="quizSelect-row-3-col-1">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Start Quiz
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuizSelect;
