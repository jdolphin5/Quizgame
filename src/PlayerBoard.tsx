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
            <div className="header2">
                <div className="gameName">Quiz Game</div>
                <div className="quizName">Geography Quiz</div>
                <div className="timer">Reading Timer: <p>10</p></div>
            </div>
            <div className="body2">
                <h2>Question 1</h2>
                <h2>What is the capital of France?</h2>

                <FormControl>
                    <FormLabel id="questionForm"><h2>Answers:</h2></FormLabel>
                    <RadioGroup aria-labelledby="questionLabel" name="radio-buttons-group">
                    <FormControlLabel value="London" control={<Radio />} label="London" onChange={handleChange}/>
                    <FormControlLabel value="1" control={<Radio />} label="Paris" onChange={handleChange}/>
                    <FormControlLabel value="Madrid" control={<Radio />} label="Madrid" onChange={handleChange}/>
                    <FormControlLabel value="New York" control={<Radio />} label="New York" onChange={handleChange}/>
                    </RadioGroup>
                </FormControl>
                
                <h4>Please select an answer above</h4>
            </div>
        </div>
      );
    };

export default PlayerBoard;