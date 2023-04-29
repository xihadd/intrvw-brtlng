import { ApolloClient } from '@apollo/client';
import createApolloClient from './client';

describe('createApolloClient', () => {
  it('should return a new Apollo Client instance', () => {
    const client: ApolloClient<any> = createApolloClient('https://demo.saleor.io/graphql');

    expect(client).toBeDefined();
    expect(client).toBeInstanceOf(ApolloClient);
  });
  // it('should create an HttpLink with the correct URI', () => {
  //   createApolloClient(uri);
  //   expect(HttpLink).toHaveBeenCalledWith({
  //     uri,
  //   });
  // });
});
