import { ApolloClient, InMemoryCache } from '@apollo/client';

import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
let client: ApolloClient<any> | undefined;

try {
  const uploadLink = createUploadLink({
    uri:
      process.env.REACT_APP_APOLLO_UPLOAD_LINK ||
      'http://localhost:8000/graphql',
  });

  client = new ApolloClient({
    cache: new InMemoryCache(),
    link: uploadLink,
  });
} catch (error) {
  console.error('Error creating Apollo Client:', error);
}

if (!client) {
  throw new Error('Apollo Client was not created successfully.');
}

export default client;
