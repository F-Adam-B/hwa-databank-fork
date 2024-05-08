import { ApolloProvider } from '@apollo/client';
import { RouterProvider } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import router from './routes';
import { MapProvider } from 'react-map-gl';
import client from './apollo/apollo-client';
import { DropdownOptionsProvider } from './Providers/DropdownSelectProvider';
import UsersProvider from './Providers/UsersContext';

function App() {
  if (client === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <ApolloProvider client={client}>
      <UsersProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DropdownOptionsProvider>
            <MapProvider>
              {/* <ThemeProvider theme={themeOptions}> */}
              <RouterProvider router={router} />
            </MapProvider>
          </DropdownOptionsProvider>
        </LocalizationProvider>
      </UsersProvider>
    </ApolloProvider>
  );
}

export default App;
