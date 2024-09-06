using CryptoVenues.Domain.Entities;

namespace CryptoVenues.Domain.Services.Interfaces;

public interface IUserService
{
    Task<User> GetByUsernameAsync(string username);
    Task CreateAsync(User user);
}
