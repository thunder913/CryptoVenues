using CryptoVenues.Domain.Configurations.Interfaces;

namespace CryptoVenues.Domain.Configurations;

public class CoinmapConfiguration : ICoinmapConfiguration
{
    public string BaseUrl { get; set; }
}
