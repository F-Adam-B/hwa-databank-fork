import React, { useMemo } from 'react';
import { GridValidRowModel } from '@mui/x-data-grid';

import { DataGridMUI, MapBox, NavBar, SideBar } from '../../components';
import { useGetSamplesQuery } from '../../features/samples/samplesApi';
import { GET_ALL_SAMPLES } from '../../graphql/queries/sampleQueries';
import { useQuery } from '@apollo/client';
const HomePage = () => {
  // const { data, isFetching, isLoading } = useGetSamplesQuery();
  const { loading, data } = useQuery(GET_ALL_SAMPLES);

  // if (loading) return <div>Loading...</div>;

  const columns = [
    { field: 'sampleNumber', headerName: 'Sample Number', width: 150 },
    { field: 'matrix', headerName: 'Matrix', width: 150 },
    { field: 'stationName', headerName: 'Station Name', width: 150 },
    { field: 'createdAt', headerName: 'Sample Date', width: 150 },
    { field: 'coordinates', headerName: 'Coordinates', width: 150 },
    { field: 'analytes', headerName: 'Analytes', width: 150 },
  ];

  return <div className="homePageContainer">HomePage!!</div>;
};
export default HomePage;
