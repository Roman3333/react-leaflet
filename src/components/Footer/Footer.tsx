import { FC } from 'react';
import styles from './footer.module.scss';

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerCopy}>Copyright by Roman</div>
      </div>
    </footer>
  );
};
