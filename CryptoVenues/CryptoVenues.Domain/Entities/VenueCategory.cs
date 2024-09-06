using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;
using MongoDB.Bson.Serialization.IdGenerators;

namespace CryptoVenues.Domain.Entities;

public class VenueCategory
{
    public VenueCategory(string name, DateTime lastUpdated)
    {
        Name = name;
        LastUpdatedAt = lastUpdated;
    }

    [BsonId(IdGenerator = typeof(ObjectIdGenerator))]
    public ObjectId Id { get; set; }

    public string Name { get; set; }

    public DateTime LastUpdatedAt { get; set; }
}

