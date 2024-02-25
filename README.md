# LumosAI_

## Introduction
Welcome to LumosAI_! LumosAI_ is an open-source artificial intelligence and IOT project aimed at advancing research and development in AI. The project provides tools, models, and resources for various AI tasks, including natural language processing (NLP), machine learning and IOT integration.

## About
LumosAI_ is developed by a team of IOT enthusiasts and researchers passionate about harnessing the power of AI to create innovative solutions using IOT. The project is continuously evolving, with new features and contributions from the community and from the maintainer. The code is designed to create a voice-controlled home automation system using speech recognition and integration with an ESP8266 module for controlling lights remotely. Let's break down the functionality into key components:

### 1. Voice Recognition

* The script utilizes the speech_recognition library to capture audio input from the user's microphone.
* Upon activating the script, the system listens for a specific hotword ("Jarvis") to initiate voice commands.
* Once the hotword is detected, the system captures the user's voice command and converts it into text using Google's Speech Recognition API.
* The browser activated voice system is coded using google's teachable ai api and it can listen for snaps which turns on the led, this feature is still in beta and needs more testing.

### 2. Command Processing

* After converting the user's speech into text, the script analyzes the command to determine the user's intent.
* It contains a set of predefined commands for controlling lights in different rooms, such as turning them on or off, activating power-saving mode, etc.
* The script parses the user's command and constructs HTTP requests to send instructions to the ESP8266 module, which is responsible for controlling the lights.

### 3. Integration with ESP8266

* The ESP8266 module is connected to the local network and configured to host a web server.
* The Python script sends HTTP requests to specific endpoints on the ESP8266 server to trigger actions such as toggling lights or activating power-saving mode.
* The ESP8266 receives these requests, processes them, and executes the corresponding actions, such as toggling GPIO pins to control the lights.

### 4. Response Handling

* After sending an HTTP request to the ESP8266, the Python script receives a response indicating the status of the operation (e.g., success or failure).
* The script uses text-to-speech synthesis via the pyttsx3 library to provide audible feedback to the user, informing them of the outcome of their command.

### 5. Error Handling and User Interaction

* The script includes error handling mechanisms to handle cases where speech recognition fails to understand the user's command or if there are issues with the network or ESP8266 communication.
* In case of errors or unrecognized commands, the script prompts the user to repeat the command or provides assistance in understanding the available commands.

### 6. Continuous Operation

* The script runs in a continuous loop, constantly listening for voice commands from the user.
* It remains active until terminated by the user, allowing for seamless interaction and control of the home automation system.

In summary, the code along with the website enables voice-controlled home automation by leveraging speech recognition to interpret user commands, integrating with an ESP8266 module to control lights remotely, and providing audible feedback to the user regarding the status of their commands. The system operates continuously, allowing for intuitive and hands-free control of lighting systems within the home.


## Features

### Machine Learning Models
- **Pre-trained Models:** Hosts a collection of pre-trained models for various AI tasks, ready to be used out of the box.
- **Custom Model Training:** Provides tools and utilities for training custom machine learning models on user-provided data.
- **Text Generation:** Generate coherent text based on prompts using state-of-the-art language models.

### Integration with ESP8266 for Remote Light Control
- **Remote Light Control:** LumosAI_ integrates with an ESP8266 model to allow users to remotely control lights.
- **Toggle Control:** Users can toggle lights on and off remotely through the project website.
- **Voice Control:** Voice commands are processed by the AI model to control lights via the ESP8266 module.

## Getting Started
To get started with LumosAI_, follow these steps:

### Pre-trained AI setup

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/R3tr0gh057/LumosAI_.git
    ```

2. **Install Dependencies:**
    ```bash
    cd LumosAI_/AI
    pip install -r requirements.txt
    ```

3. **Setup:**
    - Connect your ESP8266 module to your local network and note down its IP address.
    - Update the URLs in the script to match the IP address and endpoints of your ESP8266 module.
    - You can change the hotword by changing the value of the hotword variable.

4. **Usage:**
    - Run the script and wait for it to start listening.
    - Say you hotword to activate the AI.
    - Proceed to use the commands like "turn on the bedroom lights" or turn on the hall room lights".
    - You can customize the script to add more voice commands or integrate additional functionality based on your requirements.

### Custom Model Training (Beta)

1. **Install Dependencies:**

    ```bash
    cd LumosAI_/hotword
    pip install -r requirements.txt
    ```

2. **Usage:**

    ```bash
    python PreparingData.py
    ```
    This will prompt you to record yourself saying the hotword 100 times as default, you can change the amount of samples by adjusting the parameters.

    ```bash
    python PreProcessingData.py
    ```
    This will create the audio data upon which the ai will be trained.

    ```bash
    python training.py
    ```
    This will use the audio data and create a trained model which can be used to determine if the wake word is present in a recorded voide note.

      ```bash
      python RunParallely.py
      ```

      This will run a program that uses the trained data to compare the newly recorded audio data's spectrogram and compares it with the trained data points. If the data points match, it will return true and asks the user for the query. To just test the training data, use the following:

      ```bash
      python prediction.py
      ```

      This will tell you if the custom hotword is present in the newly recorded data.

### Ngrok Setup

   Setting up your ngrok port forwarding service is essential since direct direct http communication from an https server is not possible. To overcome this, we can use a port forwarding service to forward our http port to an https domain.

1. **Setup:**

    Open an administrator cmd and run the following commands:

    ```bash
    choco install ngrok
    ngrok config add-authtoken <TOKEN>
    ngrok http --<yourfreestaticport> http://ip:port/
    ```

2. **Note:**

   * Make an ngrok account and replace <TOKEN> with your auth token
   * Replace <yourfreestaticport> with your free static port offered by ngrok
   * Once its set up, make sure you're connected to the same WiFi as the one connected to the esp8266

### ESP8266

You must make a few changes to the esp8266 code in order for it to connect to your WiFi and enable server communication. Here are the changes that you have to make:

1. **WiFi:**
    
    * Change the <ssid> and <passwd> to your respective wifi name and password
    * Make sure your WiFi is set to 2.4 gHz

2. **Server:**

    * You can change the endpoints of your server depending on your needs by making changes to server.on(/<endpoint>, HTTP_GET, []()), change <endpoint> to your desired endpoint.

### WEBPAGE

You need to change the javascript to change the endpoints to establish communication with the esp8266 module. You should make sure you have good internet connection for quick responses. Here are the necessary changes:

* Change the fetch requests of "ai.js" to the the following format: <your ngrok hosted ip><your endpoint>, for example: 'https://bulldog-promoted-accurately.ngrok-free.app/power-saver1'
* Change the firebase config variable of "login.js" and "script.js" with your firebase config code which will be available on your firebase profile


## License
This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code according to the terms of the license.

## Contact
For inquiries or feedback, please contact the project maintainer:
- **Maintainer:** Joe Sanjo Cijo
- **Email:** joesanjo10@gmail.com
- **GitHub:** [R3tr0gh057](https://github.com/r3tr0gh057)

