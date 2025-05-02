using System;

namespace Dyvenix.App1.Common.DTOs;

public class UpdateFirstNameReq
{
	public Guid Id { get; set; }
	public byte[] RowVersion { get; set; }
	public string FirstName { get; set; }
}
