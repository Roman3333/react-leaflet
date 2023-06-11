import { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import { Layout } from './components/Layout/Layout';
const Home = lazy(() => import('./pages/Home/Home'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(localStorage.getItem('isAuth') === 'true');

  return (
    <div className="wrapper">
      {isAuth ? (
        <>
          <Routes>
            <Route path="/" element={<Layout setIsAuth={(value) => setIsAuth(value)} />}>
              <Route
                index
                element={
                  <Suspense fallback={<div>Загрузка...</div>}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<div>Загрузка...</div>}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </>
      ) : (
        <Login setIsAuth={(value) => setIsAuth(value)} />
      )}
    </div>
  );
}

export default App;
