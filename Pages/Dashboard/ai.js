var stat = false;
const toggle = document.getElementById('check');
const toggle2 = document.getElementById('check2');
var isapplied = false;
let class2Value; // Declare a variable to store the value of class 2
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
    
    // Remove existing child elements in labelContainer
    while (labelContainer.firstChild) {
        labelContainer.removeChild(labelContainer.firstChild);
    }

    for (let i = 0; i < classLabels.length; i++) {
        labelContainer.appendChild(document.createElement('div'));
    }

    recognizer.listen(result => {
        const scores = result.scores;
        
        // Assuming class 2 is at index 1, adjust accordingly if it's at a different index
        const class2Score = scores[1]; // Get the score of class 2
        class2Value = parseInt(class2Score * 100); // Convert to an integer (multiply by 100 for percentage)
        
        for (let i = 0; i < classLabels.length; i++) {
            const classPrediction = classLabels[i] + ': ' + scores[i].toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
        if(class2Value>95){
            toggleRED();
            toggle.checked = !toggle.checked;
            toggleBLUE();
            toggle2.checked = !toggle2.checked;
            stat = !stat;
            if (stat){
                window.speechSynthesis.speak(new SpeechSynthesisUtterance("L E D turned on"));
            }
            else{
                window.speechSynthesis.speak(new SpeechSynthesisUtterance("L E D turned off"));
            }
        }
    }, {
        includeSpectrogram: true,
        probabilityThreshold: 0.95,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50
    });
}


//red
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

//blue
async function toggleBLUE() {
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
}

document.addEventListener('DOMContentLoaded', function () {
    const ledbutton1 = document.getElementById('check');
    const ledbutton2 = document.getElementById('check2');
    const AI = document.getElementById('AI');

    // js for AI mode
    AI.addEventListener('click', function () {
        // apply glow
        if (AI.classList.contains('active')) {
            AI.classList.remove('active');
            if (recognizer) {
                recognizer.stopListening(); // Stop listening when AI mode is deactivated
                const labelContainer = document.getElementById('label-container');
                while (labelContainer.firstChild) {
                    labelContainer.removeChild(labelContainer.firstChild);
                }
            }
        } else {
            AI.classList.add('active');
            createModel().then(init);
        }
    });


    // js for red led
    ledbutton1.addEventListener('change', function () {
        if (ledbutton1.checked) {
            toggleRED();
        }
        else if (!ledbutton1.checked) {
            toggleRED()
        }
    });

    // js for blue led
    ledbutton2.addEventListener('change', function () {
        if (ledbutton2.checked) {
            toggleBLUE();
        }
        else if (!ledbutton2.checked) {
            toggleBLUE();
        }
    });
});
