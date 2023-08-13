import React, { useState, useEffect } from 'react';
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { QuestionboardProps, Answer, Question, QandA, Result } from './types';
import QuestionTimer from './timer';
import ResultsPage from './ResultsPage';

const numQuestions = 5;

const Questionboard: React.FC<QuestionboardProps> = ({
    timerValue,
    setTimerValue,
    quizData,
    setQuizData,
    userState,
    setUserState,
}) => {
    //useState hook needed for any value that either effects the rendering of the React component
    //or that does not remain constant over the lifecycle of the component
    const [quizTitle, setQuizTitle] = useState<string>('');
    const [questionNumber, setQuestionNumber] = useState<number>(0);
    const [question, setQuestion] = useState<Question | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [shuffledAnswers, setShuffledAnswers] = useState<Answer[]>([]);
    const [correctAnsId, setCorrectAnsId] = useState<number>(0);
    const [hasAnsweredQuestion, setHasAnsweredQuestion] =
        useState<boolean>(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
    const [timerLapsed, setTimerLapsed] = useState<boolean>(false);
    const [shouldReset, setShouldReset] = useState<boolean>(true);
    const [quizComplete, setQuizComplete] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [userResults, setUserResults] = useState<Result[]>([]);

    //every time the question number is updated, grab the question and answers and correctanswer's id
    useEffect(() => {
        if (
            quizData &&
            questionNumber >= 0 &&
            questionNumber < quizData.questions.length
        ) {
            let currentQuestion = quizData.questions[questionNumber];
            let answers = quizData.answers.filter(
                (ans) => ans.question_id === currentQuestion.question_id
            );
            let correctAnsId: number = 0;
            answers.forEach((answer) => {
                if (answer.is_correct) {
                    correctAnsId = answer.answer_id;
                }
            });

            if (questionNumber >= numQuestions - 1) {
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

    //shuffle answers every time a question is loading
    useEffect(() => {
        if (quizData && shuffledAnswers.length === 0) {
            setShuffledAnswers(shuffleAnswers(answers));
        }
        setTimerLapsed(false);
    }, [answers]);

    //when the timer runs out, update userState accordingly
    useEffect(() => {
        if (timerLapsed) {
            if (questionNumber < numQuestions - 1) {
                //questionNumber from 0 to numQuestions-1
                setQuestionNumber(questionNumber + 1);
            } else {
                //timer lapsed and no more questions => quiz completed
                setQuizComplete(true);
            }

            //record answer_id selected for question and update userState
            //to include this info + increment total score if correct
            if (!hasAnsweredQuestion) {
                setHasAnsweredQuestion(true);

                const myUser = userState[0];
                let myScore = myUser.score;
                let selectedAnswerId = -1;
                let questionAnswer = myUser.question_and_answer;

                answers.forEach((answer) => {
                    if (answer.answer_id === selectedAnswer) {
                        selectedAnswerId = answer.answer_id;
                    }
                });

                if (selectedAnswerId === correctAnsId) {
                    myScore++;
                }

                //update user in userState array
                if (myUser && question) {
                    const pair: QandA = {
                        question_id: question.question_id,
                        answer_id: selectedAnswerId,
                    };
                    questionAnswer.push(pair);
                    const updatedUser = {
                        ...myUser,
                        question_and_answer: questionAnswer,
                        score: myScore,
                    };
                    const updatedUsers = userState.map((user) =>
                        user.user_id === myUser.user_id ? updatedUser : user
                    );
                    setUserState(updatedUsers);
                    console.log(updatedUser);
                }
                if (question !== null)
                    addToResults(question, shuffledAnswers, selectedAnswerId);
            }

            setSelectedAnswer(-1);
        }
    }, [timerLapsed]);

    useEffect(() => {
        if (quizComplete) {
        }
    }, [quizComplete]);

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

    const addToResults = (
        questionToAdd: Question,
        shuffledAnswersToAdd: Answer[],
        selectedAnswerIdToAdd: number
    ) => {
        const result: Result = {
            question: questionToAdd,
            answers: shuffledAnswersToAdd,
            selected_answer_id: selectedAnswerIdToAdd,
        };
        setUserResults([...userResults, result]);
    };

    const handleAnswerSelectChange = (event: any) => {
        setSelectedAnswer(+event.target.value); //convert value of the selectedAnswer from string to number
    };

    const handleTimeUp = () => {
        setTimerLapsed(true);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    return (
        <div>
            <div className="header2">
                <div className="gameName">Quiz Game</div>
                <div className="quizName">{quizTitle}</div>
                <div className="timer">
                    Timer:{' '}
                    <p>
                        {
                            <QuestionTimer
                                shouldReset={shouldReset}
                                timeLimit={timerValue}
                                onTimeUp={handleTimeUp}
                            />
                        }
                    </p>
                </div>
            </div>
            <div className="body2">
                <h2>Question {questionNumber + 1}</h2>
                <h2>{question?.question_text}</h2>

                <FormControl>
                    <FormLabel id="questionForm">
                        <h2>Answers:</h2>
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="questionLabel"
                        name="radio-buttons-group"
                    >
                        {shuffledAnswers.map((answer, i) => (
                            <FormControlLabel
                                key={answer.answer_id}
                                value={answer.answer_id}
                                control={<Radio />}
                                label={answer.answer_text}
                                onChange={handleAnswerSelectChange}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
                <div className="showHideQuizComplete">
                    {quizComplete ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleShowModal}
                        >
                            Show Results
                        </Button>
                    ) : (
                        <h4>Please select an answer above</h4>
                    )}
                </div>
            </div>
            {showModal && (
                <ResultsPage
                    userResults={userResults}
                    userState={userState}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            )}
        </div>
    );
};

export default Questionboard;
