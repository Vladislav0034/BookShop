import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from './components/pages/MainPage';
import FilterPage from './components/pages/FilterPage';
import Layout from './components/Layout';


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
      ]
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
