using Dispono.Assignment.Areas.Todos.Models;

namespace Dispono.Assignment.Areas.Todos.Services;

public interface ITodoHandler
{
    Task<Todo> AddAsync(TodoInput input);
    Task<Todo> ToggleAsync(int todoId);
    Task DeleteAsync(int todoId);
}