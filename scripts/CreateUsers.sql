
-- Create logins at server level (idempotent)
IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'dyvenix_admin')
BEGIN
    CREATE LOGIN dyvenix_admin WITH PASSWORD = 'dyv_pwd1';
END

IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'dyvenix_app')
BEGIN
    CREATE LOGIN dyvenix_app WITH PASSWORD = 'dyv_pwd1';
END

-- Create dyvenix database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'dyvenix')
BEGIN
    CREATE DATABASE dyvenix;
END
GO

USE dyvenix;
GO

-- Create users in the database (idempotent)
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'dyvenix_admin')
BEGIN
    CREATE USER dyvenix_admin FOR LOGIN dyvenix_admin;
END

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'dyvenix_app')
BEGIN
    CREATE USER dyvenix_app FOR LOGIN dyvenix_app;
END

-- Assign role memberships
-- Add dyvenix_admin to db_owner role
IF NOT IS_ROLEMEMBER('db_owner', 'dyvenix_admin') = 1
BEGIN
    ALTER ROLE db_owner ADD MEMBER dyvenix_admin;
END

-- Add dyvenix_app to db_datareader and db_datawriter roles
IF NOT IS_ROLEMEMBER('db_datareader', 'dyvenix_app') = 1
BEGIN
    ALTER ROLE db_datareader ADD MEMBER dyvenix_app;
END

IF NOT IS_ROLEMEMBER('db_datawriter', 'dyvenix_app') = 1
BEGIN
    ALTER ROLE db_datawriter ADD MEMBER dyvenix_app;
END