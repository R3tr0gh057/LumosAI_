@echo off

:: Open a new Command Prompt window and run ngrok
start cmd /k "ngrok http --domain=bulldog-promoted-accurately.ngrok-free.app http://192.168.64.13:3000/"

:: Run Python script
echo Running Python script...
start cmd /k "python D:\--PROJECTS2024--\LumosAI_\AI\celeste.py"

:: Pause to keep the window open
pause
