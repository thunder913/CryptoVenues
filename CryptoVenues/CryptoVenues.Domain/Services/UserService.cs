using CryptoVenues.Domain.Databases;
using CryptoVenues.Domain.Entities;
using CryptoVenues.Domain.Services.Interfaces;
using MongoDB.Driver;

namespace CryptoVenues.Domain.Services;

public class UserService : IUserService
{
    private readonly IMongoCollection<User> usersCollection;

    public UserService(MongoDbContext dbContext)
    {
        usersCollection = dbContext.Users;
    }

    public async Task CreateAsync(User user)
    {
        await usersCollection.InsertOneAsync(user);
    }

    public async Task<User> GetByUsernameAsync(string username)
    {
        return await usersCollection.Find(x => x.Username == username).FirstOrDefaultAsync();
    }
}
