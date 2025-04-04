import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

const uri = 'http://localhost:4000/graphql'; // GraphQL endpoint

export function createApollo(): ApolloClientOptions<any> {
  const http = new HttpLink({ uri });

  const auth = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  const link = ApolloLink.from([auth, http]);

  return {
    link,
    cache: new InMemoryCache(),
  };
}

export const APOLLO_PROVIDERS = [
  {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
  },
];
