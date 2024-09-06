using CryptoVenues.Domain.Entities;

namespace CryptoVenues.Domain.Services.Interfaces;

public interface IVenueCategoryService
{
    Task<IEnumerable<VenueCategory>> GetAllAsync();
    Task<VenueCategory> GetByNameAsync(string name);
}
