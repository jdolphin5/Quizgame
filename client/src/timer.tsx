import React, { useEffect, useState } from 'react';
import { QuestionTimerProps } from './types';

const QuestionTimer: React.FC<QuestionTimerProps> = ({
    timeLimit,
    onTimeUp,
    shouldReset,
}) => {
    const [secondsRemaining, setSecondsRemaining] = useState<number>(timeLimit);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const id: NodeJS.Timeout = setInterval(() => {
            setSecondsRemaining((prevSeconds) => prevSeconds - 1);
        }, 1000);
        setIntervalId(id);

        return () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        };
    }, []);

    useEffect(() => {
        if (secondsRemaining === 0 && !shouldReset) {
            clearInterval(intervalId!); // ! to indicate that intervalId cannot be null here
            onTimeUp();
        } else if (secondsRemaining === 0 && shouldReset) {
            onTimeUp();
            setSecondsRemaining(timeLimit);
        }
    }, [secondsRemaining, intervalId, onTimeUp]);

    return secondsRemaining;
};

export default QuestionTimer;
