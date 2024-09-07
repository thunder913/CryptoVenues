import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: "http://localhost:5227/" + 'graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const apolloClient = new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
});

export default apolloClient;