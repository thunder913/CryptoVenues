namespace CryptoVenues.Domain.Configurations.Interfaces;

public interface IJwtConfiguration
{
    string Key { get; }
    string Issuer { get; }
    string Audience { get; }
}
