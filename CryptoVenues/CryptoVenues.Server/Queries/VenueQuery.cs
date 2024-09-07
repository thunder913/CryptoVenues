using CryptoVenues.Domain.Entities;
using CryptoVenues.Domain.Services.Interfaces;
using HotChocolate.Authorization;

namespace CryptoVenues.Server.Queries;

[ExtendObjectType("Query")]
[Authorize]
public class VenueQuery
{
    public async Task<IEnumerable<Venue>> GetVenuesByCategoryAsync(
        string category,
        int limit,
        int offset,
        [Service] IVenueService venueService)
    {
        return await venueService.GetVenuesByCategoryAsync(category, limit, offset);
    }

    public async Task<Venue> GetVenue(
        int id,
        [Service] IVenueService venueService)
    {
        return await venueService.GetVenueByIdAsync(id);
    }
}