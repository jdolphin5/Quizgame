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
            <h1 className="header1" style={{color : "#ffffff"}}>Scoreboard</h1>
            <TableContainer className="ansTableContainer">
                <Table sx={{width:200}} aria-label="myTable">
                <TableHead>
                    <TableRow sx={{border: 1, color:'gray'}}>
                    <TableCell sx={{color:"#ffffff"}} align="left">Username</TableCell>
                    <TableCell sx={{color:"#ffffff"}} align="left">Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                    data.map((row) => (
                        <TableRow key={row.username} sx={{border: 1, color:'gray'}}>
                        <TableCell sx={{color:"#ffffff"}} align="left">{row.username}</TableCell>
                        <TableCell sx={{color:"#ffffff"}} align="left">{row.score}</TableCell>
                        </TableRow>
                    ))
                    }
                    <TableRow sx={{border: 1, color:'gray'}}>
                    <TableCell sx={{color:"#ffffff"}} align="left">HookUser</TableCell>
                    <TableCell sx={{color:"#ffffff"}} align="left">{sharedState}</TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ControlArea;
