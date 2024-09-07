using CryptoVenues.Domain.Entities;

namespace CryptoVenues.Domain.Responses.Coinmap;

public class VenueListResponse
{
    public List<Venue> Venues { get; set; } = new List<Venue>();
}
