import pyttsx3
import speech_recognition as sr
import requests
import datetime
import time

engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)
hotword = 'jarvis'

endpoints = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6']

def speak(audio):
    engine.say(audio)
    engine.runAndWait()

def wishMe():
    hour = int(datetime.datetime.now().hour)
    if hour>=0 and hour<12:
        speak("Good Morning Toad!")

    elif hour>=12 and hour<18:
        speak("Good Afternoon Toad!")   

    else:
        speak("Good Evening Toad!")  

    speak("I am Celeste. How may I help you") 

def takeCommand():

    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("[+] Listening...\n")
        r.pause_threshold = 1
        audio = r.listen(source, phrase_time_limit=None, timeout=None)

    try:
        print("[+] Recognizing...\n")    
        query = r.recognize_google(audio, language='en-in')
        print(f"User said: {query}\n")

    except Exception as e:
        print(e)    
        print("[!] Say that again please...\n")  
        return "None"
    return query

def main():
    while True:
        query = takeCommand().lower()

        if hotword in query:
            speak('How may I help you?')
            query = takeCommand().lower()

            i = 0
            for i in endpoints:
                if ( endpoints[i] in query):
                    link = 'https://bulldog-promoted-accurately.ngrok-free.app/'+endpoints[i]
                    op = requests.get(link)
                    speak(op.text)

            if 'turn on the hall room light' in query:
                op = requests.get('https://bulldog-promoted-accurately.ngrok-free.app/t1')
                speak(op.text)
            elif 'turn off the hall room light' in query:
                op = requests.get('https://bulldog-promoted-accurately.ngrok-free.app/t1')
                speak(op.text)
            elif 'turn on the bedroom light' in query:
                op = requests.get('https://bulldog-promoted-accurately.ngrok-free.app/t2')
                speak(op.text)
            elif 'turn off the bedroom light' in query:
                op = requests.get('https://bulldog-promoted-accurately.ngrok-free.app/t2')
                speak(op.text)
            elif 'turn on power saver for hall room' in query:
                op = requests.get('https://bulldog-promoted-accurately.ngrok-free.app/t3')
                speak(op.text)
            elif 'turn on power saver for bedroom' in query:
                op = requests.get('https://bulldog-promoted-accurately.ngrok-free.app/t3')
                speak(op.text)
            elif 'turn off power saver for hall room' in query:
                op = requests.get('https://bulldog-promoted-accurately.ngrok-free.app/t4')
                speak(op.text)
            elif 'turn off power saver for bedroom' in query:
                op = requests.get('https://bulldog-promoted-accurately.ngrok-free.app/t4')
                speak(op.text)
            else:
                speak('Could you say that again please?')

if __name__ == "__main__":
    main()