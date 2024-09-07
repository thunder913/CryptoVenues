using CryptoVenues.Domain.Databases;
using CryptoVenues.Domain.Entities;
using CryptoVenues.Domain.Services.Interfaces;
using MongoDB.Driver;

namespace CryptoVenues.Domain.Services;

public class UserService : IUserService
{
    private readonly IMongoCollection<User> _usersCollection;

    public UserService(MongoDbContext dbContext)
    {
        _usersCollection = dbContext.Users;
    }

    public async Task CreateAsync(User user)
    {
        await _usersCollection.InsertOneAsync(user);
    }

    public async Task<User> GetByUsernameAsync(string username)
        => await _usersCollection.Find(x => x.Username == username).FirstOrDefaultAsync();
}
