import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import styles from "../styles/Auth.module.css";
import Link from "next/link";

function Login() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:3001/api/login", user);
      if (resp.status === 200) {
        setMessage("Welcome");
      }
    } catch (error) {
      setMessage("Wrong credentials");
    }
  };

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.authFormContainer}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@mail.com"
            onChange={handleInputChange}
            className={styles.input}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="*****"
            onChange={handleInputChange}
            className={styles.input}
          />
          <button className={styles.btn}>Login</button>
          <p className={styles.message}>{message.length > 0 && message}</p>
          <p className={styles.footerMsg}>
            <Link href="/register">
              <a>Create an accout</a>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
