import React, { useState, useEffect } from 'react';
import { Radio, FormLabel, RadioGroup, FormControl, FormControlLabel
} from '@mui/material';
import { QuizData, PlayerBoardProps, Answer, Question } from './types';
import QuestionTimer from './timer';
import axios from 'axios';

let correctApplied = false;
const quizId = 1;
const numQuestions = 5;

const PlayerBoard: React.FC<PlayerBoardProps> = ({ userState, setUserState }) => {
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [quizDataFetched, setQuizDataFetched] = useState(false);
    const [questionNumber, setQuestionNumber] = useState<number>(0);
    const [shuffledAnswers, setShuffledAnswers] = useState<Answer[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [question, setQuestion] = useState<Question | null>(null);
    const [correctAnsId, setCorrectAnsId] = useState<number>(0);
    const [quizTitle, setQuizTitle] = useState<string>("");
    const [timerLapsed, setTimerLapsed] = useState<boolean>(false);
    const [shouldReset, setShouldReset] = useState<boolean>(true);
    const [hasAnsweredQuestion, setHasAnsweredQuestion] = useState<boolean>(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);

    
    useEffect(() => {
        axios.get(`http://localhost:3000/api/quiz/${quizId}/questions/${numQuestions}`) // /api/quiz/${quizId}/questions/${numQuestions} route
          .then((response: any) => {
            setQuizData(response.data); // Update the state with the fetched quiz data
            setQuizDataFetched(true);
        })
          .catch((error: any) => {
            console.error('Error fetching quiz data:', error);
          });

      }, []);

    useEffect(() => {
        if (quizDataFetched && quizData && shuffledAnswers.length === 0) {
            setShuffledAnswers(shuffleAnswers(answers));
        }
        setTimerLapsed(false);
    }, [answers, quizDataFetched]);
    

    useEffect(() => {
        if (quizData && questionNumber >= 0 && questionNumber < quizData.questions.length) {
          let currentQuestion = quizData.questions[questionNumber];
          let answers = quizData.answers.filter(ans => ans.question_id === currentQuestion.question_id);
          let correctAnsId: number = 0;
          answers.forEach((answer) => {
            if (answer.is_correct) {
              correctAnsId = answer.answer_id;
            }
          });

        if (questionNumber >= numQuestions-1) {
            setShouldReset(false);
        }
          
        setHasAnsweredQuestion(false);
        setQuestion(currentQuestion);
        setAnswers(answers);
        setCorrectAnsId(correctAnsId);
        setQuizTitle(quizData.quiz.title);
        setShuffledAnswers([]);
        }
      }, [questionNumber, quizData]);

    useEffect(() => {
        if (timerLapsed) {
            if (questionNumber < numQuestions-1) { //increment from 0 to numQuestions-1
                setQuestionNumber(questionNumber+1);
            }
            if (!hasAnsweredQuestion) {
                setHasAnsweredQuestion(true);
                console.log(selectedAnswer);
                console.log(correctAnsId);
                if (selectedAnswer === correctAnsId) {
                    setUserState(userState + 1);
                }
            }
        }
    }, [timerLapsed])

    if (!quizData) {
        return <div>Loading...</div>;
    }

    console.log(quizData);

    
    const shuffleAnswers = (array: Answer[]) => { 
        for (let i = array.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array;
    };

    console.log(correctAnsId);

    let selectedAns: number = -1;

    const handleChange = (event: any) => {
      setSelectedAnswer(+event.target.value); //convert value of the selectedAnswer from string to number
    }

    const handleTimeUp = () => {
        setTimerLapsed(true);
    }

    return (
        <div>
            <div className="header2">
                <div className="gameName">
                    Quiz Game
                </div>
                <div className="quizName">{quizTitle}</div>
                <div className="timer">Timer: <p>{<QuestionTimer shouldReset={shouldReset} timeLimit={10} onTimeUp={handleTimeUp} />}</p></div>
            </div>
            <div className="body2">
                <h2>Question {questionNumber+1}</h2>
                <h2>{question?.question_text}</h2>

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