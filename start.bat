@echo off
title RainyInc Premium Sniper Launcher
cls
color 0b

echo [SYSTEM] Checking dependencies...
python -m pip install -r requirements.txt
cls

echo [SYSTEM] Starting RainyInc Sniper...
python main.py
pause