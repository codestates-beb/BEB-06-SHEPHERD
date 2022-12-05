// Components
import BaseLayout from 'components/base/BaseLayout';
import Axios from 'axios';
import { CurrentUserContext, TokenContext } from 'Contexts';

// Modules
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

/*
  Outlet 컴포넌트는 index.js에서 지정한 children 페이지를 불러와
  해당 위치에 배치합니다.
*/

function App () {
  const [currentUser, setCurrentUser] = useState();
  const [shouldReload, setReload] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    // 토큰이 있을 경우 자동으로 유저 정보를 불러와 로그인 상태를 유지함
    Axios.get(`${process.env.REACT_APP_API_URL}/user/refreshByToken`, { withCredentials: true })
      .then((response) => {
        const userInfo = response.data;
        setCurrentUser(userInfo);
      })
      .catch((error) => {
        console.error(error);
        setCurrentUser(null);
      });
  }, [cookies]);

  return (
    <CurrentUserContext.Provider value={{
      currentUser,
      setCurrentUser,
      shouldReload,
      setReload
    }}
    >
      <TokenContext.Provider value={{
        cookies,
        setCookie,
        removeCookie
      }}
      >
        <BaseLayout>
          <Outlet />
        </BaseLayout>
      </TokenContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
