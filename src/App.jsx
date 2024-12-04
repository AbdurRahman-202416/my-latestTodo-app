import { createContext, useState, } from 'react'
import HomePage from './Pages/HomePage'
import Todo from './Pages/Todo';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import apiRequest from './Axios';
export const loaderContext = createContext();
function App() {
  const [loader, setLoader] = useState(false);
  const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/todo/:id', element: <Todo /> },
    { path: '*', element: <h1>404 No page found</h1> },
  ]);

  apiRequest.interceptors.request.use((req) => {
    setLoader(true)
    return req;
  })

  apiRequest.interceptors.response.use(
    (res) => {
      setLoader(false);
      return res;
    },
    (error) => {
      setLoader(false);
      return Promise.reject(error);
    }
  );
  return (
    <>
      <div className="relative">
        {loader && (
          <div className="fixed inset-0 flex items-center justify-center  z-50">
            <img className="w-12 h-12 sm:w-20 sm:h-20 animate-spin" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon" />
          </div>
        )}
      </div>
      <loaderContext.Provider value={{ loader, setLoader }}>
        <RouterProvider router={router} />
        <ToastContainer />
      </loaderContext.Provider >
    </>
  );
}

export default App;