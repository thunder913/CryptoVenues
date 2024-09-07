using CryptoVenues.Domain.Entities;
using CryptoVenues.Domain.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using MongoDB.Driver;

namespace CryptoVenues.Domain.Services;

// TODO figure out the implementation
public class VenueCategoryService : IVenueCategoryService
{
    private readonly IMemoryCache _memoryCache;
    private readonly IMongoCollection<VenueCategory> _venueCategoryCollection;
    private readonly ICoinmapService _coinmapService;
    private readonly TimeSpan _cacheDuration = TimeSpan.FromDays(1);
    private static string GetAllAsyncCacheKey = $"{nameof(VenueCategory)}-{nameof(GetAllAsync)}";

    public VenueCategoryService(
        IMongoCollection<VenueCategory> venueCategoryCollection,
        ICoinmapService coinMapService,
        IMemoryCache memoryCache)
    {
        _venueCategoryCollection = venueCategoryCollection;
        _coinmapService = coinMapService;
        _memoryCache = memoryCache;
    }

    public async Task<IEnumerable<VenueCategory>> GetAllAsync()
    {
        // Performance is key for the loading page, so let's use memory cache for it (in case there aren't too many records of course)
        if (_memoryCache.TryGetValue(GetAllAsyncCacheKey, out List<VenueCategory> cachedCategories))
        {
            return cachedCategories;
        }

        var venues = await _coinmapService.GetAllVenuesAsync();
        var categories = venues
            .Select(v => v.Category)
            .Distinct()
            .ToList();
        var requestTime = DateTime.UtcNow;

        var venueCategories = new List<VenueCategory>();

        foreach (var category in categories)
        {
            var venueCategory = await _venueCategoryCollection
                .Find(vc => vc.Name == category)
                .FirstOrDefaultAsync();

            if (venueCategory != null)
            {
                venueCategory.LastUpdatedAt = requestTime;
                await _venueCategoryCollection.ReplaceOneAsync(
                    vc => vc.Id == venueCategory.Id,
                    venueCategory);
            }
            else
            {
                venueCategory = new VenueCategory(category, requestTime);
                await _venueCategoryCollection.InsertOneAsync(venueCategory);
            }
            venueCategories.Add(venueCategory);
        }

        _memoryCache.Set(GetAllAsyncCacheKey, venueCategories, _cacheDuration);

        return venueCategories;
    }

    public async Task<VenueCategory> GetByNameAsync(string name)
        => await _venueCategoryCollection
            .Find(vc => vc.Name == name)
            .FirstOrDefaultAsync();
}
