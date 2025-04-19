
:: Run NPM server for Angular

::CD /d "%~dp0..\src\app1.client"

CD /d "%~dp0..\src\b2c-auth-sample"

::ng serve --ssl --ssl-key C:\ProgramData\certs\localhost-key.pem --ssl-cert C:\ProgramData\certs\localhost.pem
ng serve --ssl --ssl-key C:\ProgramData\certs\localhost.key --ssl-cert C:\ProgramData\certs\localhost.crt
