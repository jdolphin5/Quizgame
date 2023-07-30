const path = require('path');
const express = require("express");
const app = express();
const { Pool } = require('pg');
const cors = require('cors');

console.log('test');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'quizgame',
  password: 'super',
  port: 5432, // Default
});

// Enable CORS
app.use(cors());

// Serve static files from the 'dist' folder
const distPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(distPath));

// Remember that security is crucial when setting up a server-side API.
// Make sure to validate user input and sanitize SQL queries to prevent SQL injection attacks.

app.get('/api/quiz', async (req: any, res: any) => {
  try {

console.log("GET /api/quiz");
    const client = await pool.connect();
    const quizQuery = `SELECT * FROM quiz;`;
    const quizResult = await client.query(quizQuery);
    console.log("quiz query complete");
    const quizRes = quizResult.rows;
    
    client.release();
    res.json(quizRes);
  } catch (err) {
    console.log('Error fetching quiz data');
    res.status(500).json({ error: 'Error fetching quiz data' });
  }
});


app.get('/api/quiz/:id/questions/:numQuestions', async (req: any, res: any) => {
  try {
    const quizId = req.params.id;
    const numQuestions = req.params.numQuestions;
    console.log("GET /api/quiz/", quizId, numQuestions);
    const client = await pool.connect();
    const quizQuery = `SELECT * FROM quiz WHERE quiz_id = ${quizId};`;
    const quizRes = await client.query(quizQuery);
    console.log("quiz query complete");
    const questionsQuery = `
      SELECT * FROM question
      WHERE quiz_id = ${quizId}
      ORDER BY RANDOM()
      LIMIT ${numQuestions};
    `;
    const questionsResult = await pool.query(questionsQuery);
    console.log("quest query complete");
    const questionsRes = questionsResult.rows;
    const questionIds = questionsRes.map((question: { question_id: number; }) => question.question_id);
    const answersQuery = `
      SELECT * FROM answer
      WHERE question_id IN (${questionIds.map((_: any, index: number) => '$' + (index + 1)).join(',')})
    `;
    const answersResult = await pool.query(answersQuery, questionIds);
    console.log("ans query complete");
    const answersRes = answersResult.rows;
    client.release();
    const quizData = {
      quiz: quizRes.rows[0], //need to specify rows[0] as only one row is present
      questions: questionsRes,
      answers: answersRes,
    }
    res.json(quizData);
  } catch (err) {
    console.log('Error fetching quiz data');
    res.status(500).json({ error: 'Error fetching quiz data' });
  }
});

const port = process.env.PORT || 3000;

// Start the node server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});