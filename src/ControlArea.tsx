import React from 'react';
import { Table, TableBody, TableContainer, TableCell, TableHead, TableRow
} from '@mui/material';

interface PlayerBoardProps {
    sharedState: number;
    setSharedState: React.Dispatch<React.SetStateAction<number>>;
}

function createData(
username: string,
score: number,) 
{
    return { username, score };
}
  
const data = [
    createData("Spongebob", 0),
    createData("Patrick", 1),
];

const ControlArea: React.FC<PlayerBoardProps> = ({ sharedState, setSharedState }) => {
    return (
        <div>
            <TableContainer className="ans_table_container">
                <Table sx={{width:200}} aria-label="myTable">
                <TableHead>
                    <TableRow sx={{border: 1, color:'black'}}>
                    <TableCell align="right">Username</TableCell>
                    <TableCell align="right">Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                    data.map((row) => (
                        <TableRow key={row.username} sx={{border: 1, color:'gray'}}>
                        <TableCell align="right">{row.username}</TableCell>
                        <TableCell align="right">{row.score}</TableCell>
                        </TableRow>
                    ))
                    }
                    <TableRow sx={{border: 1, color:'gray'}}>
                    <TableCell align="right">HookUser</TableCell>
                    <TableCell align="right">{sharedState}</TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ControlArea;
