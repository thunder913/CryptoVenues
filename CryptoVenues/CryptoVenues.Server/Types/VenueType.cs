using CryptoVenues.Domain.Entities;

namespace CryptoVenues.Server.Types;

public class VenueType : ObjectType<Venue>
{
    protected override void Configure(IObjectTypeDescriptor<Venue> descriptor)
    {
        descriptor.Field(t => t.Id).Type<StringType>();
        descriptor.Field(t => t.Name).Type<StringType>();
        descriptor.Field(t => t.Longitude).Type<DecimalType>();
        descriptor.Field(t => t.Latitude).Type<DecimalType>();
        descriptor.Field(t => t.Category).Type<StringType>();
        descriptor.Field(t => t.LastUpdatedAt).Ignore();
        descriptor.Field(t => t.GeolocationDegrees).Type<StringType>();
    }
}