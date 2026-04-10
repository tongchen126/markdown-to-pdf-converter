@echo off
REM Markdown to PDF Converter - Windows Batch Script
REM Usage: convert.bat input.md [output.pdf]

setlocal

if "%~1"=="" (
    echo ================================================
    echo   Markdown to PDF Converter
    echo ================================================
    echo.
    echo Usage: convert.bat input.md [output.pdf]
    echo.
    echo Examples:
    echo   convert.bat document.md
    echo   convert.bat document.md output.pdf
    echo   convert.bat ..\document.md
    echo.
    echo ================================================
    exit /b 1
)

REM Get the directory where this batch file is located
set SCRIPT_DIR=%~dp0

REM Run the Node.js script
node "%SCRIPT_DIR%md2pdf.js" %*

endlocal
