// Components
import BaseLayout from 'components/base/BaseLayout';
import { CurrentUserContext } from 'Contexts';

// Modules
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Custom Modules
import * as schema from 'features/schema';

/*
  Outlet 컴포넌트는 index.js에서 지정한 children 페이지를 불러와
  해당 위치에 배치합니다.
*/

function App () {
  const [currentUser, setCurrentUser] = useState({
    id: '',
    password: ''
  });

  useEffect(() => {
    schema.user.validate(currentUser);
    console.log(currentUser);
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={{
      currentUser,
      setCurrentUser
    }}
    >
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    </CurrentUserContext.Provider>
  );
}

export default App;
