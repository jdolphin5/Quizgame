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
import QuestionTimer from './QuestionTimer';
import ResultsPage from './ResultsPage';

const Questionboard: React.FC<QuestionboardProps> = ({
    timerValue,
    setTimerValue,
    numberOfQuestions,
    setNumberOfQuestions,
    quizData,
    setQuizData,
    userState,
    setUserState,
}) => {
    //useState hook needed for any value that either effects the rendering of the React component
    //or that does not remain constant over the lifecycle of the component
    const [quizTitle, setQuizTitle] = useState<string>(''); //can remove this
    const [questionNumber, setQuestionNumber] = useState<number>(0);
    const [question, setQuestion] = useState<Question | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [shuffledAnswers, setShuffledAnswers] = useState<Answer[]>([]); //can make this a normal const <Answer[]>
    const [correctAnsId, setCorrectAnsId] = useState<number>(0); // can make this a const <number>
    const [hasAnsweredQuestion, setHasAnsweredQuestion] =
        useState<boolean>(false); //can make this a const <boolean>
    const [selectedAnswer, setSelectedAnswer] = useState<number>(-1); //can make this a const <number>
    const [timerLapsed, setTimerLapsed] = useState<boolean>(false);
    const [shouldReset, setShouldReset] = useState<boolean>(true); //can make this a const <boolean> as it depends on questionNumber and numberOfQuestions
    const [quizComplete, setQuizComplete] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false); //try making this a const <boolean> and see if you can conditionally render the modal button
    const [userResults, setUserResults] = useState<Result[]>([]); //try making this a const <Result[]> and see if you can conditionally render the modal button

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
            let localCorrectAnsId: number = 0;
            answers.forEach((answer) => {
                if (answer.is_correct) {
                    localCorrectAnsId = answer.answer_id;
                }
            });

            if (questionNumber >= numberOfQuestions - 1) {
                setShouldReset(false);
            }

            setHasAnsweredQuestion(false);
            setQuestion(currentQuestion);
            setAnswers(answers);
            setCorrectAnsId(localCorrectAnsId);
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
            if (questionNumber < numberOfQuestions - 1) {
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
    console.log('question number: '.concat(String(questionNumber)));
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
        <div data-testid="questionBoard">
            <div className="header2">
                <div className="gameName" data-testid="gameName">
                    Quiz Game
                </div>
                <div className="quizName" data-testid="quizName">
                    {quizData.quiz.title}
                </div>
                <div className="timer">
                    Timer:{' '}
                    <div className="timerInner">
                        {
                            <QuestionTimer
                                shouldReset={shouldReset}
                                timeLimit={timerValue}
                                onTimeUp={handleTimeUp}
                            />
                        }
                    </div>
                </div>
            </div>
            <div className="body2">
                <h2>Question {questionNumber + 1}</h2>
                <h2 data-testid="questionText">{question?.question_text}</h2>

                <FormControl data-testid="formControl">
                    <FormLabel id="questionForm" data-testid="formLabel">
                        <h2>Answers:</h2>
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="questionLabel"
                        name="radio-buttons-group"
                        data-testid="radioGroup"
                    >
                        {shuffledAnswers.map((answer, i) => (
                            <FormControlLabel
                                data-testid={answer.answer_id}
                                key={answer.answer_id}
                                value={answer.answer_id}
                                control={<Radio />}
                                label={answer.answer_text}
                                onChange={handleAnswerSelectChange}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
                <div
                    className="showHideQuizComplete"
                    data-testid="showHideQuizComplete"
                >
                    {quizComplete ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleShowModal}
                            data-testid="modalButton"
                        >
                            Show Results
                        </Button>
                    ) : (
                        <h4 data-testid="questionSubtext">
                            Please select an answer above
                        </h4>
                    )}
                </div>
            </div>
            {showModal && (
                <ResultsPage
                    userResults={userResults}
                    userState={userState}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    data-testid="resultsPage"
                />
            )}
        </div>
    );
};

export default Questionboard;
