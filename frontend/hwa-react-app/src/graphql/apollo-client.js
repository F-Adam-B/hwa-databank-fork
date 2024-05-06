import { ApolloClient, InMemoryCache } from '@apollo/client';

import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
const uploadLink = createUploadLink({ uri: 'http://localhost:8000/graphql' });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: uploadLink,
});

export default client;
