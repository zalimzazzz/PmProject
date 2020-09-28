using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PmProject.API.Models;

namespace PmProject.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        // public DbSet<Like> Likes { get; set; }
        public DbSet<TemplateServiceOrder> TemplateServiceOrder { get; set; }
        public DbSet<TemplateServiceOrderQuestion> TemplateServiceOrderQuestion { get; set; }
        public DbSet<TemplateServiceOrderAnswer> TemplateServiceOrderAnswer { get; set; }
        public DbSet<Project> Project { get; set; }
        public DbSet<ServiceOrder> ServiceOrder { get; set; }
        public DbSet<ServiceOrderQAndA> ServiceOrderQAndA { get; set; }
        public DbSet<Role> Role { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {


        }
        public DbSet<Company> Company { get; set; }
        public DbSet<SurveyHeaders> SurveyHeaders { get; set; }
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken)) //for auto ModifiedDate
        {
            var entries = ChangeTracker
        .Entries()
        .Where(e => e.Entity is BaesClass && (
                e.State == EntityState.Added
                || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                ((BaesClass)entityEntry.Entity).ModifiedDate = DateTime.Now;

                // if (entityEntry.State == EntityState.Added)
                // {
                //     ((BaesClass)entityEntry.Entity).CreateDate = DateTime.Now;
                // }
            }
            return (await base.SaveChangesAsync(true, cancellationToken));
        }
    }
}