using Microsoft.EntityFrameworkCore;
using Dispono.Assignment.Areas.Todos.Models;

namespace Dispono.Assignment.Context;

public class InMemoryContext : DbContext
{
    public InMemoryContext(DbContextOptions<InMemoryContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseInMemoryDatabase("Test");
    }


    public DbSet<Todo> Todos { get; set; }
}