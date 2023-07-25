export interface QuizData {
    quiz: {
      quiz_id: number;
      title: string;
      category: string;
    };
    questions: Array<Question>;
    answers: Array<Answer>; 
}

export interface Question {
    question_id: number,
    quiz_id: number,
    question_text: string,
}

export interface Answer {
    answer_id: number,
    question_id: number,
    answer_text: string,
    is_correct: boolean,
}

export interface ScoreboardProps {
    userState: number;
    setUserState: React.Dispatch<React.SetStateAction<number>>;
}

export interface QuestionTimerProps {
    timeLimit: number;
    onTimeUp: () => void;
    shouldReset: boolean;
}