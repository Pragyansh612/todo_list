import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Nav from './comp/Nav';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
const router = createBrowserRouter([
  {
    path: "/",
    element: <><Nav /><Home /></>
  },
  {
    path: "/about",
    element: <><Nav /><About /></>
  },
  {
    path: "/contact",
    element: <><Nav /><Contact /></>
  }
]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
