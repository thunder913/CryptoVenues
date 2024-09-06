using MongoDB.Bson.Serialization.Attributes;

namespace CryptoVenues.Domain.Entities;
public class Venue
{
    public Venue(
        string id,
        string name,
        string category,
        DateTime lastUpdated,
        string geolocationDegrees,
        decimal latitude,
        decimal longitude)
    {
        Id = id;
        Name = name;
        Category = category;
        LastUpdatedAt = lastUpdated;
        GeolocationDegrees = geolocationDegrees;
        Latitude = latitude;
        Longitude = longitude;
    }

    [BsonId]
    public string Id { get; set; }

    public string Name { get; set; }

    public decimal Latitude { get; set; }

    public decimal Longitude { get; set; }

    public string Category { get; set; }

    public string GeolocationDegrees { get; set; }

    public DateTime LastUpdatedAt { get; set; }
}