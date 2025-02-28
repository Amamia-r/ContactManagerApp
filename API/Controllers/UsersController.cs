using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController(DataContext context) : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await context.Users.ToListAsync();

            return users;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = await context.Users.FindAsync(id);

            if (user == null) return NotFound();

            return user;
        }

        [HttpPost]
        public async Task<ActionResult<AppUser>> AddUser(AppUser user)
        {
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<AppUser>> DeleteUser(int id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null) return NotFound();

            context.Users.Remove(user);
            await context.SaveChangesAsync();

            return NoContent();

        }

    }
}
