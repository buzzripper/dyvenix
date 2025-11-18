@echo off
setlocal EnableDelayedExpansion


:: Get the first argument
set arg=%1
set scriptDir=%~dp0
set angDir=%scriptDir%..\src\ui\Angular
set ssl_key=%angDir%\ssl\localhost.key
set ssl_cert=%angDir%\ssl\localhost.crt
set port=4200

echo %ssl_key%
echo %ssl_cert%
echo.

if exist %ssl_key% (
    echo YES
) else (
    echo no
)

CD %angDir%

::PAUSE
::exit /b 1

echo ---------------------------------------------------------------

echo Starting Angular dev server on HTTPS at port %port%
echo.
echo URL: https://localhost:%port%
echo.
echo Increasing Node.js header size limits to handle OIDC redirects...
echo.

:: Set Node.js options to increase header size
set NODE_OPTIONS=--max-http-header-size=32768

:: Check if SSL certificates exist
if exist "%ssl_key%" (
    if exist "%ssl_cert%" (
        echo Using SSL certificates:
        echo   Key: %ssl_key%
        echo   Cert: %ssl_cert%
        echo.
        call ng serve --port %port% --ssl --ssl-key %ssl_key% --ssl-cert %ssl_cert%
    ) else (
        echo WARNING: SSL certificate not found at %ssl_cert%
        echo Falling back to HTTP
        echo.
        call ng serve --port %port%
    )
) else (
    echo WARNING: SSL key not found at %ssl_key%
    echo Falling back to HTTP
    echo.
    call ng serve --port %port%
)

IF ERRORLEVEL 1 (
    echo Angular server failed to start.
    PAUSE
    exit /b 1
)

::--ssl-key C:\ProgramData\Certs\localhost.key --ssl-cert C:\ProgramData\Certs\localhost.crt

