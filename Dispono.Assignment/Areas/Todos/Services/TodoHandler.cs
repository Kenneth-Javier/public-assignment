using Dispono.Assignment.Areas.Todos.Models;
using Dispono.Assignment.Context;
using Dispono.Assignment.Exceptions;

namespace Dispono.Assignment.Areas.Todos.Services;

public class TodoHandler : ITodoHandler
{
    private readonly InMemoryContext _db;

    public TodoHandler(InMemoryContext db)
    {
        _db = db;
    }

    public async Task<Todo> AddAsync(TodoInput input)
    {
        var todo = new Todo(input.Description);
        await _db.Todos.AddAsync(todo);
        await _db.SaveChangesAsync();

        return todo;
    }

    public async Task<Todo> ToggleAsync(int todoId)
    {
        // TODO
        // Ta inspiration från metoderna "AddAsync" och "DeleteAsync"
        // Hämta uppgiften från databasen med det id som skickas in
        // Om det inte finns en en uppgift med det id:et så throw:a NotFoundException
        // Använd metoden "Toggle" på entiteten, spara till databasen och returnera affärsobjektet 
        
        throw new NotImplementedException();
    }

    public async Task DeleteAsync(int todoId)
    {
        var todo = await _db.Todos.FindAsync(todoId);
        if (todo == null) throw new NotFoundException();

        _db.Todos.Remove(todo);
        await _db.SaveChangesAsync();
    }
}