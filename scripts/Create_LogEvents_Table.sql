/****** Object:  Table [Logs].[LogEvents]    Script Date: 3/3/2025 9:33:19 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'Logs')
BEGIN
    EXEC('CREATE SCHEMA [Logs]');
END
GO

IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = 'Logs' 
      AND TABLE_NAME = 'LogEvents'
)
BEGIN
	CREATE TABLE [Logs].[LogEvents](
		[Id] [int] IDENTITY(1,1) NOT NULL,
		[Message] [nvarchar](max) NULL,
		[Timestamp] [datetime] NULL,
		[Exception] [nvarchar](max) NULL,
		[LogLevel] [int] NULL,
		[Application] [nvarchar](200) NULL,
		[Source] [nvarchar](200) NULL,
		[CorrelationId] [nvarchar](50) NULL,
	 CONSTRAINT [PK_LogEvents] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
	) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'dyvenix_admin')
BEGIN
    CREATE USER [dyvenix_admin] FOR LOGIN [dyvenix_admin] WITH DEFAULT_SCHEMA=[dbo]
	ALTER ROLE db_owner ADD MEMBER [dyvenix_admin];
END

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'dyvenix_app')
BEGIN
    CREATE USER [dyvenix_app] FOR LOGIN [dyvenix_app] WITH DEFAULT_SCHEMA=[dbo]
	ALTER ROLE db_datareader ADD MEMBER [dyvenix_app];
	ALTER ROLE db_datawriter ADD MEMBER [dyvenix_app];
END

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'SerilogUser')
BEGIN
    CREATE USER [SerilogUser] FOR LOGIN [SerilogUser] WITH DEFAULT_SCHEMA=[dbo]
	ALTER ROLE db_datareader ADD MEMBER [SerilogUser];
	ALTER ROLE db_datawriter ADD MEMBER [SerilogUser];
END

