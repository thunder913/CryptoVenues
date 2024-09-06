using CryptoVenues.Domain.Entities;
using CryptoVenues.Domain.Services.Interfaces;

namespace CryptoVenues.Domain.Services;

// TODO figure out the implementation
public class VenueCategoryService : IVenueCategoryService
{
    public Task<IEnumerable<VenueCategory>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<VenueCategory> GetByNameAsync(string name)
    {
        throw new NotImplementedException();
    }
}
