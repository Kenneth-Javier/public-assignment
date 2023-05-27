using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Dispono.Assignment.Context;
using Microsoft.EntityFrameworkCore;
using Dispono.Assignment.Exceptions;
using Dispono.Assignment.Areas.Todos.Models;
using Dispono.Assignment.Areas.Todos.Services;

namespace Dispono.Assignment.Areas.Todos.Controllers;

[ApiController]
[Route("api/todos")]
[Produces("application/json")]
public class TodosController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly ITodoHandler _todos;
    private readonly InMemoryContext _db;

    public TodosController(IMapper mapper, ITodoHandler todos, InMemoryContext db)
    {
        _db = db;
        _todos = todos;
        _mapper = mapper;
    }

    [HttpGet("")]
    [ProducesResponseType(typeof(List<TodoDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var todos = await _mapper
                          .ProjectTo<TodoDto>(_db.Todos)
                          .ToListAsync(cancellationToken);

        return Ok(todos);
    }

    [HttpPost("")]
    [ProducesResponseType(typeof(TodoDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Add([FromBody] TodoInput input)
    {
        var todo = await _todos.AddAsync(input);
        return Ok(_mapper.Map<TodoDto>(todo));
    }

    [HttpPatch("{todoId:int}/toggle")]
    [ProducesResponseType(typeof(TodoDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Toggle([FromRoute] int todoId)
    {
        // TODO
        // Gör ett try-catch-block som använder sig av servicen ITodoHandler
        // Om exceptionet NotFoundException throwas, returnera "NotFound()"
        // Om operationen lyckas, returnera Ok och mappa affärsobjektet till en DTO
        // Ta inspiration från controller-metoderna "Add" och "Delete" 

        try
        {
            var todo = await _todos.ToggleAsync(todoId);
            return Ok(_mapper.Map<TodoDto>(todo));
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{todoId:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Delete([FromRoute] int todoId)
    {
        try
        {
            await _todos.DeleteAsync(todoId);
            return NoContent();
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
    }
}