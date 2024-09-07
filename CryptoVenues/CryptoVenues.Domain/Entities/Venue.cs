using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace CryptoVenues.Domain.Entities;
public class Venue
{
    public Venue(
        int id,
        string name,
        string category,
        string geolocationDegrees,
        decimal latitude,
        decimal longitude)
    {
        Id = id;
        Name = name;
        Category = category;
        GeolocationDegrees = geolocationDegrees;
        Latitude = latitude;
        Longitude = longitude;
    }

    [BsonId]
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("lat")]
    public decimal Latitude { get; set; }

    [JsonPropertyName("lon")]
    public decimal Longitude { get; set; }

    [JsonPropertyName("category")]
    public string Category { get; set; }

    [JsonPropertyName("geolocation_degrees")]
    public string GeolocationDegrees { get; set; }

    [JsonIgnore]
    public DateTime LastUpdatedAt { get; set; }
}