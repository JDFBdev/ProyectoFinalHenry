import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';



const httpLink = new HttpLink({ uri: 'http://localhost:4000' });




const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});



const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


export default client;