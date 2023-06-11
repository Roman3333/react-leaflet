import { FC } from 'react';
import styles from './header.module.scss';

interface HeaderProps {
  setIsAuth: (value: boolean) => void;
}

export const Header: FC<HeaderProps> = ({ setIsAuth }) => {
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('isAuth');
  };
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerInner}>
          <div className={styles.headerLogo}>
            <img src="./logo.svg" alt="logo" width={194} height={36} />
          </div>
          <button className={styles.headerBtn} onClick={logout}>
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
};
