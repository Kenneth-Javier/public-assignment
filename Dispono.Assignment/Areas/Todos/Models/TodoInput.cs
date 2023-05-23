using System.ComponentModel.DataAnnotations;

namespace Dispono.Assignment.Areas.Todos.Models;

public class TodoInput
{
    [MinLength(1, ErrorMessage = "Beskrivning kan inte vara tom")]
    public string Description { get; set; }
}