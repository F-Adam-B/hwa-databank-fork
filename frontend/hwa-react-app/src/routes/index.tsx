import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import { ErrorPage, MapBox, NavBar } from '../components';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FormPage from './pages/FormPage';
import SearchForm from '../components/Forms/SearchForm';

const routes: RouteObject[] = [
  {
    index: true,
    element: (
      <>
        <NavBar />
        <HomePage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/sampleForm',
    element: (
      <>
        <NavBar />
        <FormPage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/map',
    element: (
      <>
        <NavBar />
        <MapBox />
        <SearchForm />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/about',
    element: (
      <>
        <NavBar />
        <AboutPage />
      </>
    ),
    errorElement: <ErrorPage />,
  },
];
const router = createBrowserRouter(routes);

export default router;
