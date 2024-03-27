import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import { NewsFeed, ErrorPage, MapBox, NavBar, SampleForm } from '../components';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FormPage from './pages/FormPage';
import SearchForm from '../components/Forms/SearchForm';
import NewsFeedForm from '../components/Forms/NewsFeedForm';

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
    path: '/newsfeed',
    element: (
      <>
        <NavBar />
        <NewsFeed />
      </>
    ),
  },
  {
    path: '/newsfeedform',
    element: (
      <>
        <NavBar />
        <NewsFeedForm />
      </>
    ),
  },
  {
    path: '/sampleForm',
    element: (
      <>
        <NavBar />
        <SampleForm />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/map',
    element: (
      <>
        <NavBar />
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
