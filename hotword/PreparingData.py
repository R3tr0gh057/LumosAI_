import sounddevice as sd
from scipy.io.wavfile import write
import sys

def record_audio_and_save(save_path, n_times):

    input("To start recording Wake Word press Enter: ")
    for i in range(n_times):
        fs = 44100
        seconds = 2

        myrecording = sd.rec(int(seconds * fs), samplerate=fs, channels=2)
        sd.wait()
        write(save_path + str(i) + ".wav", fs, myrecording)
        input(f"Press to record next or two stop press ctrl + C ({i + 1}/{n_times}): ")

def record_background_sound(save_path, n_times):

    input("To start recording your background sounds press Enter: ")
    for i in range(n_times):
        fs = 44100
        seconds = 2 

        myrecording = sd.rec(int(seconds * fs), samplerate=fs, channels=2)
        sd.wait()
        write(save_path + str(i) + ".wav", fs, myrecording)
        print(f"Currently on {i+1}/{n_times}")

if __name__ == "__main__":
    wakepath = str(sys.argv[1])
    wakereps = int(sys.argv[2])
    backpath = str(sys.argv[3])
    backreps = int(sys.argv[4])

    print("Recording the Wake Word:\n")
    record_audio_and_save(wakepath, wakereps)
    print("Recording the Background sounds:\n")
    record_background_sound(backpath, backreps)