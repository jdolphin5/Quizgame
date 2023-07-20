import React from 'react';
import { Radio } from '@mui/material';

const App: React.FC = () => {
  return (
    <div className = 'root'>
      <h1>Welcome to My Quiz GameAA</h1>
      <h2>Question X</h2>
      <p>What is the capital of France?</p>
      <Radio />
      <ul>
        <li>Londona</li>
        <li>Paris</li>
        <li>Berlin</li>
        <li>Madrid</li>
      </ul>
    </div>
  );
};

export default App;
