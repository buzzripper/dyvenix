using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Dyvenix.App1.Data.Contexts;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<Db>
{
	public Db CreateDbContext(string[] args)
	{
		var optionsBuilder = new DbContextOptionsBuilder<Db>();
		optionsBuilder.UseSqlServer("Password=?#cbz84A#znn5gL3pap;User ID=dyvenix_admin;Initial Catalog=dyvenix;Data Source=localhost;Encrypt=False;");

		return new Db(optionsBuilder.Options);
	}
}