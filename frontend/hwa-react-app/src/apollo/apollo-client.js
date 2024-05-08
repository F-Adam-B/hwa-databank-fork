import { ApolloClient, InMemoryCache } from '@apollo/client';

import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
let client;

try {
  const uploadLink = createUploadLink({ uri: 'http://localhost:8000/graphql' });

  client = new ApolloClient({
    cache: new InMemoryCache(),
    link: uploadLink,
  });
} catch (error) {
  console.error('Error creating Apollo Client:', error);
}
export default client;
