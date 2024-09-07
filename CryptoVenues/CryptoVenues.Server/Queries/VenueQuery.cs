using CryptoVenues.Domain.Entities;
using CryptoVenues.Domain.Services.Interfaces;
using HotChocolate.Authorization;

namespace CryptoVenues.Server.Queries;

[ExtendObjectType("Query")]
[Authorize]
public class VenueQuery
{
    private readonly IVenueService _venueService;

    public VenueQuery(IVenueService venueService)
    {
        _venueService = venueService;
    }

    public async Task<IEnumerable<Venue>> GetVenuesByCategoryAsync(string category, int limit, int offset)
    {
        return await _venueService.GetVenuesByCategoryAsync(category, limit, offset);
    }

    public async Task<Venue> GetVenue(int id)
    {
        return await _venueService.GetVenueByIdAsync(id);
    }
}