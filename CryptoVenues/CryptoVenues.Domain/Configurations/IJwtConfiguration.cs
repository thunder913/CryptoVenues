namespace CryptoVenues.Domain.Configurations;

public interface IJwtConfiguration
{
    string Key { get; }
    string Issuer { get; }
    string Audience { get; }
}
