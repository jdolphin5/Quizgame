import React from 'react';
import { ResultPageProps, Answer, Result } from './types';
import { Button, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow }
from '@mui/material';


const ResultsPage: React.FC<ResultPageProps> = ({ userResults, userState, showModal, setShowModal }) => {

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <Modal
            className="results"
            open={showModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper>
                <div className="resultsPaper">
                    <h2>{userState[0].username}'s Quiz Results</h2>
                    <div className="legend-container">
                    <div className="legend-box correct-box"></div>
                    Correct
                    <br />
                    <div className="legend-box selected-box"></div>
                    Selected
                    </div>
                    <br />
                    <Table>
                        <TableHead>
                            <TableRow sx={{border: 1, color:'black'}}>
                                <TableCell sx={{}} align="left">Question</TableCell>
                                <TableCell sx={{}} align="left">Answer</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                userResults.map((result: Result, i) => (
                                    <React.Fragment key={i}>
                                        <TableRow>
                                            <TableCell>
                                                {result.question.question_text}
                                            </TableCell>
                                        </TableRow>
                                        {result.answers.map((answer: Answer, j) => (
                                            <React.Fragment key={j}>
                                                <TableRow>
                                                    <TableCell>
                                                    </TableCell>
                                                    <TableCell sx={{border: answer.answer_id === result.selected_answer_id ? '1px solid #000000' : '0',}}
                                                    className={
                                                        answer.is_correct ? "table-correct" : answer.answer_id === result.selected_answer_id ? "table-selected" : "table-incorrect"
                                                    }>
                                                        {answer.answer_text}
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        ))}
                                    </React.Fragment>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <Button variant="contained" color="primary" onClick={handleCloseModal}>
                        Close Results
                    </Button>
                </div>
            </Paper>
        </Modal>
    );
};

export default ResultsPage;