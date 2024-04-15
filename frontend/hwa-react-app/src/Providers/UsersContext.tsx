import { createContext, useContext } from 'react';
import { User, TChildrenProps } from '../graphql/types';
import { useQuery } from '@apollo/client';
import { GET_USERS_QUERY } from '../graphql/queries/userQueries';

export const UsersContext = createContext<User[]>([]);

const UsersProvider = ({ children }: TChildrenProps) => {
  const { data, loading, error } = useQuery(GET_USERS_QUERY);
  if (error) {
    return <div>Error fetching users! {error.message}</div>;
  }

  if (!data?.users) {
    return null;
  }

  return (
    <UsersContext.Provider value={data.users}>{children}</UsersContext.Provider>
  );
};

export default UsersProvider;
