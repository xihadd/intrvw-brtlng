import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri:string = 'https://demo.saleor.io/graphql/'

export const apolloClient = (server: boolean = false, uri?: string | undefined) : ApolloClient<any> => {
    return new ApolloClient({
        uri,
        cache: new InMemoryCache(),
    })
}

export default apolloClient;