import { createContext, useState, } from 'react'
import HomePage from './Pages/HomePage'
import Todo from './Pages/Todo';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import apiRequest from './Axios';

function App() {
  const [loader, setLoader] = useState(false);
  const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/todo/:id', element: <Todo /> },
    { path: '*', element: <h1>404 No page found</h1> },
  ]);

  const loaderContext = createContext();


  apiRequest.interceptors.request.use((req) => {

    return req;
  })
  apiRequest.interceptors.response.use((res) => {

    return res;
  })

  return (
    <>
      <loaderContext.Provider value={{ loader, setLoader }}>
        <RouterProvider router={router} />
        <ToastContainer />
      </loaderContext.Provider >
    </>
  );
}

export default App;