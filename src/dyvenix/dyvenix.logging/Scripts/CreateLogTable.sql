/*
    DROP TABLE IF EXISTS [Logs].[LogEvents];
    DROP USER IF EXISTS [dyvenix_app];
    DROP LOGIN [dyvenix_app];
    DROP SCHEMA IF EXISTS [Logs];
*/

CREATE SCHEMA [Logs];
GO

PRINT 'Created the DB schema'

CREATE LOGIN [dyvenix_app] WITH PASSWORD = 'pwd';
CREATE USER [dyvenix_app] FOR LOGIN [dyvenix_app] WITH DEFAULT_SCHEMA = Logs;

IF  NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[Logs].[LogEvents]') AND type in (N'U'))
BEGIN
    CREATE TABLE [Logs].[LogEvents]
    (
        [Id] [int] IDENTITY(1,1) PRIMARY KEY NONCLUSTERED,
        [TimeStampUTC] [datetime] NULL,
        [LogLevel] [int] NULL,
        [Application] [nvarchar](200) NULL,
        [Source] [nvarchar](200) NULL,
        [Message] [nvarchar](max) NULL,
        [CorrelationId] [nvarchar](50) NULL,
        [Exception] [nvarchar](max) NULL
    )
END

IF NOT EXISTS(SELECT * FROM sys.indexes WHERE name = 'IX_LogEvents_TimeStampUTC' AND object_id = OBJECT_ID('Logs.LogEvents'))
BEGIN
    CREATE NONCLUSTERED INDEX IX_LogEvents_TimeStampUTC ON Logs.LogEvents (TimeStampUTC);
END

IF NOT EXISTS(SELECT * FROM sys.indexes WHERE name = 'IX_LogEvents_CorrelationId' AND object_id = OBJECT_ID('Logs.LogEvents'))
BEGIN
    CREATE NONCLUSTERED INDEX IX_LogEvents_CorrelationId ON Logs.LogEvents (CorrelationId);
END

IF NOT EXISTS(SELECT * FROM sys.indexes WHERE name = 'IX_LogEvents_Source' AND object_id = OBJECT_ID('Logs.LogEvents'))
BEGIN
    CREATE NONCLUSTERED INDEX IX_LogEvents_Source ON Logs.LogEvents (Source);
END

GRANT SELECT ON Logs.LogEvents TO dyvenix_app;
GRANT INSERT ON Logs.LogEvents TO dyvenix_app;

