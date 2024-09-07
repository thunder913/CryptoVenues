import { gql } from '@apollo/client';

export const GET_VENUE_CATEGORIES_QUERY = gql`
  query GetVenueCategories {
    allVenueCategories {
      name
    }
  }
`;

export const GET_CATEGORY_VENUES_QUERY = gql`
    query GetCategoryVenues($category: String!, $limit: Int!, $offset: Int!) {
        venuesByCategory(category: $category, limit: $limit, offset: $offset) {
            id
            name
            category
            longitude
            latitude
        }
    }
`;

export const GET_VENUE_QUERY = gql`
    query GetVenue($id: String!) {
        venue(id: $id) {
            id
            name
            category
            geolocationDegrees
        }
    }
`;