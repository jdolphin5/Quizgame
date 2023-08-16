import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
// Importing the jest testing library
import '@testing-library/jest-dom';
import QuestionTimer from '../QuestionTimer';

// afterEach function runs after each test suite is executed
afterEach(() => {
    cleanup(); // Resets the DOM after each test suite
});

describe('Timer Component', () => {
    const shouldReset: boolean = true;
    const timerValue: number = 10;
    const handleTimeUp: any = jest.fn();
    render(
        <QuestionTimer
            shouldReset={shouldReset}
            timeLimit={timerValue}
            onTimeUp={handleTimeUp}
        />
    );
    const timer = screen.getByTestId('timer');

    // Test 1
    test('Timer Rendering', () => {
        expect(timer).toBeInTheDocument();
    });

    // Test 2
    test('Timer Has Text Content', () => {
        expect(timer).toHaveTextContent('1');
    });
});
