//------------------------------------------------------------------------------------------------------------
// This file was auto-generated ${{CURR_TIMESTAMP}}. Any changes made to it will be lost.
//------------------------------------------------------------------------------------------------------------
using Microsoft.EntityFrameworkCore;
using Dyvenix.App1.Common.Entities;


namespace Dyvenix.App1.Data;

public partial class Db : DbContext
{
    public Db(DbContextOptions<Db> options)
        : base(options)
    {
    }

    # region Properties

	public DbSet<AppUser> AppUser { get; set; }
	public DbSet<AccessClaim> AccessClaim { get; set; }

    # endregion

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
		modelBuilder.Entity<AppUser>(entity =>
		{
			entity.ToTable("AppUser");

			// PK
			entity.HasKey(e => e.Id);

			entity.Property(e => e.RowVersion).IsRowVersion();

			// Properties
			entity.Property(e => e.IsEnabled).IsRequired(true);
			entity.Property(e => e.FirstName).IsRequired(true).HasMaxLength(100);
			entity.Property(e => e.LastName).IsRequired(true).HasMaxLength(100);
			entity.Property(e => e.Email).IsRequired(true).HasMaxLength(200);
			entity.Property(e => e.CompanyId).IsRequired(false).HasMaxLength(10);
			entity.Property(e => e.ExtId).IsRequired(true).HasMaxLength(68);
			entity.Property(e => e.GroupCode).IsRequired(false);
			entity.Property(e => e.UserType).IsRequired(true);

			// Indexes
			entity.HasIndex(e => e.Id, "IX_AppUser_Id").IsUnique();
			entity.HasIndex(e => e.LastName, "IX_AppUser_LastName");
			entity.HasIndex(e => e.Email, "IX_AppUser_Email");
			entity.HasIndex(e => e.CompanyId, "IX_AppUser_CompanyId");
			entity.HasIndex(e => e.ExtId, "IX_AppUser_ExtId");
		});

		modelBuilder.Entity<AccessClaim>(entity =>
		{
			entity.ToTable("AccessClaim");

			// PK
			entity.HasKey(e => e.Id);

			entity.Property(e => e.RowVersion).IsRowVersion();

			// Properties
			entity.Property(e => e.ClaimName).IsRequired(true).HasMaxLength(100);
			entity.Property(e => e.ClaimValue).IsRequired(false).HasMaxLength(200);
			entity.Property(e => e.AppUserId).IsRequired(true);

			// Indexes
			entity.HasIndex(e => e.Id, "IX_AccessClaim_Id").IsUnique();
			entity.HasIndex(e => e.AppUserId, "IX_AccessClaim_AppUserId");
		});


        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
