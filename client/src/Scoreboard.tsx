import React from 'react';
import { Table, TableBody, TableContainer, TableCell, TableHead, TableRow
} from '@mui/material';
import { ScoreboardProps } from './types';


/*
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
*/

const Scoreboard: React.FC<ScoreboardProps> = ({ userState, setUserState }) => {
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
                    userState.map((user) => (
                        <TableRow key={user.username} sx={{border: 1, color:'gray'}}>
                        <TableCell sx={{color:"#ffffff"}} align="left">{user.username}</TableCell>
                        <TableCell sx={{color:"#ffffff"}} align="left">{user.score}</TableCell>
                        </TableRow>
                    ))
                    }
                    {/*
                    <TableRow sx={{border: 1, color:'gray'}}>
                    <TableCell sx={{color:"#ffffff"}} align="left">HookUser</TableCell>
                    <TableCell sx={{color:"#ffffff"}} align="left">{userState}</TableCell>
                    </TableRow>
                    */}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Scoreboard;
