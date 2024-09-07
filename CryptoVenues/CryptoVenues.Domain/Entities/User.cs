using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace CryptoVenues.Domain.Entities;

public class User
{
    public User(string username, string email, string passwordHash, DateTime createdAt)
    {
        Username = username;
        Email = email;
        PasswordHash = passwordHash;
        CreatedAt = createdAt;
    }

    public User()
    {

    }

    [BsonId(IdGenerator = typeof(ObjectIdGenerator))]
    public ObjectId Id { get; set; }

    public string Username { get; set; }

    public string Email { get; set; }

    public string PasswordHash { get; set; }

    public DateTime CreatedAt { get; set; }
}