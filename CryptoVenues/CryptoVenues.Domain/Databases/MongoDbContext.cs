using CryptoVenues.Domain.Entities;
using MongoDB.Driver;

namespace CryptoVenues.Domain.Databases;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<Venue> Venues => _database.GetCollection<Venue>("Venues");
    public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
    public IMongoCollection<VenueCategory> VenueCategories => _database.GetCollection<VenueCategory>("VenueCategories");
}
