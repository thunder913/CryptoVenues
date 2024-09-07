using CryptoVenues.Domain.Entities;

namespace CryptoVenues.Domain.Services.Interfaces;

public interface IVenueService
{
    Task<IEnumerable<Venue>> GetVenuesByCategoryAsync(string category, int limit, int offset);
    Task<Venue> GetVenueByIdAsync(string id);
}
