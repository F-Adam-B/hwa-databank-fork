import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { themeOptions } from './Providers/Theme';

import router from './routes';
import { MapProvider } from 'react-map-gl';
import { NavBar } from './components';
import client from './apollo/apollo-client';
import { DropdownOptionsProvider } from './Providers/DropdownSelectProvider';
import UsersProvider from './Providers/UsersContext';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UsersProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DropdownOptionsProvider>
            <MapProvider>
              {/* <ThemeProvider theme={themeOptions}> */}
              {/* <App /> */}
              <RouterProvider router={router} />
            </MapProvider>
          </DropdownOptionsProvider>
        </LocalizationProvider>
      </UsersProvider>
    </ApolloProvider>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
