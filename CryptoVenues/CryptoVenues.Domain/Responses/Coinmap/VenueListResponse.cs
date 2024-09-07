using CryptoVenues.Domain.Entities;
using System.Text.Json.Serialization;

namespace CryptoVenues.Domain.Responses.Coinmap;

public class VenueListResponse
{
    [JsonPropertyName("venues")]
    public List<Venue> Venues { get; set; } = new List<Venue>();
}
