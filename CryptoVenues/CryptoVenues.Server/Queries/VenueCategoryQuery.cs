using CryptoVenues.Domain.Entities;
using CryptoVenues.Domain.Services.Interfaces;
using HotChocolate.Authorization;

namespace CryptoVenues.Server.Queries;

[ExtendObjectType("Query")]
[Authorize]
public class VenueCategoryQuery
{
    public async Task<IEnumerable<VenueCategory>> GetAllVenueCategoriesAsync(
    [Service] IVenueCategoryService venueCategoryService)
    {
        return await venueCategoryService.GetAllAsync();
    }

    public async Task<VenueCategory> GetVenueCategoryAsync(string name,
        [Service] IVenueCategoryService venueCategoryService)
    {
        return await venueCategoryService.GetByNameAsync(name);
    }
}
