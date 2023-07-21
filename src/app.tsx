import React from 'react';
import { Radio, FormLabel, RadioGroup, FormControl, FormControlLabel,
  Table, TableBody, TableContainer, TableCell, TableHead, TableRow
} from '@mui/material';
import { useState } from 'react';

let correctApplied = false;

function createData(
  username: string,
  score: number,
) {
  return { username, score };
}

const data = [
  createData("Spongebob", 0),
  createData("Patrick", 1),
];

const App: React.FC = () => {

  const [ansCorrectCount, setAnsCorrect] = useState(0);
  let selectedAns: string = "-1";
  const correctAns: string = "1";

  const handleChange = (event: any) => {
    selectedAns = event.target.value;
    if (selectedAns === correctAns && !correctApplied) {
      setAnsCorrect(ansCorrectCount + 1);
      correctApplied = true;
    }
  }

  return (
    <div className = 'root'>
      <h1>Welcome to My Quiz GameAA</h1>
      <h2>Question X</h2>
      <p>What is the capital of France?</p>

      <FormControl>
        <FormLabel id="questionForm">Answers:</FormLabel>
        <RadioGroup aria-labelledby="questionLabel" name="radio-buttons-group">
          <FormControlLabel value="1" control={<Radio />} label="London" onChange={handleChange}/>
          <FormControlLabel value="Paris" control={<Radio />} label="Paris" />
          <FormControlLabel value="Madrid" control={<Radio />} label="Madrid" />
          <FormControlLabel value="New York" control={<Radio />} label="New York" />
        </RadioGroup>
      </FormControl>
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
            <TableCell align="right">{ansCorrectCount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
