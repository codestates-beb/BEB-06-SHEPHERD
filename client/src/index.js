// index.js에서 Router를 관리합니다.
// 기본적인 골자는 react-router 튜토리얼을 참고했습니다.
// https://reactrouter.com/en/main/start/tutorial

// Modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

// Pages
import About from 'pages/About';
import Dashboard from 'pages/Dashboard';
import Error from 'pages/Error';
import Main from 'pages/Main';
import Transaction from 'pages/Transaction';
import App from './App';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: 'about/',
        element: <About />
      },
      {
        path: 'dashboard/',
        element: <Dashboard />
      },
      {
        path: 'transaction/',
        element: <Transaction />
      },
      {
        path: '/',
        element: <Main />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
