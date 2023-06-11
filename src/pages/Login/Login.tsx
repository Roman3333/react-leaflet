import { useState, FC, FormEvent, ChangeEvent } from 'react';
import styles from './login.module.scss';

interface LoginProps {
  setIsAuth: (value: boolean) => void;
}

const Login: FC<LoginProps> = ({ setIsAuth }) => {
  const [fields, setFields] = useState({
    user: '',
    password: '',
  });

  const checkFields = (e: FormEvent) => {
    e.preventDefault();

    if (fields.user === 'test' && fields.password === 'test') {
      setIsAuth(true);
      localStorage.setItem('isAuth', 'true');
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <section className={styles.login}>
      <div className="container">
        <form className={styles.loginForm} onSubmit={checkFields}>
          <input
            className={styles.loginInput}
            value={fields.user}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, user: e.target.value })
            }
            type="text"
            placeholder="Name"
          />
          <input
            className={styles.loginInput}
            value={fields.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, password: e.target.value })
            }
            type="text"
            placeholder="Password"
          />
          <button className={styles.loginBtn}>SIGN IN</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
