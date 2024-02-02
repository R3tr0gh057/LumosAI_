var isapplied = false;
const URL = 'https://teachablemachine.withgoogle.com/models/wjMWbNt3e/';
let recognizer; // Declare recognizer outside the functions to make it accessible in both init and AI event listener

async function createModel() {
    const checkpointURL = URL + 'model.json'; // model topology
    const metadataURL = URL + 'metadata.json'; // model metadata

    recognizer = speechCommands.create(
        'BROWSER_FFT', // fourier transform type, not useful to change
        undefined, // speech commands vocabulary feature, not useful for your models
        checkpointURL,
        metadataURL);

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();

    return recognizer;
}

async function init() {
    if (!AI.classList.contains('active')) {
        if (recognizer) {
            recognizer.stopListening(); // Stop listening if recognizer is already initialized
        }
        return;
    }

    const classLabels = recognizer.wordLabels(); // get class labels
    const labelContainer = document.getElementById('label-container');
    for (let i = 0; i < classLabels.length; i++) {
        labelContainer.appendChild(document.createElement('div'));
    }

    recognizer.listen(result => {
        const scores = result.scores;
        for (let i = 0; i < classLabels.length; i++) {
            const classPrediction = classLabels[i] + ': ' + result.scores[i].toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
            if(result.scores[2].toFixed(2)>0.90){
                toggleRED();
            }
        }
    }, {
        includeSpectrogram: true,
        probabilityThreshold: 0.90,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50
    });
}

async function toggleRED() {
    // Send a request to the ESP8266 when the button is clicked
    fetch('https://bulldog-promoted-accurately.ngrok-free.app/toggle-led1', {
        method: "get",
        headers: new Headers({
            'Access-Control-Allow-Origin': '*',
            'ngrok-skip-browser-warning': '69420',
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP error! Status: ${response.status}');
        }
        return response.text();
    })
    .then(data => {
        console.log(data); // Log the response from the ESP8266
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const ledbutton1 = document.getElementById('ledbutton1');
    const ledbutton2 = document.getElementById('ledbutton2');
    const AI = document.getElementById('AI');

    // js for AI mode
    AI.addEventListener('click', function () {
        // apply glow
        if (AI.classList.contains('active')) {
            AI.classList.remove('active');
            if (recognizer) {
                recognizer.stopListening(); // Stop listening when AI mode is deactivated
            }
        } else {
            AI.classList.add('active');
            createModel().then(init);
        }
    });
    

    // js for red led
    ledbutton1.addEventListener('click', function () {
        // apply glow
        if (ledbutton1.classList.contains('active')) {
            ledbutton1.classList.remove('active');
        } else {
            ledbutton1.classList.add('active');
        }

        // Send a request to the ESP8266 when the button is clicked
        fetch('https://bulldog-promoted-accurately.ngrok-free.app/toggle-led1', {
            method: "get",
            headers: new Headers({
                'Access-Control-Allow-Origin': '*',
                'ngrok-skip-browser-warning': '69420',
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error! Status: ${response.status}');
                }
                return response.text();
            })
            .then(data => {
                console.log(data); // Log the response from the ESP8266
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    // js for blue led
    ledbutton2.addEventListener('click', function () {
        // apply glow
        if (ledbutton2.classList.contains('active')) {
            ledbutton2.classList.remove('active');
        } else {
            ledbutton2.classList.add('active');
        }

        // Send a request to the ESP8266 when the button is clicked
        fetch('https://bulldog-promoted-accurately.ngrok-free.app/toggle-led2', {
            method: "get",
            headers: new Headers({
                'Access-Control-Allow-Origin': '*',
                'ngrok-skip-browser-warning': '69420',
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error! Status: ${response.status}');
                }
                return response.text();
            })
            .then(data => {
                console.log(data); // Log the response from the ESP8266
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
