###### IMPORTS ################
import os
import librosa
import librosa.display
#import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

#testing a sample for waveform and mfcc
"""walley_sample = "background_sound/99.wav"
data, sample_rate = librosa.load(walley_sample)

plt.title("Wave Form")
librosa.display.waveshow(data, sr=sample_rate)
plt.show()

mfccs = librosa.feature.mfcc(y=data, sr=sample_rate, n_mfcc=40)
print("Shape of mfcc:", mfccs.shape)

plt.title("MFCC")
librosa.display.specshow(mfccs, sr=sample_rate, x_axis='time')
plt.show()"""

all_data = []
data_path_dict = {
    0: ["background_sound/" + file_path for file_path in os.listdir("background_sound/")],
    1: ["audio_data/" + file_path for file_path in os.listdir("audio_data/")]
}

for class_label, list_of_files in data_path_dict.items():
    for single_file in list_of_files:
        audio, sample_rate = librosa.load(single_file) ## Loading file
        mfcc = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40) ## Apllying mfcc
        mfcc_processed = np.mean(mfcc.T, axis=0) ## some pre-processing
        all_data.append([mfcc_processed, class_label])
    print(f"Info: Succesfully Preprocessed Class Label {class_label}")

#saving data
df = pd.DataFrame(all_data, columns=["feature", "class_label"])
df.to_pickle("final_audio_data_csv/audio_data.csv")