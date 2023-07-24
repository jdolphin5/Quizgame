import React, { useState, useEffect} from 'react';
import { Radio, FormLabel, RadioGroup, FormControl, FormControlLabel
} from '@mui/material';
import { QuizData, PlayerBoardProps, Answer, Question } from './types';
import QuestionTimer from './timer';

let correctApplied = false;
let shuffleAnswersNum = 0;

const PlayerBoard: React.FC<PlayerBoardProps> = ({ sharedState, setSharedState, quizData, setQuizData }) => {

    if (!quizData) {
        return <div>Loading...</div>;
    }

    console.log(quizData);

    const quizTitle = quizData.quiz.title;
    const firstQuestion = quizData.questions[0];
    const answers = quizData.answers.filter(ans => ans.question_id === firstQuestion.question_id);

    const [shuffledAnswers, setShuffledAnswers] = useState<Answer[]>([]);

    const shuffleAnswers = (array: Answer[]) => { 
        for (let i = array.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array;
    };

    useEffect(() => {
        const shuffled = shuffleAnswers(answers);
        setShuffledAnswers(shuffled);
    }, [shuffleAnswersNum]);

    let correctAnsId: number = 0;
    answers.forEach((answer) => {
        if (answer.is_correct) {
            correctAnsId = answer.answer_id;
        }
    });
    console.log(correctAnsId);

    let questionNumber = 1;

    let selectedAns: number = -1;

    const handleChange = (event: any) => {
      selectedAns = +event.target.value; //convert value of the selectedAnswer from string to number
      if (selectedAns === correctAnsId && !correctApplied) {
        setSharedState(sharedState + 1);
        correctApplied = true;
      }
    }

    const handleTimeUp = () => {

    }

    return (
        <div>
            <div className="header2">
                <div className="gameName">
                    {quizTitle}
                </div>
                <div className="quizName">Geography Quiz</div>
                <div className="timer">Timer: <p>{<QuestionTimer timeLimit={10} onTimeUp={handleTimeUp} />}</p></div>
            </div>
            <div className="body2">
                <h2>Question {questionNumber}</h2>
                <h2>{firstQuestion.question_text}</h2>

                <FormControl>
                    <FormLabel id="questionForm"><h2>Answers:</h2></FormLabel>
                    <RadioGroup aria-labelledby="questionLabel" name="radio-buttons-group">
                    {
                        shuffledAnswers.map((answer, i) => (
                            <FormControlLabel key={answer.answer_id} value={answer.answer_id} control={<Radio />} label={answer.answer_text} onChange={handleChange}/>
                        ))
                    }
                    </RadioGroup>
                </FormControl>
                
                <h4>Please select an answer above</h4>
            </div>
        </div>
      );
    };

export default PlayerBoard;