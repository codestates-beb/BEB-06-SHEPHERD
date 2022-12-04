// Components
import BaseLayout from 'components/base/BaseLayout';
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
    console.log(currentUser);
    console.log(cookies);
  }, [currentUser, cookies]);

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
