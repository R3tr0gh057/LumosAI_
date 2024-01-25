// server.js
const express = require('express');
const bodyParser = require('body-parser');
const Gpio = require('pigpio-mock').Gpio;

const app = express();
const ledPin = 'D2'; // Replace '2' with the GPIO pin connected to the LED

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.post('/toggle-led', (req, res) => {
  try {
    const led = new Gpio(ledPin, { mode: Gpio.OUTPUT }); 
    const currentValue = led.digitalRead();
    const newValue = currentValue === 0 ? 1 : 0;
    led.digitalWrite(newValue);

    console.log(`LED toggled. New value: ${newValue}`);
    
    res.json({ message: `LED toggled. New value: ${newValue}` });
  } catch (error) {
    console.error('Error toggling LED:', error);
    res.status(500).json({ error: 'Failed to toggle LED' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
