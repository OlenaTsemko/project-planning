import Spinner from 'components/Loader/Loader';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authOperations from 'redux/auth/auth-operations';

import { getLoadingUser } from 'redux/auth/auth-selectors';

import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(getLoadingUser);

  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'email':
        setEmail(value);
        break;

      case 'password':
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const user = { email, password };
    dispatch(authOperations.login(user));
    reset();
  };

  const reset = () => {
    setPassword('');
  };

  return (
    <div className={styles.backgroundMain}>
      <div className={styles.registration}>
        <div className={`${styles.general} ${styles.ellipse1}`}></div>
        <div className={`${styles.general} ${styles.ellipse2}`}></div>
        <div className={`${styles.general} ${styles.ellipse3}`}></div>
        <div className={`${styles.general} ${styles.ellipse4}`}></div>
        <div className={`${styles.general} ${styles.ellipse5}`}></div>
        <div className={`${styles.general} ${styles.ellipse6}`}></div>
        <div className={`${styles.general} ${styles.ellipse7}`}></div>
        <div className={`${styles.general} ${styles.ellipse8}`}></div>
        <div className={`${styles.general} ${styles.ellipse9}`}></div>
        <div className={`${styles.general} ${styles.ellipse10}`}></div>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className={styles.form}
        autoComplete="off"
      >
        <h1 className={styles.title}>Enter</h1>
        <label className={styles.labelForm}>
          <input
            className={styles.inputForm}
            placeholder=" "
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
          />
          <span className={styles.nameInput}>E-mail</span>
        </label>

        <label className={styles.labelForm}>
          <input
            className={styles.inputForm}
            placeholder=" "
            type="password"
            name="password"
            onChange={handleChange}
            values={password}
          />
          <span className={styles.nameInput}>Password</span>
        </label>

        <button className={styles.btnLog} type="submit">
          Enter
        </button>

        {loading && <Spinner />}

        <div className={styles.login}>
          <p className={styles.question}> No account? </p>
          <a className={styles.auth} href="/register">
            Register
          </a>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
