namespace Dispono.Assignment.Areas.Todos.Models;

public class Todo
{
    public Todo()
    {
    }

    public Todo(string description)
    {
        Description = description;
    }

    public void Toggle()
    {
        CompletedAt = CompletedAt == null ? DateTimeOffset.Now : null;
    }

    public int Id { get; set; }

    public string Description { get; set; }

    public DateTimeOffset? CompletedAt { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
}