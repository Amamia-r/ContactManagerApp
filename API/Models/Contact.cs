namespace API.Models;

public class Contact
{
    public int Id { get; set; }
    public required string ContactName { get; set; }
    public string ContactTitle { get; set; } = string.Empty;
    public string ContactCompany { get; set; } = string.Empty;
    public string ContactAddress { get; set; } = string.Empty;
    public string ContactPhone { get; set; } = string.Empty;
    public string ContactEmail { get; set; } = string.Empty;

}
