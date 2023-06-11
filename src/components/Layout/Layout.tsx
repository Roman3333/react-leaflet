import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../index';

interface LayoutProps {
  setIsAuth: (value: boolean) => void;
}

export const Layout: FC<LayoutProps> = ({ setIsAuth }) => {
  return (
    <>
      <Header setIsAuth={setIsAuth} />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
