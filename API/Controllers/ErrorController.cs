using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ErrorController(DataContext context) : BaseController
    {
        [HttpGet("auth")]
        public ActionResult<Contact> GetAuth()
        {
            var someone = context.Contacts.Find(-1);
            if (someone == null) return NotFound();

            return someone;
        }

        [HttpGet("not-found")]
        public ActionResult<Contact> GetNotFound()
        {
            var someone = context.Contacts.Find(-1);
            if (someone == null) return NotFound();

            return someone;
        }

        [HttpGet("server-error")]
        public ActionResult<Contact> GetServerError()
        {
            var someone = context.Contacts.Find(-1) ?? throw new Exception("A bad thing has happened");
            
            return someone;
        }

        [HttpGet("bad-request")]
        public ActionResult<Contact> GetBadRequest()
        {
            return BadRequest("This was not a good request");
        }

    }
}
