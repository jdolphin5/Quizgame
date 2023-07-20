const express = require('express');
const app = express();

// Serve static files from the 'dist' folder
app.use(express.static('../dist'));

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log('Server is running on port ${port}');
});