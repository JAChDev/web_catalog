USE [master]
GO
/****** Object:  Database [ShopItemsDB]    Script Date: 19/04/2022 1:52:53 p. m. ******/
CREATE DATABASE [ShopItemsDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ShopItemsDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\ShopItemsDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ShopItemsDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\ShopItemsDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [ShopItemsDB] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ShopItemsDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ShopItemsDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ShopItemsDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ShopItemsDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ShopItemsDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ShopItemsDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [ShopItemsDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ShopItemsDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ShopItemsDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ShopItemsDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ShopItemsDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ShopItemsDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ShopItemsDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ShopItemsDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ShopItemsDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ShopItemsDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ShopItemsDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ShopItemsDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ShopItemsDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ShopItemsDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ShopItemsDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ShopItemsDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ShopItemsDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ShopItemsDB] SET RECOVERY FULL 
GO
ALTER DATABASE [ShopItemsDB] SET  MULTI_USER 
GO
ALTER DATABASE [ShopItemsDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ShopItemsDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ShopItemsDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ShopItemsDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ShopItemsDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ShopItemsDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'ShopItemsDB', N'ON'
GO
ALTER DATABASE [ShopItemsDB] SET QUERY_STORE = OFF
GO
USE [ShopItemsDB]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 19/04/2022 1:52:54 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
	[Description] [varchar](150) NULL,
	[ImagePath] [varchar](1000) NULL,
	[Type] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Products] ON 
GO
INSERT [dbo].[Products] ([Id], [Name], [Description], [ImagePath], [Type]) VALUES (2, N'Jabon corporal', N'Body product', N'https://mejorconsalud.as.com/wp-content/uploads/2016/10/jabon.jpg', N'Higiene y Salud')
GO
INSERT [dbo].[Products] ([Id], [Name], [Description], [ImagePath], [Type]) VALUES (8, N'Lego City', N'Juguete armable Lego city', N'http://cdn.shopify.com/s/files/1/0254/0093/4474/products/60312_384x384.jpg?v=1645041137', N'Juguetería')
GO
INSERT [dbo].[Products] ([Id], [Name], [Description], [ImagePath], [Type]) VALUES (10, N'Doritos Flamming hot', N'Snack de maíz con sabor picante y queso', N'https://shalommarket.com.co/wp-content/uploads/2021/05/cheetos-flamin-hot-x-37-gr.jpg', N'Alimentos')
GO
INSERT [dbo].[Products] ([Id], [Name], [Description], [ImagePath], [Type]) VALUES (13, N'Doritos Flamming hot Nacho', N'Snack de maíz con sabor a queso y nachos picantes', N'https://m.media-amazon.com/images/I/81P+2BOhgtL._SX425_.jpg', N'Alimentos')
GO
INSERT [dbo].[Products] ([Id], [Name], [Description], [ImagePath], [Type]) VALUES (64, N'Laptop HP', N'Laptop HP Windows 11 con pantalla de 14"', N'https://d34vmoxq6ylzee.cloudfront.net/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/1/8/18V61LA-1_T1602002018.png', N'Tecnología')
GO
INSERT [dbo].[Products] ([Id], [Name], [Description], [ImagePath], [Type]) VALUES (65, N'Kit Prismacolor Premier', N'Kit prismacolor premier con 150 lápices de colores', N'https://m.media-amazon.com/images/I/811Y0d3mJFL._AC_SY355_.jpg', N'Papelería y útiles escolares')
GO
SET IDENTITY_INSERT [dbo].[Products] OFF
GO
/****** Object:  StoredProcedure [dbo].[SP_AddProducts]    Script Date: 19/04/2022 1:52:54 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jonatan Amado
-- Create date: 10-04-2022
-- Description:	Add item to products table
-- =============================================

CREATE PROCEDURE [dbo].[SP_AddProducts] 
	(
	@Name VARCHAR(50)
	, @Description VARCHAR(150)
	, @Type VARCHAR(50)
	, @ImagePath VARCHAR(1000)
	)
AS

INSERT INTO dbo.Products (Name,Description,ImagePath,Type) VALUES (@Name, @Description, @ImagePath, @Type)


GO
/****** Object:  StoredProcedure [dbo].[SP_DeleteProducts]    Script Date: 19/04/2022 1:52:54 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jonatan Amado
-- Create date: 10-04-2022
-- Description:	Delete items from products table
-- =============================================
CREATE PROCEDURE [dbo].[SP_DeleteProducts] 
	(
		@Id INT
		, @Name VARCHAR(50)
	)
AS

DELETE FROM dbo.Products WHERE Id = @Id AND Name = @Name 
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProducts]    Script Date: 19/04/2022 1:52:54 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jonatan Amado
-- Create date: 10-04-2022
-- Description:	Get items from products table
-- =============================================
CREATE PROCEDURE [dbo].[SP_GetProducts] 

AS

SELECT P.Id
	   , P.Name
	   , P.Description
	   , P.Type
	   , P.ImagePath
FROM Products P
GO
/****** Object:  StoredProcedure [dbo].[SP_GetProductsFilter]    Script Date: 19/04/2022 1:52:54 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jonatan Amado
-- Create date: 10-04-2022
-- Description:	Get items by category and name
-- =============================================
CREATE PROCEDURE [dbo].[SP_GetProductsFilter]
	(
		@Type VARCHAR(50)
		, @Name VARCHAR(50)
		, @Description VARCHAR(150)
	)
AS

IF (@Type IS NULL OR @Type = 'All' OR @Type = '') AND (@Description IS NULL OR @Description = 'Empty') AND (@Name IS NOT NULL AND @Name <> 'Empty')
	(
		SELECT P.Id
		   , P.Name
		   , P.Description
		   , P.Type
		   , P.ImagePath
		FROM Products P WHERE Name like '%'+@Name+'%'
	)

ELSE IF (@Type IS NULL OR @Type = 'All' OR @Type = '') AND (@Description IS NOT NULL AND @Description <> 'Empty') AND (@Name IS NULL OR @Name = 'Empty')
	(
		SELECT P.Id
		   , P.Name
		   , P.Description
		   , P.Type
		   , P.ImagePath
		FROM Products P WHERE Description like '%'+@Description+'%'
	)

ELSE IF ( @Type <> 'All') AND (@Name IS NOT NULL AND @Name <> 'Empty')  AND (@Description IS NULL OR @Description = 'Empty')
		SELECT P.Id
			   , P.Name
			   , P.Description
			   , P.Type
			   , P.ImagePath
		FROM Products P WHERE Type = @Type AND Name like '%'+@Name+'%'

ELSE IF ( @Type <> 'All') AND (@Name IS NULL OR @Name = 'Empty') AND (@Description IS NOT NULL AND @Description <> 'Empty')
		SELECT P.Id
			   , P.Name
			   , P.Description
			   , P.Type
			   , P.ImagePath
		FROM Products P WHERE Type = @Type AND Description like '%'+@Description+'%'

ELSE IF ( @Type <> 'All') AND (@Name IS NOT NULL AND @Name <> 'Empty') AND (@Description IS NOT NULL AND @Description <> 'Empty')
		SELECT P.Id
			   , P.Name
			   , P.Description
			   , P.Type
			   , P.ImagePath
		FROM Products P WHERE Type = @Type AND Name like '%'+@Name+'%' AND Description like '%'+@Description+'%'

ELSE IF ( @Type <> 'All') AND (@Name IS NULL OR @Name = 'Empty') AND (@Description IS NULL OR @Description = 'Empty')

		SELECT
			P.Id
			, P.Name
			, P.Description
			, P.ImagePath
			, P.Type
		FROM dbo.Products P WHERE Type = @Type

ELSE 
	
	SELECT
			P.Id
			, P.Name
			, P.Description
			, P.ImagePath
			, P.Type
		FROM dbo.Products P
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateProduct]    Script Date: 19/04/2022 1:52:54 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Jonatan Amado
-- Create date: 10-04-2022
-- Description:	Get items by category and name
-- =============================================
CREATE PROCEDURE [dbo].[SP_UpdateProduct]
(
	@Id int
	, @Name varchar(50)
	, @Description varchar(150)
	, @ImagePath varchar(1000)
	, @Type varchar(50)
)
AS

UPDATE [dbo].[Products] SET Name=@Name, Description=@Description, ImagePath=@ImagePath, Type=@Type WHERE Id=@Id
GO
USE [master]
GO
ALTER DATABASE [ShopItemsDB] SET  READ_WRITE 
GO
