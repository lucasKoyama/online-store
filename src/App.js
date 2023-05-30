import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Details from './pages/Details';
import Checkout from './pages/Checkout';
import '@fortawesome/fontawesome-free/css/all.min.css';

class App extends React.Component {
  componentDidMount() {
    this.updateCartSize();
  }

  add2Cart = async (product) => {
    let cartArray = [];
    const quantity = 1;
    const cart = localStorage.getItem('cart');
    if (cart) { cartArray = JSON.parse(cart); }
    if (cartArray.some((item) => item.product.id === product.id)) {
      const produto = cartArray.find((item) => item.product.id === product.id);
      const index = cartArray.indexOf(produto);
      cartArray[index].quantity += 1;
    } else {
      cartArray.push({ product, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
    this.updateCartSize();
  };

  updateCartSize = () => {
    let cartSize = 0;
    let cartArray = [];
    const cart = localStorage.getItem('cart');
    const cartSizeStorage = localStorage.getItem('cartSize');
    if (cart) { cartArray = JSON.parse(cart); }
    if (cartSizeStorage) cartSize = JSON.parse(cartSizeStorage);
    cartSize = cartArray.reduce((acc, cur) => cur.quantity + acc, 0);
    localStorage.setItem('cartSize', JSON.stringify(cartSize));
    this.forceUpdate();
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ (props) => <Home { ...props } add2Cart={ this.add2Cart } /> }
        />
        <Route exact path="/carrinho-de-compras" component={ ShoppingCart } />
        <Route exact path="/checkout" render={ (props) => <Checkout { ...props } /> } />
        <Route
          exact
          path="/detalhes-do-produto/:id"
          render={ (props) => <Details { ...props } add2Cart={ this.add2Cart } /> }
        />
      </Switch>
    );
  }
}

export default App;
