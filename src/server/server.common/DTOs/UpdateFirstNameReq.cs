using System;

namespace Dyvenix.Server.Common.DTOs;

public class UpdateFirstNameReq
{
	public Guid Id { get; set; }
	public byte[] RowVersion { get; set; }
	public string FirstName { get; set; }
}
