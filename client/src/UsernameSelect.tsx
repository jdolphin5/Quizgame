import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { UsernameSelectProps, User } from './types'
import { Button, TextField } from '@mui/material'
import useWebSocket from 'react-use-websocket'

const UsernameSelect: React.FC<UsernameSelectProps> = ({
    usernameSelected,
    setUsernameSelected,
    userState,
    setUserState,
}) => {
    const [userInput, setUserInput] = useState('')
    const [myUsername, setMyUsername] = useState<string>('')
    const [helperText, setHelperText] = useState<string>('')
    const [usernameError, setUsernameError] = useState<boolean>(false)
    const [generateUsername, setGenerateUsername] = useState<boolean>(false)

    useEffect(() => {
        if (generateUsername) {
            axios
                .get(`http://localhost:3000/api/generate-username`)
                .then((response: any) => {
                    console.log('username generated' + String(response.data))
                    setMyUsername(response.data.generatedUsername)
                    setUserInput(response.data.generatedUsername)
                    setHelperText('Valid Username')
                })
                .catch((error: any) => {
                    console.error('Error generating username:', error)
                })
            setGenerateUsername(false)
        }
    }, [generateUsername])

    const checkUsername = (str: string) => {
        return /^[A-Za-z0-9_]*$/.test(str)
    }

    const setUsername = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const inputUsername = event.target.value
        setUserInput(inputUsername)
        if (inputUsername.length === 0) {
            setHelperText('Please enter a Username')
            setUsernameError(false)
        } else if (!checkUsername(inputUsername)) {
            setHelperText(
                'Username can only contain numbers, letters or underscores'
            )
            setUsernameError(true)
        } else {
            setHelperText('Valid Username')
            setUsernameError(false)
            setMyUsername(inputUsername)
        }
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        if (helperText == 'Valid Username') {
            const myUser: User = {
                user_id: 1,
                username: myUsername,
                question_and_answer: [],
                score: 0,
            }

            setUserState([...userState, myUser])
            setUsernameSelected(true)
        }
    }

    const WS_URL = `ws://localhost:3000/`
    useWebSocket(WS_URL, {
        onOpen: () => {
            console.log('Websocket connection established.')
        },
    })

    return (
        <div>
            <div className="body2">
                <div className="usernameForm">
                    <div className="usernameGrid">
                        <div className="username-row-2">
                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <TextField
                                    value={userInput}
                                    id="standard-basic"
                                    label="Enter Username"
                                    variant="standard"
                                    helperText={helperText}
                                    error={usernameError}
                                    onChange={setUsername}
                                />
                                <Button
                                    style={{
                                        maxHeight: '100px',
                                        minHeight: '42px',
                                    }}
                                    variant="contained"
                                    onClick={() => {
                                        setGenerateUsername(!generateUsername)
                                    }}
                                >
                                    Generate Username
                                </Button>
                                <br />
                                <br />
                                <br />
                                <Button variant="contained" type="submit">
                                    Submit
                                </Button>
                                <br />
                            </form>
                        </div>
                    </div>
                </div>
                <div id="rss"></div>
            </div>
        </div>
    )
}

export default UsernameSelect
