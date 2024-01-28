const express = require('express');
const bodyParser = require('body-parser');
const app=express()

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile('index.html', { root: __dirname });
});

const port = 3000
app.listen(port, () => {
	console.log('Server is running on hhtp://localhost:${port}');
});