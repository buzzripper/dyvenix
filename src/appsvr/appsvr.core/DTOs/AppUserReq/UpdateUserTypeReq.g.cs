//------------------------------------------------------------------------------------------------------------
// This file was auto-generated. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using System;
using Dyvenix.Common.Core.Entities;

namespace Dyvenix.AppSvr.Common.DTOs;

public class UpdateUserTypeReq
{
	public Guid Id { get; set; }
	public byte[] RowVersion { get; set; }
	public UserType UserType { get; set; }

}
