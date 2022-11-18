// Components
import BaseLayout from 'components/BaseLayout';

// Modules
import { Outlet } from 'react-router-dom';

/*
  Outlet 컴포넌트는 index.js에서 지정한 children 페이지를 불러와
  해당 위치에 배치합니다.
*/

function App () {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
}

export default App;
