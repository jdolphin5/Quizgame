export interface Quiz {
    quiz_id: number;
    title: string;
    category: string;
}

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

export interface User {
    user_id: number,
    username: string,
    question_and_answer: { [question: number]: number | null }, //key-value question_id : answer_id
    score: number
}

export interface ScoreboardProps {
    userState: Array<User>;
    setUserState: React.Dispatch<React.SetStateAction<Array<User>>>;
}

export interface UsernameSelectProps {
    usernameSelected: boolean;
    setUsernameSelected: React.Dispatch<React.SetStateAction<boolean>>;
    userState: Array<User>;
    setUserState: React.Dispatch<React.SetStateAction<Array<User>>>;
}

export interface QuizSelectProps {
    timerValue: number;
    setTimerValue: React.Dispatch<React.SetStateAction<number>>;
    quizDataFetched: boolean;
    setQuizDataFetched: React.Dispatch<React.SetStateAction<boolean>>;
    quizData: QuizData | null;
    setQuizData: React.Dispatch<React.SetStateAction<QuizData | null>>;
    userState: Array<User>;
    setUserState: React.Dispatch<React.SetStateAction<Array<User>>>;
}

export interface QuestionboardProps {
    timerValue: number;
    setTimerValue: React.Dispatch<React.SetStateAction<number>>;
    quizData: QuizData | null;
    setQuizData: React.Dispatch<React.SetStateAction<QuizData | null>>;
    userState: Array<User>;
    setUserState: React.Dispatch<React.SetStateAction<Array<User>>>;
}

export interface QuestionTimerProps {
    timeLimit: number;
    onTimeUp: () => void;
    shouldReset: boolean;
}