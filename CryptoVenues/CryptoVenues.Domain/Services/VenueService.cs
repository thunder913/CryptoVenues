using CryptoVenues.Domain.Databases;
using CryptoVenues.Domain.Entities;
using CryptoVenues.Domain.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using MongoDB.Driver;

namespace CryptoVenues.Domain.Services;

public class VenueService : IVenueService
{

    private readonly IMemoryCache _memoryCache;
    private readonly IMongoCollection<Venue> _venuesCollection;
    private readonly ICoinmapService _coinmapService;
    private readonly TimeSpan _cacheDuration = TimeSpan.FromHours(1);

    public VenueService(
        MongoDbContext dbContext,
        ICoinmapService coinmapService,
        IMemoryCache memoryCache)
    {
        _venuesCollection = dbContext.Venues;
        _coinmapService = coinmapService;
        _memoryCache = memoryCache;
    }
    public async Task<Venue> GetVenueByIdAsync(int id)
    {
        var venue = await _venuesCollection
            .Find(x => x.Id == id)
            .FirstOrDefaultAsync();

        if (venue is not null
                && venue.LastUpdatedAt.Add(_cacheDuration) > DateTime.UtcNow)
            return venue;
        
        var externalVenue = await _coinmapService.GetVenueByIdAsync(id);

        if (externalVenue == null)
            return null;

        externalVenue.LastUpdatedAt  = DateTime.UtcNow;

        if (venue is not null)
        {
            await _venuesCollection.ReplaceOneAsync(x => x.Id == venue.Id, venue);
        }
        else
        {
            await _venuesCollection.InsertOneAsync(venue);
        }

        return externalVenue;
    }

    public async Task<IEnumerable<Venue>> GetVenuesByCategoryAsync(string category, int limit, int offset)
    {
        var cacheKey = $"{nameof(GetVenuesByCategoryAsync)}-{category}-{limit}-{offset}";

        if (_memoryCache.TryGetValue(cacheKey, out List<Venue> cachedVenues))
            return cachedVenues;

        var externalVenues = await _coinmapService.GetVenuesByCategoryAsync(category, limit, offset);

        var requestTime = DateTime.UtcNow;

        foreach (var venue in externalVenues)
        {
            venue.LastUpdatedAt = requestTime;

            var venueCache = await _venuesCollection.Find(v => v.Id == venue.Id).FirstOrDefaultAsync();
            if (venueCache != null)
            {
                await _venuesCollection.ReplaceOneAsync(v => v.Id == venue.Id, venue);
            }
            else
            {
                await _venuesCollection.InsertOneAsync(venue);
            }
        }

        _memoryCache.Set(cacheKey, externalVenues.ToList(), _cacheDuration);

        return externalVenues;
    }
}
