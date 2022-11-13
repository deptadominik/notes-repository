using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NotesRepository.Areas.Identity.Data;
using NotesRepository.Data.DTOs;
using NotesRepository.Repositories;
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
