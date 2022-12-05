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
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
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
      setCurrentUser
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
