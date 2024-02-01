
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
python PreparingData.py --wakepath "path" --wakereps int --backpath "path" --backreps int
```

This will prompt you to record yourself saying the hotword 100 times as default, you can change the amount of samples by adjusting the parameters.

```bash
python PreProcessingData.py --path <path>
```

This will create the audio data upon which the ai will be trained.

```bash
python training.py --path <path>
```

This will use the audio data and create a trained model which can be used to determine if the wake word is present in a recorded voide note.



START THE NGROK SERVER USING THE FOLLOWING:

```bash
ngrok http --domain=bulldog-promoted-accurately.ngrok-free.app http://ip:port/
```