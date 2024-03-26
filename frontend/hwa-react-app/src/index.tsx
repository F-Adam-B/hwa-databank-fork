import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { themeOptions } from './Providers/Theme';

import router from './routes';
import { MapProvider } from 'react-map-gl';
import { NavBar } from './components';
import client from './graphql/apollo-client';
import { DropdownOptionsProvider } from './Providers/DropdownSelectProvider';
import UsersProvider from './Providers/UsersContext';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <UsersProvider>
          <DropdownOptionsProvider>
            <MapProvider>
              {/* <ThemeProvider theme={themeOptions}> */}
              {/* <App /> */}
              <RouterProvider router={router} />
            </MapProvider>
          </DropdownOptionsProvider>
        </UsersProvider>
      </Provider>
    </ApolloProvider>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
