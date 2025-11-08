
set "SCRIPT_DIR=%~dp0"

CD "%SCRIPT_DIR%..\src\ui\angular"
 

ng serve

::PRINT %CD_DIR%
::PAUSE