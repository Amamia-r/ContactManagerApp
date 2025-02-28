using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Contact
{
    public int Id { get; set; }
    public required string ContactName { get; set; }
    public string ContactEmail { get; set; } = string.Empty;
    public string ContactPhone { get; set; } = string.Empty;
    public string ContactAddress { get; set; } = string.Empty;

}
