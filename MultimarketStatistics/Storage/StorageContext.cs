using Microsoft.EntityFrameworkCore;
using Storage.Entities;

namespace Storage
{
    public class StorageContext : DbContext
    {
        public DbSet<App> Apps { get; set; }
        public DbSet<Locale> Locales { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Version> Versions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Locale>()
                .HasKey(l => new {l.AppId, l.Market});

            modelBuilder.Entity<App>()
                .HasOne(a => a.User)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction)
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.SlackCredentials)
                .IsUnique(false);

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.App)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction)
                .IsRequired();

            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction)
                .IsRequired();

            modelBuilder.Entity<Review>()
                .HasOne(n => n.App)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction)
                .IsRequired();

            modelBuilder.Entity<Rating>()
                .HasOne(n => n.App)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction)
                .IsRequired();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "Host=postgres;Port=5432;Username=postgres;Password=wt;Database=postgres;";
            optionsBuilder.UseNpgsql(connectionString)
                .UseLazyLoadingProxies();
        }
    }
}