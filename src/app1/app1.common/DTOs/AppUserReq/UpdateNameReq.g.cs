//------------------------------------------------------------------------------------------------------------
// This file was auto-generated. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using System;

namespace Dyvenix.App1.Server.DTOs;

public class UpdateNameReq
{
	public Guid Id { get; set; }
	public byte[] RowVersion { get; set; }
	public string FirstName { get; set; }
	public string LastName { get; set; }

}
