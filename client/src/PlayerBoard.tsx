import React, { useState, useEffect, useRef } from 'react';
import { Radio, FormLabel, RadioGroup, FormControl, FormControlLabel
} from '@mui/material';
import { QuizData, PlayerBoardProps, Answer, Question } from './types';

let correctApplied = false;
let shuffleAnswersNum = 0;

const PlayerBoard: React.FC<PlayerBoardProps> = ({ sharedState, setSharedState, quizData, setQuizData }) => {
    
    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef<any>(null);

    const [timer, setTimer] = useState('00:00:00');
 
    const getTimeRemaining = (e: any) => {
        const total = Date.parse(e) - Date.parse(new Date().toString());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
 
    const startTimer = (e: any) => {
        let { total, hours, minutes, seconds }
                    = getTimeRemaining(e);
        if (total >= 0) {
 
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
 
    const clearTimer = (e: any) => {
 
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next   
        setTimer('00:00:10');
 
        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
 
        // This is where you need to adjust if
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 10);
        return deadline;
    }

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

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



    return (
        <div>
            <div className="header2">
                <div className="gameName">
                    {quizTitle}
                </div>
                <div className="quizName">Geography Quiz</div>
                <div className="timer">Reading Timer: <p>{timer}</p></div>
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