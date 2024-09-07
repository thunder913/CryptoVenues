using CryptoVenues.Domain.Configurations.Interfaces;

namespace CryptoVenues.Domain.Configurations;

public class JwtConfiguration : IJwtConfiguration
{
    public string Key { get; set; }
    public string Issuer { get; set; }
    public string Audience { get; set; }
}
