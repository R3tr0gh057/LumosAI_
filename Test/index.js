const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(bodyParser.json());;
const FilePath = path.join('D:', '--PROJECTS2024--', 'LumosAI_', 'index.html');

app.get('/', (req, res) => {
	res.sendFile(FilePath);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
