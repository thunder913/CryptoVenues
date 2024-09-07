using CryptoVenues.Domain.Configurations.Interfaces;
using CryptoVenues.Domain.Entities;
using CryptoVenues.Domain.Responses.Coinmap;
using CryptoVenues.Domain.Services.Interfaces;
using Microsoft.AspNetCore.WebUtilities;
using System.Text.Json;

namespace CryptoVenues.Domain.Services;

public class CoinMapService : ICoinmapService
{
    private const string CategoryQueryParam = "category";
    private const string LimitQueryParam = "limit";
    private const string OffsetQueryParam = "offset";

    private readonly HttpClient _httpClient;
    private readonly ICoinmapConfiguration _coinmapConfiguration;

    public CoinMapService(
        HttpClient httpClient,
        ICoinmapConfiguration coinmapConfiguration)
    {
        _httpClient = httpClient;
        this._coinmapConfiguration = coinmapConfiguration;
    }

    public async Task<List<Venue>> GetAllVenuesAsync()
    {
        try
        {
            var response = await _httpClient.GetAsync(_coinmapConfiguration.BaseUrl);
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<VenueListResponse>(content);

            return result?.Venues ?? null;
        }
        catch (HttpRequestException e)
        {
            return null;
        }
    }

    public async Task<Venue> GetVenueByIdAsync(int id)
    {
        try
        {
            var response = await _httpClient.GetAsync($"{_coinmapConfiguration.BaseUrl}{id}");
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<VenueResponse>(content);

            return result?.Venue ?? null;
        }
        catch (HttpRequestException e)
        {
            return null;
        }
    }

    public async Task<List<Venue>> GetVenuesByCategoryAsync(
        string category,
        int limit,
        int offset)
    {
        try
        {
            var queryParams = new Dictionary<string, string>
            {
                [CategoryQueryParam] = category,
                [LimitQueryParam] = limit.ToString(),
                [OffsetQueryParam] = offset.ToString()
            };

            var uri = QueryHelpers.AddQueryString(_coinmapConfiguration.BaseUrl, queryParams);

            var response = await _httpClient.GetAsync(uri);

            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<VenueListResponse>(content);

            return result?.Venues ?? null;
        }
        catch (HttpRequestException e)
        {
            return null;
        }
    }
}
