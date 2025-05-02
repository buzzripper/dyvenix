namespace Dyvenix.Core.Models;

public class ControllerResponseBase<T> where T : class
{
	public int ResultCode { get; set; }
	public string ResultMessage { get; set; }
	public T Data { get; set; }
}
