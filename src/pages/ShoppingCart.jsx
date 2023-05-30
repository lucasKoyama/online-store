import React from 'react';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';
import Search from '../components/Search';
import EmptyCart from '../components/EmptyCart';
import './Home.css';
import './ShoppingCart.css';

class ShoppingCart extends React.Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    this.updateCart();
  }

  updateSize = () => {
    // Atualiza o shoppingCart
    this.updateCart();
    this.forceUpdate();
  };

  updateCart = () => {
    const productsAdded = JSON.parse(localStorage.getItem('cart'));
    if (productsAdded !== null) this.setState({ cart: productsAdded });
  };

  render() {
    const { cart } = this.state;
    return (
      <>
        <header className="header">
          {' '}
          <Search hiddenQuery />
        </header>
        <section className="shopping-cart">
          {
            cart.length > 0
              ? (
                <>
                  <Cart updateSize={ this.updateSize } />
                  <Link
                    to="/checkout"
                    data-testid="checkout-products"
                    className="btn"
                  >
                    Finalizar pedido
                  </Link>
                </>

              )
              : (
                <span
                  data-testid="shopping-cart-empty-message"
                >
                  <EmptyCart />
                </span>
              )
          }

        </section>
      </>
    );
  }
}

export default ShoppingCart;
