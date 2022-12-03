// index.js에서 Router를 관리합니다.
// 기본적인 골자는 react-router 튜토리얼을 참고했습니다.
// https://reactrouter.com/en/main/start/tutorial

// 또한 MUI를 위한 Theme 관리도 이곳에서 합니다.
// https://mui.com/material-ui/customization/theming/

// Modules
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  ThemeProvider
} from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

// Pages
import Dashboard from 'pages/Dashboard';
import Error from 'pages/Error';
import Main from 'pages/Main';
import App from 'App';

// components
import Login from 'components/Login';

// Router 라우터
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<Error />}>
      <Route path='dashboard/' element={<Dashboard />} />
      <Route path='/' element={<Main />} />
      <Route path='login/' element={<Login />} />
    </Route>
  )
);

// 배경 및 Primary, Secondary 등등 다양한 색상을 지정하고
// 웹페이지 전체에 Context 형태로 정해줄 수 있는 설정
const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: '2em',
          backgroundColor: theme.palette.primary.light
        })
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.grey[100]
        })
      }
    }
  },
  palette: {
    background: ({ theme }) => ({
      default: theme.palette.grey[300]
    })
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
