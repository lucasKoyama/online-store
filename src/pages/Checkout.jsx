import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import Cart from '../components/Cart';
import Search from '../components/Search';
import './Home.css';
import './Checkout.css';

class Checkout extends React.Component {
  state = {
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    paymentMethod: '',
    inputsValidation: false,
    submitClicked: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  submitOrder = (hs) => {
    this.setState({ submitClicked: true }, () => {
      const { name, email, cpf, phone, cep, address, paymentMethod } = this.state;
      const valid = (input) => input.length > 0;
      const inputsValidation = valid(name) && valid(email) && valid(cpf) && valid(phone)
        && valid(cep) && valid(address) && valid(paymentMethod);
      this.setState({ inputsValidation }, () => {
        if (inputsValidation) {
          localStorage.setItem('cart', JSON.stringify([]));
          localStorage.setItem('cartSize', '0');
          hs.push('/');
        }
      });
    });
  };

  render() {
    const { history } = this.props;
    const {
      name,
      email,
      cpf,
      phone,
      cep,
      address,
      inputsValidation,
      submitClicked,
    } = this.state;
    return (
      <section className="checkout">
        <header className="header">
          <Search hiddenQuery />
        </header>
        <section className="info container">
          <div className="infos">
            <div className="person-info">
              <TextField
                label="Nome completo"
                inputProps={ { 'data-testid': 'checkout-fullname' } }
                type="text"
                name="name"
                id="name"
                value={ name }
                onChange={ this.handleChange }
              />
              <TextField
                label="CPF"
                inputProps={ { 'data-testid': 'checkout-cpf' } }
                type="text"
                name="cpf"
                id="cpf"
                value={ cpf }
                onChange={ this.handleChange }
              />
            </div>
            <div className="contact-info">
              <TextField
                label="Email"
                inputProps={ { 'data-testid': 'checkout-email' } }
                type="email"
                name="email"
                id="email"
                value={ email }
                onChange={ this.handleChange }
              />
              <TextField
                label="Telefone"
                inputProps={ { 'data-testid': 'checkout-phone' } }
                type="text"
                name="phone"
                id="phone"
                value={ phone }
                onChange={ this.handleChange }
              />
            </div>
            <div className="address-info">
              <TextField
                label="CEP"
                inputProps={ { 'data-testid': 'checkout-cep' } }
                type="text"
                name="cep"
                id="cep"
                value={ cep }
                onChange={ this.handleChange }
              />
              <TextField
                label="Endereço"
                inputProps={ { 'data-testid': 'checkout-address' } }
                type="text"
                name="address"
                id="address"
                value={ address }
                onChange={ this.handleChange }
              />
            </div>
          </div>
          <section className="paymentMethod">
            <h2>Métodos de Pagamento</h2>
            <label htmlFor="boleto">
              <input
                data-testid="ticket-payment"
                type="radio"
                name="paymentMethod"
                id="boleto"
                onClick={ () => this.setState({ paymentMethod: 'boleto' }) }
              />
              Boleto
            </label>
            <label htmlFor="visa">
              <input
                data-testid="visa-payment"
                type="radio"
                name="paymentMethod"
                id="visa"
                onClick={ () => this.setState({ paymentMethod: 'visa' }) }
              />
              Visa
            </label>
            <label htmlFor="master">
              <input
                data-testid="master-payment"
                type="radio"
                name="paymentMethod"
                id="master"
                onClick={ () => this.setState({ paymentMethod: 'master' }) }
              />
              Master Card
            </label>
            <label htmlFor="elo">
              <input
                data-testid="elo-payment"
                type="radio"
                name="paymentMethod"
                id="elo"
                onClick={ () => this.setState({ paymentMethod: 'elo' }) }
              />
              Elo
            </label>
          </section>
        </section>
        {
          (!inputsValidation && submitClicked)
          && <h2 data-testid="error-msg" className="error-msg">Campos inválidos</h2>
        }
        <Cart />
        <button
          className="checkout-btn btn"
          data-testid="checkout-btn"
          onClick={ () => this.submitOrder(history) }
        >
          Finalizar compra
        </button>
      </section>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.objectOf({}).isRequired,
};

export default Checkout;
