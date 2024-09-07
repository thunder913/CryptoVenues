using CryptoVenues.Domain.Entities;

namespace CryptoVenues.Domain.Services.Interfaces;

public interface ICoinmapService
{
    public Task<Venue> GetVenueByIdAsync(string id);
    public Task<List<Venue>> GetAllVenuesAsync();
    public Task<List<Venue>> GetVenuesByCategoryAsync(string category, int limit, int offset);
}
