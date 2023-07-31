import React, { useState, useEffect } from 'react';
import { Radio, FormLabel, RadioGroup, FormControl, FormControlLabel
} from '@mui/material';
import { QuestionboardProps, Answer, Question } from './types';
import QuestionTimer from './timer';

const quizId = 1;
const numQuestions = 5;

const Questionboard: React.FC<QuestionboardProps> = ({ quizData, setQuizData, userState, setUserState }) => {

    //useState hook needed for any value that either effects the rendering of the React component
    //or that does not remain constant over the lifecycle of the component
    //const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [quizDataFetched, setQuizDataFetched] = useState(true); //need to toggle when loading page
    const [quizTitle, setQuizTitle] = useState<string>("");
    const [questionNumber, setQuestionNumber] = useState<number>(0);
    const [question, setQuestion] = useState<Question | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [shuffledAnswers, setShuffledAnswers] = useState<Answer[]>([]);
    const [correctAnsId, setCorrectAnsId] = useState<number>(0);
    const [hasAnsweredQuestion, setHasAnsweredQuestion] = useState<boolean>(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
    const [timerLapsed, setTimerLapsed] = useState<boolean>(false);
    const [shouldReset, setShouldReset] = useState<boolean>(true);

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

                const myUser = userState[0];
                let myScore = myUser.score;
                let selectedAnswerId = -1;

                answers.forEach((answer) => {
                    if (answer.answer_id === selectedAnswer) {
                    selectedAnswerId = answer.answer_id;
                    }
                });

                if (selectedAnswerId === correctAnsId) {
                    //setUserState(userState + 1);
                    myScore++;
                }

                if (myUser && question) {
                    const updatedUser = {
                        ...myUser,
                        question_and_answer: {
                            ...myUser.question_and_answer,
                            [question.question_id]: selectedAnswerId,
                        },
                        score: myScore,
                    }
                    const updatedUsers = userState.map((user) =>
                        user.user_id === myUser.user_id ? updatedUser : user
                    );
                    setUserState(updatedUsers);
                    console.log(updatedUser);
                };
            }


            setSelectedAnswer(-1);
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

export default Questionboard;