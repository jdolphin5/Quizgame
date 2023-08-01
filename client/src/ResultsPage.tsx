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
            style={{overflow: "auto"}}
            open={showModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper>
                <h2 id="modal-modal-title">{userState[0].username}'s Quiz Results</h2>
                <Table>
                    <TableHead>
                        <TableRow sx={{border: 1, color:'black'}}>
                            <TableCell sx={{}} align="left">Question</TableCell>
                            <TableCell sx={{}} align="left">Answer</TableCell>
                            <TableCell sx={{}} align="left">Selected</TableCell>
                            <TableCell sx={{}} align="left">Correct</TableCell>
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
                                                <TableCell>
                                                    {answer.answer_text}
                                                </TableCell>
                                                <TableCell>
                                                    {String(answer.is_correct)}
                                                </TableCell>
                                                <TableCell>
                                                    {String(answer.answer_id === result.selected_answer_id)}
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
            </Paper>
        </Modal>
    );
};

export default ResultsPage;