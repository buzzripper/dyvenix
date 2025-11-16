@echo off
setlocal EnableDelayedExpansion

:: Get the first argument
set arg=%1

:: Handle empty argument
:: if "%arg%"=="" (
::     echo No argument provided. Please specify one of: portal, starter, demo.
::     exit /b 1
:: )

echo -------  %arg%  ------------

:: Determine the directory
if /i "%arg%"=="app1" (
    cd /d "%~dp0..\src\ui\Angular"
    set port=4200

) else if /i "%arg%"=="starter" (
    cd /d "D:\Code\Reference\Fuse\starter"
    set port=4200

) else if /i "%arg%"=="demo" (
    cd /d "D:\Code\Reference\Fuse\demo"
    set port=4200

) else (
    echo Invalid argument: %arg%
    echo Valid options are: portal, starter, demo.
    PAUSE
    exit /b 1
)

call ng serve --port %port%

IF ERRORLEVEL 1 (
    echo Angular server failed to start.
    PAUSE
    exit /b 1
)

::--ssl-key C:\ProgramData\Certs\localhost.key --ssl-cert C:\ProgramData\Certs\localhost.crt

