const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the public directory (ensure you have a "public" folder)
app.use(express.static('public'));

// Serve the DApp HTML page when accessing the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
