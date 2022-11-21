// index.js에서 Router를 관리합니다.
// 기본적인 골자는 react-router 튜토리얼을 참고했습니다.
// https://reactrouter.com/en/main/start/tutorial

// 또한 MUI를 위한 Theme 관리도 이곳에서 합니다.
// https://mui.com/material-ui/customization/theming/

// Modules
import { red } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  ThemeProvider
} from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

// Pages
import Contact from 'pages/Contact';
import Dashboard from 'pages/Dashboard';
import Error from 'pages/Error';
import Main from 'pages/Main';
import Transaction from 'pages/Transaction';
import App from 'App'; //상대 경로로 되어있어서 절대경로로 변경

// components
import About from 'components/About';
import TransactionDetail from 'components/TransactionDetail';
import MakeTransfer from 'components/MakeTransfer';

// Router 라우터
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: 'contact/', //==
        element: <Contact />
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
      },
      {
        path: 'about/',
        element: <About />
      },
      {
        path: 'transactiondetail/',
        element: <TransactionDetail />
      },
      {
        path: 'maketransfer/',
        element: <MakeTransfer />
      }
    ]
  }
]);

// 배경 및 Primary, Secondary 등등 다양한 색상을 지정하고
// 웹페이지 전체에 Context 형태로 정해줄 수 있는 설정
const theme = createTheme({
  palette: {
    background: {
      default: red[0] //임시로 배경색 0으로 바꿈
    },
    primary: {
      main: '#0052cc'
    },
    secondary: {
      main: '#edf2ff'
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
