@echo off
setlocal EnableDelayedExpansion

:: Get the first argument
set arg=%1

:: Handle empty argument
if "%arg%"=="" (
    echo No argument provided. Please specify one of: dyv, starter, demo.
    exit /b 1
)

echo -------  %arg%  ------------

:: Determine the directory
if /i "%arg%"=="dyv" (
    cd /d "%~dp0..\src\app1\app1.ui"
    set port=4200

) else if /i "%arg%"=="starter" (
    cd /d "%~dp0..\..\Fuse\starter"
    set port=4210

) else if /i "%arg%"=="demo" (
    cd /d "%~dp0..\..\Fuse\demo"
    set port=4220

) else (
    echo Invalid argument: %arg%
    echo Valid options are: dyv, starter, demo.
    exit /b 1
)

call ng serve --port %port% --ssl --ssl-key C:\ProgramData\certs\localhost.key --ssl-cert C:\ProgramData\certs\localhost.crt

