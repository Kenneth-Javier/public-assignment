namespace Dispono.Assignment.Areas.Todos.Models;

public class TodoDto
{
    public int Id { get; set; }

    public string Description { get; set; }

    public DateTimeOffset? CompletedAt { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}