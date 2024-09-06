namespace CryptoVenues.Domain.Payloads;

public class AuthPayload
{
    public AuthPayload(string username, string token, string tokenExpiry)
    {
        Username = username;
        Token = token;
        TokenExpiry = tokenExpiry;
    }

    public string Username { get; set; }
    public string Token { get; set; }
    public string TokenExpiry { get; set; }
}
