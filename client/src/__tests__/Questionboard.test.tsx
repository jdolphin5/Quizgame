import React from 'react';
import {
    act,
    cleanup,
    fireEvent,
    render,
    screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Questionboard from '../Questionboard';
import { QuizData, User } from '../types';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.clearAllTimers();
    cleanup(); // Resets the DOM after each test suite
});

/*
export interface QuizData {
    quiz: {
        quiz_id: number;
        title: string;
        category: string;
    };
    questions: Array<Question>;
    answers: Array<Answer>;
}
*/

test('Questionboard renders correctly', () => {
    const timerValue: number = 10;
    const setTimerValue: any = jest.fn();
    const numberOfQuestions: number = 1;
    const setNumberOfQuestions: any = jest.fn();
    const quizData: QuizData | null = {
        quiz: {
            category: 'Tennis',
            quiz_id: 1,
            title: 'Tennis Quiz',
        },
        questions: [
            {
                question_id: 5,
                question_text:
                    'How many players are there in a standard singles tennis match?',
                quiz_id: 1,
            },
        ],
        answers: [
            {
                answer_id: 17,
                answer_text: '1',
                question_id: 5,
                is_correct: false,
            },
            {
                answer_id: 18,
                question_id: 5,
                answer_text: '2',
                is_correct: true,
            },
            {
                answer_id: 19,
                question_id: 5,
                answer_text: '4',
                is_correct: false,
            },
            {
                answer_id: 20,
                question_id: 5,
                answer_text: '6',
                is_correct: false,
            },
        ],
    };
    const setQuizData: any = jest.fn();
    const userState: Array<User> = [
        {
            user_id: 1,
            username: 'happy_camper',
            question_and_answer: [], //key-value question_id : answer_id
            score: 0,
        },
    ];
    const setUserState: any = jest.fn();

    render(
        <Questionboard
            timerValue={timerValue}
            setTimerValue={setTimerValue}
            numberOfQuestions={numberOfQuestions}
            setNumberOfQuestions={setNumberOfQuestions}
            quizData={quizData}
            setQuizData={setQuizData}
            userState={userState}
            setUserState={setUserState}
        />
    );

    const questionBoard = screen.getByTestId('questionBoard');
    const gameName = screen.getByTestId('gameName');
    const quizName = screen.getByTestId('quizName');
    const timer = screen.getByTestId('question-timer');
    const questionText = screen.getByTestId('questionText');
    const formControl = screen.getByTestId('formControl');
    const formLabel = screen.getByTestId('formLabel');
    const radioGroup = screen.getByTestId('radioGroup');
    const showHideQuizComplete = screen.getByTestId('showHideQuizComplete');

    const questionSubtext = screen.getByTestId('questionSubtext');

    const answer1 = screen.getByTestId('17');
    const answer2 = screen.getByTestId('18');
    const answer3 = screen.getByTestId('19');
    const answer4 = screen.getByTestId('20');

    expect(questionBoard).toBeInTheDocument();
    expect(gameName).toBeInTheDocument();
    expect(quizName).toBeInTheDocument();
    expect(timer).toBeInTheDocument();
    expect(questionText).toBeInTheDocument();
    expect(formControl).toBeInTheDocument();
    expect(formLabel).toBeInTheDocument();

    expect(radioGroup).toBeInTheDocument();
    expect(answer1).toBeInTheDocument();
    expect(answer2).toBeInTheDocument();
    expect(answer3).toBeInTheDocument();
    expect(answer4).toBeInTheDocument();

    expect(showHideQuizComplete).toBeInTheDocument();
    expect(questionSubtext).toBeInTheDocument();

    fireEvent.click(answer2);

    act(() => {
        jest.advanceTimersByTime(timerValue * numberOfQuestions * 1000);
    });

    // modalButton should not be in doc before quiz finishes

    const modalButton = screen.getByTestId('modalButton');
    expect(modalButton).toBeInTheDocument();
});

test('Answers render correctly', () => {
    //removed test.skip()
    const shuffledAnswers = [
        { answer_id: '1', answer_text: 'Option 1' },
        { answer_id: '2', answer_text: 'Option 2' },
        { answer_id: '3', answer_text: 'Option 3' },
        { answer_id: '4', answer_text: 'Option 4' },
    ];

    const handleAnswerSelectChange = jest.fn();

    render(
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
    );

    const radioGroup = screen.getByTestId('radioGroup');
    const radioOption1 = screen.getByTestId('1');
    const radioOption2 = screen.getByTestId('2');
    const radioOption3 = screen.getByTestId('3');
    const radioOption4 = screen.getByTestId('4');

    expect(radioGroup).toBeInTheDocument();
    expect(radioOption1).toBeInTheDocument();
    expect(radioOption2).toBeInTheDocument();
    expect(radioOption3).toBeInTheDocument();
    expect(radioOption4).toBeInTheDocument();

    fireEvent.click(radioOption1);
    expect(handleAnswerSelectChange).toHaveBeenCalledTimes(1);
    fireEvent.click(radioOption2);
    expect(handleAnswerSelectChange).toHaveBeenCalledTimes(2);
    fireEvent.click(radioOption3);
    expect(handleAnswerSelectChange).toHaveBeenCalledTimes(3);
    fireEvent.click(radioOption4);
    expect(handleAnswerSelectChange).toHaveBeenCalledTimes(4);
    fireEvent.click(radioOption2);
    expect(handleAnswerSelectChange).toHaveBeenCalledTimes(5);
});
