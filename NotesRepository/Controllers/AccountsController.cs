using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.VisualBasic.Syntax;
using NotesRepository.Areas.Identity.Data;
using NotesRepository.Data.DTOs;
using NotesRepository.Data.Models;
using NotesRepository.Repositories;
using NotesRepository.Services;
using Directory = NotesRepository.Data.Models.Directory;

namespace NotesRepository.Controllers;

[Route("api/accounts")]
[ApiController]
public class AccountsController : ControllerBase
{
    [HttpGet("get-by-id")]
    public async Task<ActionResult<ApplicationUser?>> GetAccount([FromBody] AccountDetails details, [FromServices] UserRepository ur)
    {
        var user = await ur.GetUserByIdAsync(details.Id);

        if (user == null)
            return NotFound();
        else return Ok(user);
    }

    [HttpGet("get-by-email")]
    public async Task<ActionResult<ApplicationUser?>> GetAccountByEmail([FromBody] AccountDetails details, [FromServices] UserRepository ur)
    {
        var user = await ur.GetUserByEmailAsync(details.Email);

        if (user == null)
            return NotFound();
        else return Ok(user);
    }

    [HttpPost("empty/")]
    public async Task<ActionResult<ApplicationUser>> CreateEmptyAccount([FromBody] AccountDetails details, [FromServices] UserRepository ur)
    {
        if (await ur.GetUserByEmailAsync(details.Email) is not null)
            return BadRequest();

        var user = new ApplicationUser
        {
            Id = Guid.NewGuid().ToString(),
            Email = details.Email,
            NormalizedEmail = details.Email.ToUpper(),
            UserName = details.Email,
            NormalizedUserName = details.Email.ToUpper(),
            EmailConfirmed = true,
            SecurityStamp = Guid.NewGuid().ToString(),
        };
        user.Directories = new List<Directory> { new Directory("Default", user), new Directory("Bin", user) };
        var hasher = new PasswordHasher<ApplicationUser>();
        var hashed = hasher.HashPassword(user, details.Password);
        user.PasswordHash = hashed;
        if (await ur.AddUserAsync(user))
            return CreatedAtAction(nameof(GetAccount), new { id = user.Id }, user);
        else return BadRequest();
    }

    [HttpPost("with-note/")]
    public async Task<ActionResult<ApplicationUser>> CreateAccountWithNote([FromBody] AccountDetails details,
        [FromServices] UserRepository ur, [FromServices] NoteService ns)
    {
        if (await ur.GetUserByEmailAsync(details.Email) is not null)
            return BadRequest();

        var customDirId = Guid.NewGuid();
        var user = new ApplicationUser
        {
            Id = Guid.NewGuid().ToString(),
            Email = details.Email,
            NormalizedEmail = details.Email.ToUpper(),
            UserName = details.Email,
            NormalizedUserName = details.Email.ToUpper(),
            EmailConfirmed = true,
            SecurityStamp = Guid.NewGuid().ToString(),
        };
        var customDir = new Directory("Custom", user, customDirId);
        user.Directories = new List<Directory> { new Directory("Default", user), new Directory("Bin", user), customDir};
        user.PasswordHash = new PasswordHasher<ApplicationUser>().HashPassword(user, details.Password);
        var wasUserAdded = await ur.AddUserAsync(user);
        var note = new Note
        {
            NoteId = Guid.NewGuid(),
            Title = "Password list",
            Content = "Note under default directory",
            CreatedAt = new DateTime(2019, 12, 24, 4, 20, 0),
            EditedAt = new DateTime(2021, 4, 21, 7, 42, 0),
            EditedBy = user,
            Owner = user,
            Directory = customDir,
            IsPinned = true
        };
        var wasNoteAdded = await ns.AddNoteAsync(note);
        if(wasUserAdded && wasNoteAdded)
            return CreatedAtAction(nameof(GetAccount), new { id = user.Id }, user);
        else return BadRequest();
    }

    [HttpPost("with-many-notes/")]
    public async Task<ActionResult<ApplicationUser>> CreateAccountWithManyNotes([FromBody] AccountDetails details,
        [FromServices] UserRepository ur, [FromServices] NoteService ns, [FromServices] EventService es)
    {
        if (await ur.GetUserByEmailAsync(details.Email) is not null)
            return BadRequest();

        var customDirId = Guid.NewGuid();
        var user = new ApplicationUser
        {
            Id = Guid.NewGuid().ToString(),
            Email = details.Email,
            NormalizedEmail = details.Email.ToUpper(),
            UserName = details.Email,
            NormalizedUserName = details.Email.ToUpper(),
            EmailConfirmed = true,
            SecurityStamp = Guid.NewGuid().ToString(),
        };
        var customDir = new Directory("Custom", user, customDirId);
        user.Directories = new List<Directory> { new Directory("Default", user), new Directory("Bin", user), customDir};
        user.PasswordHash = new PasswordHasher<ApplicationUser>().HashPassword(user, details.Password);
        var wasUserAdded = await ur.AddUserAsync(user);
        var random = new Random();
        for (int i = 0; i < 46; i++)
        {
            var note = new Note
            {
                NoteId = Guid.NewGuid(),
                Title = $"Note_{i}",
                Content = $"Note ({i}) under default directory",
                CreatedAt = new DateTime(2019, random.Next(1, 12),
                    random.Next(1, 28), random.Next(1, 12), 20, 0),
                EditedAt = new DateTime(2021, random.Next(1, 12), 
                    random.Next(1, 28), random.Next(1, 12), 42, 0),
                EditedBy = user,
                Owner = user,
                Directory = customDir,
                IsPinned = false
            };
            await ns.AddNoteAsync(note);
        }

        var @event = new Event(
            Guid.NewGuid(),
            "Mommy's 50th birthday",
            new DateTime(2024, 5, 28),
            new DateTime(2024, 5, 29),
            user);
        await es.AddAsync(@event);
        
        if(wasUserAdded)
            return CreatedAtAction(nameof(GetAccount), new { id = user.Id }, user);
        else return BadRequest();
    }
    
    [HttpDelete("delete-by-id")]
    public async Task<ActionResult<ApplicationUser>> DeleteAccountById([FromBody] AccountDetails details, [FromServices] UserRepository ur)
    {
        if (await ur.GetUserByIdAsync(details.Id) == null)
            return NotFound();
        else if (await ur.DeleteUserByIdAsync(details.Id))
            return NoContent();
        else return BadRequest();
    }

    [HttpDelete("delete-by-email")]
    public async Task<ActionResult<ApplicationUser>> DeleteAccountByEmail([FromBody] AccountDetails details, [FromServices] UserRepository ur)
    {
        var user = await ur.GetUserByEmailAsync(details.Email);
        if (user == null)
            return NotFound();
        else
        {
            if (await ur.DeleteUserByIdAsync(user.Id))
                return NoContent();
            else
                return BadRequest();
        }
    }
}
