//------------------------------------------------------------------------------------------------------------
// This file was auto-generated. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using System;
using Dyvenix.App1.Common.Entities;

namespace Dyvenix.App1.Server.DTOs;

public class UpdateUserTypeReq
{
	public Guid Id { get; set; }
	public byte[] RowVersion { get; set; }
	public UserType UserType { get; set; }

}
