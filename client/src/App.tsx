import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from './components/pages/MainPage';
import FilterPage from './components/pages/FilterPage';
import Layout from './components/Layout';
import SignInPage from './components/pages/SignInPage';
import SignUpPage from './components/pages/SignUpPage';


function App(): JSX.Element {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          path: '/',
          element: <MainPage/>,
        },
        {
          path: '/filter',
          element: <FilterPage/>,
        },
        {
          path: '/signin',
          element: <SignInPage />,
        },
        {
          path: 'signup',
          element: <SignUpPage />,
        },
      ]
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
