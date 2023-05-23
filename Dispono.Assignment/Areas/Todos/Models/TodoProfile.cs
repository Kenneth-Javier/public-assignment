using AutoMapper;

namespace Dispono.Assignment.Areas.Todos.Models;

public class TodoProfile : Profile
{
    public TodoProfile()
    {
        CreateMap<Todo, TodoDto>();
    }
}