using CryptoVenues.Domain.Entities;
using CryptoVenues.Domain.Payloads;
using CryptoVenues.Domain.Services.Interfaces;
using HotChocolate;

namespace CryptoVenues.Domain.Mutations;

public class AuthMutation
{
    private readonly IUserService _userService;
    private readonly IAuthService _authService;

    public AuthMutation(
        IUserService userService,
        IAuthService authService)
    {
        _userService = userService;
        _authService = authService;
    }

    public async Task<AuthPayload> SignInAsync(string username, string password)
    {
        var user = await _userService.GetByUsernameAsync(username);
        if (user == null)
        {
            throw new GraphQLException("User does not exist.");
        }

        if (!_authService.VerifyPassword(password, user.PasswordHash))
        {
            throw new GraphQLException("Authentication failed. Incorrect password.");
        }

        return GenerateTokenByUsername(username);
    }

    public async Task<AuthPayload> SignUpAsync(string username, string password)
    {

        var user = await _userService.GetByUsernameAsync(username);
        if (user != null)
        {
            throw new GraphQLException("User already exists.");
        }

        user = new User();
        user.Username = username;
        user.PasswordHash = _authService.HashPassword(password);

        try
        {
            await _userService.CreateAsync(user);
        }
        catch (Exception ex)
        {
            throw new GraphQLException("User creation failed.", ex);
        }

        return GenerateTokenByUsername(username);
    }

    private AuthPayload GenerateTokenByUsername(string username)
    {
        var token = _authService.GenerateJwtToken(username);
        var tokenExpiry = DateTime.UtcNow.AddHours(1);

        return new AuthPayload(username, token, tokenExpiry.Ticks.ToString());
    }
}
