export interface QuizData {
    quiz: {
      quiz_id: number;
      title: string;
      category: string;
      // Add any other properties of the quiz object here
    };
    questions: Array<Question>; // Replace 'any' with the correct type for a question
    answers: Array<Answer>; // Replace 'any' with the correct type for an answer
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

export interface PlayerBoardProps {
    sharedState: number;
    setSharedState: React.Dispatch<React.SetStateAction<number>>;
    quizData: QuizData | null;
    setQuizData: React.Dispatch<React.SetStateAction<QuizData | null>>;
}