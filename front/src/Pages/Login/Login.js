import "./Login.css";
import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/User/login', {
      mail: email,
      password: password,
      // confirmPassword: this.state.confirmPassword
    })
      .then(response => {
        console.log(response);
        console.log("connect");
        showAlert("success", "Connexion réussie !");
      })
      .catch(error => {
        console.log(error);
        showAlert("danger", "Erreur de connexion !");
      });
    console.log(password)
    console.log(email)
  }

  const showAlert = (type, message) => {
    setAlert({ type, message });

    // Supprime l'alerte après 3 secondes
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  return (
    <>
      <div className="p py-5">
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <h2>Se Connecter</h2>
          {alert && (
            <div className={`alert alert-${alert.type}`} role="alert">
              {alert.message}
            </div>
          )}
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Connexion</button> <br />
          <Link to="../SignUp" className="lead text-secondary ">S'inscrire</Link>
        </form>
      </div>
    </>
  );
};

export default Login;
