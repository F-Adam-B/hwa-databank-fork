import { createContext, useContext } from 'react';
import { User, TChildrenProps } from '../types';
import { useQuery } from '@apollo/client';
import { GET_USERS_QUERY } from '../apollo/queries/userQueries';

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
