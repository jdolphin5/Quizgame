import React from 'react';
import { Radio, FormLabel, RadioGroup, FormControl, FormControlLabel
} from '@mui/material';

interface PlayerBoardProps {
    sharedState: number;
    setSharedState: React.Dispatch<React.SetStateAction<number>>;
}

let correctApplied = false;

const PlayerBoard: React.FC<PlayerBoardProps> = ({ sharedState, setSharedState }) => {
    
    let selectedAns: string = "-1";
    const correctAns: string = "1";
  
    const handleChange = (event: any) => {
      selectedAns = event.target.value;
      if (selectedAns === correctAns && !correctApplied) {
        setSharedState(sharedState + 1);
        correctApplied = true;
      }
    }
    return (
        <div>
            <h1>Welcome to My Quiz GameAA</h1>
            <h2>Question X</h2>
            <p>What is the capital of France?</p>

            <FormControl>
                <FormLabel id="questionForm">Answers:</FormLabel>
                <RadioGroup aria-labelledby="questionLabel" name="radio-buttons-group">
                <FormControlLabel value="London" control={<Radio />} label="London" onChange={handleChange}/>
                <FormControlLabel value="1" control={<Radio />} label="Paris" onChange={handleChange}/>
                <FormControlLabel value="Madrid" control={<Radio />} label="Madrid" onChange={handleChange}/>
                <FormControlLabel value="New York" control={<Radio />} label="New York" onChange={handleChange}/>
                </RadioGroup>
            </FormControl>
        </div>
      );
    };

export default PlayerBoard;