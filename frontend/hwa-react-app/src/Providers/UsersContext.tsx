import { createContext, useContext } from 'react';
import { User, TChildrenProps } from '../graphql/types';
import { useQuery } from '@apollo/client';
import { GET_USERS_QUERY } from '../graphql/queries/userQueries';

export const UsersContext = createContext<User[]>([]);

const UsersProvider = ({ children }: TChildrenProps) => {
  const { data } = useQuery(GET_USERS_QUERY);

  return <UsersContext.Provider value={data}>{children}</UsersContext.Provider>;
};

export default UsersProvider;
