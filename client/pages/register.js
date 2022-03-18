import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import styles from "../styles/Auth.module.css";
import Link from "next/link";

function Register() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/register", user)
      .then((resp) => {
        if (resp.status === 200) {
          setMessage(resp.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data);
        }
      });
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
        <title>Register</title>
      </Head>
      <div className={styles.authFormContainer}>
        <h1 className={styles.title}>Register</h1>
        <form onSubmit={handleRegister} className={styles.form}>
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
          <button className={styles.btn}>Register</button>
          <p className={styles.message}>{message.length > 0 && message}</p>
          <p className={styles.footerMsg}>
            Already have an accout?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
