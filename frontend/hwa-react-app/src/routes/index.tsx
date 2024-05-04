import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { NewsFeed, ErrorPage, NavBar, SampleForm } from '../components';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FormPage from './pages/FormPage';
import SearchForm from '../components/Forms/SearchForm';
import NewsFeedForm from '../components/Forms/NewsFeedForm';

const withNavBar = (Component: React.ReactNode) => (
  <>
    <NavBar />
    {Component}
  </>
);

const defaultErrorElement = <ErrorPage />;

const routes: RouteObject[] = [
  {
    index: true,
    element: withNavBar(<HomePage />),
    errorElement: defaultErrorElement,
  },
  {
    path: '/newsfeed',
    element: withNavBar(<NewsFeed />),
    errorElement: defaultErrorElement,
  },
  {
    path: '/newsfeedform',
    element: withNavBar(<NewsFeedForm />),
    errorElement: defaultErrorElement,
  },
  {
    path: '/sampleForm',
    element: withNavBar(<SampleForm />),
    errorElement: defaultErrorElement,
  },
  {
    path: '/map',
    element: withNavBar(<SearchForm />),
    errorElement: defaultErrorElement,
  },
  {
    path: '/about',
    element: withNavBar(<AboutPage />),
    errorElement: defaultErrorElement,
  },
];

const router = createBrowserRouter(routes);

export default router;
