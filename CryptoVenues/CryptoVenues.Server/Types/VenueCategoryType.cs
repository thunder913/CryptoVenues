using CryptoVenues.Domain.Entities;

namespace CryptoVenues.Server.Types;

public class VenueCategoryType : ObjectType<VenueCategory>
{
    protected override void Configure(IObjectTypeDescriptor<VenueCategory> descriptor)
    {
        descriptor.Field(t => t.Id).Ignore();
        descriptor.Field(t => t.Name).Type<StringType>();
        descriptor.Field(t => t.LastUpdatedAt).Ignore();
    }
}
