import React from 'react';
import { Link } from 'react-router-dom';

class CartButton extends React.Component {
  render() {
    const cartSize = JSON.parse(localStorage.getItem('cartSize'));
    return (
      <div className="carrinho">
        <div data-testid="shopping-cart-size" className="cartSize">{ cartSize }</div>
        <Link to="/carrinho-de-compras" data-testid="shopping-cart-button">
          <i className="fa-solid fa-cart-shopping fa-2x" />
          <h4>Carrinho de Compras</h4>
        </Link>
      </div>
    );
  }
}

export default CartButton;
