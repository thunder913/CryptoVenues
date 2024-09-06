using CryptoVenues.Domain.Entities;

namespace CryptoVenues.Domain.Services.Interfaces;

public interface IVenueService
{
    Task<IEnumerable<Venue>> GetVenuesByCategoryAsync(string category, string limit, string offset);
    Task<Venue> GetVenueByIdAsync(string id);
}
