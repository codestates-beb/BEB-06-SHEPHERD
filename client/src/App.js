// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import BaseContainer from 'components/BaseContainer';

// Modules
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';

/*
  기본적인 페이지 레이아웃을 App에서 구성합니다.
  Outlet 컴포넌트는 index.js에서 지정한 children 페이지를 불러와
  해당 위치에 배치합니다.
*/

const fullScreenHeightStyle = {
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignContent: 'stretch',
  alignItems: 'stretch'
};

function App () {
  return (
    <Grid container className='App' sx={fullScreenHeightStyle}>
      <Grid component='header' item columns={12} sx={{ flexShrink: 1 }}>
        <Header />
      </Grid>
      <Grid item columns={12} sx={{ flexGrow: 1 }}>
        <BaseContainer>
          <Outlet />
        </BaseContainer>
      </Grid>
      <Grid component='footer' item columns={12} sx={{ flexShrink: 1 }}>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default App;
