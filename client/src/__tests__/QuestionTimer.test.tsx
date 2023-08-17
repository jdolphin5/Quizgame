import React from 'react';
import { render, screen, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuestionTimer from '../QuestionTimer';

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.clearAllTimers();
    cleanup(); // Resets the DOM after each test suite
});

test('Timer starts counting down', () => {
    const shouldReset: boolean = false;
    const timerValue: number = 10;
    const handleTimeUp: any = jest.fn();

    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    act(() => {
        render(
            <QuestionTimer
                shouldReset={shouldReset}
                timeLimit={timerValue}
                onTimeUp={handleTimeUp}
            />
        );
    });

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    act(() => {
        jest.advanceTimersByTime(1000);
    });

    expect(handleTimeUp).not.toHaveBeenCalled();

    setIntervalSpy.mockRestore();
});

test('Timer finishes and calls clearInterval', () => {
    const shouldReset: boolean = false;
    const timerValue: number = 10;
    const handleTimeUp: any = jest.fn();

    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    act(() => {
        render(
            <QuestionTimer
                shouldReset={shouldReset}
                timeLimit={timerValue}
                onTimeUp={handleTimeUp}
            />
        );
    });

    act(() => {
        jest.advanceTimersByTime(timerValue * 1000);
    });

    expect(handleTimeUp).toHaveBeenCalledTimes(1);
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    expect(clearIntervalSpy).toHaveBeenLastCalledWith(expect.any(Number));

    clearIntervalSpy.mockRestore();
});

test('Timer renders correctly', () => {
    const shouldReset: boolean = true;
    const timerValue: number = 10;
    const handleTimeUp = jest.fn();

    render(
        <QuestionTimer
            shouldReset={shouldReset}
            timeLimit={timerValue}
            onTimeUp={handleTimeUp}
        />
    );

    const timer = screen.getByTestId('question-timer');

    expect(timer).toBeInTheDocument();
    expect(timer).toHaveTextContent('10');
});
