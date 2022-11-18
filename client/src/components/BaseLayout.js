// Components
import Footer from 'components/Footer';
import Header from 'components/Header';
import BaseContainer from 'components/BaseContainer';

// Modules
import Grid from '@mui/material/Grid';

/*
  기본적인 페이지 레이아웃을 Layout에서 구성합니다.
  prop으로 상속받은 children을 BaseContainer 안에 넣습니다.
*/

const fullScreenHeightStyle = {
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignContent: 'stretch',
  alignItems: 'stretch'
};

function BaseLayout (props) {
  return (
    <Grid container className='App' sx={fullScreenHeightStyle}>
      <Grid component='header' item columns={12} sx={{ flexShrink: 1 }}>
        <Header />
      </Grid>
      <Grid item columns={12} sx={{ flexGrow: 1 }}>
        <BaseContainer>
          {props.children}
        </BaseContainer>
      </Grid>
      <Grid component='footer' item columns={12} sx={{ flexShrink: 1 }}>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default BaseLayout;
