// Components
import Footer from 'components/Footer';
import Header from 'components/Header';

// Modules
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

/*
  기본적인 페이지 레이아웃을 Layout에서 구성합니다.
  prop으로 상속받은 children을 BaseContainer 안에 넣습니다.
*/

const fullScreenHeightStyle = {
  minHeight: '100vh',
  flexWrap: 'nowrap'
};

function BaseLayout (props) {
  return (

    <Stack
      direction='column'
      justifyContent='space-between'
      alignItems='stretch'
      alignContent='stretch'
      spacing={0}
      sx={fullScreenHeightStyle}
    >
      <Header sx={{ flexShrink: 1 }} />
      <Container sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'stretch',
        alignItems: 'stretch'
      }}
      >
        {props.children}
      </Container>
      <Footer sx={{ flexShrink: 1 }} />
    </Stack>
  );
}

export default BaseLayout;
