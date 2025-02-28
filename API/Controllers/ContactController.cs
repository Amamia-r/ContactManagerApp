using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ContactController(DataContext dataContext) : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            var contacts = await dataContext.Contacts.ToListAsync();

            return contacts;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Contact>> GetContactById(int id)
        {
            var contact = await dataContext.Contacts.FindAsync(id);
            if (contact == null) return NotFound();

            return contact;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<Contact>> UpdateContact(int id, Contact updatedContact)
        {
            var contact = await dataContext.Contacts.FindAsync(id);
            if (contact == null) return NotFound();

            contact.ContactName = updatedContact.ContactName;
            contact.ContactEmail = updatedContact.ContactEmail;
            contact.ContactPhone = updatedContact.ContactPhone;
            contact.ContactAddress = updatedContact.ContactAddress;

            await dataContext.SaveChangesAsync();

            return Ok("Contact updated");

        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Contact>> DeleteContact(int id)
        {
            var contact = await dataContext.Contacts.FindAsync(id);
            if (contact == null) return NotFound();

            dataContext.Contacts.Remove(contact);
            await dataContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Contact>> AddContact(Contact contact)
        {
            // Find the lowest available Id
            int nextId = await GetNextAvailableId();

            //manually assing the ID
            contact.Id = nextId;

            await dataContext.Contacts.AddAsync(contact);
            await dataContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContactById), new { id = contact.Id }, contact);
        }
        //Find the next availble ID

        // This first method is only good for small database and SQLITE

        public async Task<int> GetNextAvailableId()
        {
            var existingIds = await dataContext.Contacts.Select(c => c.Id).ToListAsync();

            int newId = 1; // start from 1
            while (existingIds.Contains(newId))
            {
                newId++; // Increment until an available ID is found
            }
            return newId;
        }

        // Here we are doing a direct SQL Query but is not supported for SQLITE

        /*
        private async Task<int> GetNextAvailableId()
        {
            // Execute raw SQL query to get the next available ID (as an integer)
            var nextId = await dataContext
                .Contacts
                .FromSqlRaw("SELECT TOP 1 Id + 1 FROM Contacts WHERE Id + 1 NOT IN (SELECT Id FROM Contacts) ORDER BY Id")
                .Select(x => x.Id)
                .FirstOrDefaultAsync();

            // If we find an available ID, return it; otherwise, return the next available after the max ID
            return nextId > 0 ? nextId : (await dataContext.Contacts.MaxAsync(c => c.Id)) + 1;
        }
        */


    }
}
