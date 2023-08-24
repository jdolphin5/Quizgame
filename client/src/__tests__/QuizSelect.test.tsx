import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizSelect from '../QuizSelect';
import { QuizData, User } from '../types';

beforeEach(() => {});

afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
});

test('QuizSelect renders correctly', () => {
    const timerValue: number = 10;
    const setTimerValue: any = jest.fn();
    const numberOfQuestions: number = 1;
    const setNumberOfQuestions: any = jest.fn();
    const quizDataFetched: boolean = false;
    const setQuizDataFetched: any = jest.fn();
    const quizData: QuizData | null = {
        quiz: {
            category: 'Tennis',
            quiz_id: 1,
            title: 'Tennis Quiz',
        },
        questions: [
            {
                question_id: 5,
                question_text: 'How many players are there in a standard singles tennis match?',
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
        <QuizSelect
            timerValue={timerValue}
            setTimerValue={setTimerValue}
            numberOfQuestions={numberOfQuestions}
            setNumberOfQuestions={setNumberOfQuestions}
            quizDataFetched={quizDataFetched}
            setQuizDataFetched={setQuizDataFetched}
            quizData={quizData}
            setQuizData={setQuizData}
            userState={userState}
            setUserState={setUserState}
        />
    );

    const quizSelect = screen.getByTestId('quizSelect');
    const quizName = screen.getByTestId('quizName');
    const quizSelectContainer = screen.getByTestId('quizSelectContainer');
    const grid11 = screen.getByTestId('quizSelect-row-1-col-1');
    const typography1 = screen.getByTestId('quizSelect-dropdown-text');
    const grid12 = screen.getByTestId('quizSelect-row-1-col-2');
    const selectQuiz = screen.getByTestId('selectQuiz');
    const grid21 = screen.getByTestId('quizSelect-row-2-col-1');
    const typography2 = screen.getByTestId('quizSelect-timer-text');
    const grid22 = screen.getByTestId('quizSelect-grid22');
    const slider1 = screen.getByTestId('quizSelect-slider1');
    const grid31 = screen.getByTestId('quizSelect-grid31');
    const typography3 = screen.getByTestId('quizSelect-number-of-questions-text');
    const grid32 = screen.getByTestId('quizSelect-grid32');
    const slider2 = screen.getByTestId('quizSelect-slider2');
    const grid41 = screen.getByTestId('quizSelect-grid41');
    const submitButton = screen.getByTestId('quizSelect-button');

    expect(quizSelect).toBeInTheDocument();
    expect(quizName).toBeInTheDocument();
    expect(quizSelectContainer).toBeInTheDocument();
    expect(grid11).toBeInTheDocument();
    expect(typography1).toBeInTheDocument();
    expect(grid12).toBeInTheDocument();
    expect(selectQuiz).toBeInTheDocument();
    expect(grid21).toBeInTheDocument();
    expect(typography2).toBeInTheDocument();
    expect(grid22).toBeInTheDocument();
    expect(slider1).toBeInTheDocument();
    expect(grid31).toBeInTheDocument();
    expect(typography3).toBeInTheDocument();
    expect(grid32).toBeInTheDocument();
    expect(slider2).toBeInTheDocument();
    expect(grid41).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
});
