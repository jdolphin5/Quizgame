import React, { useState } from 'react';
import { UsernameSelectProps, User } from './types';
import { Button, TextField } from '@mui/material';

const UsernameSelect: React.FC<UsernameSelectProps> = ({ usernameSelected, setUsernameSelected, userState, setUserState }) => {

    const [myUsername, setMyUsername] = useState<string>('');

    const setUsername = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMyUsername(event.target.value);
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
 
        const myUser: User = {
            user_id: 1,
            username: myUsername,
            question_and_answer: {},
            score: 0,
          };
      
          setUserState([...userState, myUser]);
          setUsernameSelected(true);
    }

    return (
        <div>
            <div className="header2">
                <div className="gameName">
                </div>
                <div className="quizName"></div>
            </div>
            <div className="body2">
                <div className="usernameForm">
                    <form autoComplete="off" onSubmit={handleSubmit}>
                    <TextField id="standard-basic" label="Username" variant="standard" onChange={setUsername} />
                    <br />
                    <br />
                    <Button variant="contained" type="submit">Submit</Button>
                    <br />
                    </form>
                </div>
            </div>
        </div>
      );
    };

export default UsernameSelect;