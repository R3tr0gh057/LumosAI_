
# LumosAI_

The aim of this project is to design and implement an AI-activated smart lighting system for homes, leveraging voice recognition technology powered by TensorFlow. The system will enhance user convenience, energy efficiency, and automation capabilities within the home environment.


## Optimizations

* API end points and API token can be stored in .env files for abstraction.
* The CSS file can be made universal for optimal storage and reference



## Installation

Install the required libraries using Python 3.8–3.11

```bash
  pip install -r requirements.txt
```
Some requirements like tensorflow requires specific commands, please refer to
https://www.tensorflow.org/install/pip


## Usage/Examples

To create your own trained custom hotword detector, go to /hotword directory and make the following folders:

audio_data
background_sound
final_audio_data_csv
saved_model

Use the following commands in sequence:

```bash
python PreparingData.py
```

This will prompt you to record yourself saying the hotword 100 times as default, you can change the amount of samples by adjusting the parameters in the script.

```bash
python PreProcessingData.py
```

This will create the audio data upon which the ai will be trained.

```bash
python training.py
```

This will use the audio data and create a trained model which can be used to determine if the wake word is present in a recorded voide note, in addition, a confusion matrix will be plotted to futher show the training result.

```bash
python RunParallely.py
```

This will run a program that uses the trained data to compare the newly recorded audio data's spectrogram and compares it with the trained data points. If the data points match, it will return true and asks the user for the query. To just test the training data, use the following:

```bash
python prediction.py
```

This will tell you if the custom hotword is present in the newly recording data.



START THE NGROK SERVER USING THE FOLLOWING:

```bash
ngrok http --domain=bulldog-promoted-accurately.ngrok-free.app http://ip:port/
```

AUTOMATE THE SCRIPT BY USING THE FOLLOWING:

```bash
./lumos.bat
```

This will run the hosting script and the ai script simultaniously.
