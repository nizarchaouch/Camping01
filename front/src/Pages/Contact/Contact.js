import "./Contact.css";
import React from 'react';
import emailjs from 'emailjs-com';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: '',
      prenom: '',
      email: '',
      message: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { nom, prenom, email, message } = this.state;

    // Configurez votre service d'envoi d'e-mail ici
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      nom: nom,
      prenom: prenom,
      email: email,
      message: message
    }, 'YOUR_USER_ID')
      .then((response) => {
        console.log('Email envoyé avec succès!', response.status, response.text);
        // Réinitialisez le formulaire après l'envoi
        this.setState({
          nom: '',
          prenom: '',
          email: '',
          message: ''
        });
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
      });
  }

  render() {
    const { nom, prenom, email, message } = this.state;

    return (
      <div className="container my-5">
        <div className="contact-box">
          <div className="left"></div>
          <div className="right">
            <h2>Nous Contacter</h2>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="nom" className="field" value={nom} onChange={this.handleChange} placeholder="Nom" />
              <input type="text" name="prenom" className="field" value={prenom} onChange={this.handleChange} placeholder="Prénom" />
              <input type="email" name="email" className="field" value={email} onChange={this.handleChange} placeholder="E-mail" />
              <textarea name="message" placeholder="Message" className="field" value={message} onChange={this.handleChange}></textarea>
              <button type="submit" className="btn">Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
