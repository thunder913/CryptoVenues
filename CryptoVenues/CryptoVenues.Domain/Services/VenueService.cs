using CryptoVenues.Domain.Databases;
using CryptoVenues.Domain.Entities;
using CryptoVenues.Domain.Services.Interfaces;
using MongoDB.Driver;

namespace CryptoVenues.Domain.Services;

// TODO figure out those methods
public class VenueService : IVenueService
{
    private readonly IMongoCollection<Venue> venuesCollection;

    public VenueService(MongoDbContext dbContext)
    {
        venuesCollection = dbContext.Venues;
    }
    public Task<Venue> GetVenueByIdAsync(string id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Venue>> GetVenuesByCategoryAsync(string category, string limit, string offset)
    {
        throw new NotImplementedException();
    }
}
