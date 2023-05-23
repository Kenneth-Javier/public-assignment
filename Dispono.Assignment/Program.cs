using Dispono.Assignment.Areas.Todos.Services;
using Dispono.Assignment.Context;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();
builder.Services.AddControllersWithViews();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddTransient<ITodoHandler, TodoHandler>();
builder.Services.AddDbContext<InMemoryContext>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}
else
{
    app.UseSwagger(so => { so.RouteTemplate = "api/swagger/{documentName}/swagger.json"; });
    app.UseSwaggerUI(so =>
    {
        so.SwaggerEndpoint("/api/swagger/v1/swagger.json", "Dispono API");
        so.RoutePrefix = "api/swagger";
    });
}

app.UseExceptionHandler();
app.UseStatusCodePages();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();