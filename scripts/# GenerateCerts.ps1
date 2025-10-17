# Generate certificate
$cert = New-SelfSignedCertificate -DnsName "localhost" -CertStoreLocation "cert:\LocalMachine\My" -NotAfter (Get-Date).AddYears(1)

# Export to PFX
$pwd = ConvertTo-SecureString -String "pwd" -Force -AsPlainText
Export-PfxCertificate -Cert $cert -FilePath "localhost.pfx" -Password $pwd

# Convert PFX to CRT and KEY using OpenSSL
openssl pkcs12 -in localhost.pfx -clcerts -nokeys -out C:\ProgramData\Certs\localhost.crt -passin pass:pwd
openssl pkcs12 -in localhost.pfx -nocerts -nodes -out C:\ProgramData\Certs\localhost.key -passin pass:pwd