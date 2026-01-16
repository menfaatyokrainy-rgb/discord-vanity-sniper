@echo off
TITLE RainyInc Sniper - Setup
color 0b

echo ##################################################
echo        RAINYINC SNIPER INSTALLATION TOOLS
echo ##################################################
echo.

node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [HATA] Node.js yuklu degil! Lutfen nodejs.org adresinden indirin.
    pause
    exit
)

echo [1/2] Kutuphaneler kontrol ediliyor...
call npm install axios colors discord.js-selfbot-v13 readline-sync --quiet

echo.
echo [2/2] Kurulum tamamlandi!
echo Artık start.bat dosyasini calistirarak baslatabilirsiniz.
echo.
pause