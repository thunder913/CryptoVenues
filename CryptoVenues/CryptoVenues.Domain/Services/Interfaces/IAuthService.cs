namespace CryptoVenues.Domain.Services.Interfaces;

public interface IAuthService
{
    bool VerifyPassword(string password, string passwordHash);
    string GenerateJwtToken(string username);
    string HashPassword(string password);
}
