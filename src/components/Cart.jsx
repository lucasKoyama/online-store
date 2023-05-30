import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';

class Cart extends React.Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    const productsAdded = JSON.parse(localStorage.getItem('cart'));
    if (productsAdded !== null) this.setState({ cart: productsAdded });
  }

  removeProduct = ({ target }) => {
    const { updateSize } = this.props;
    const { cart } = this.state;
    const produtoById = cart.find((item) => item.product.id === target.id);
    const removeIndex = cart.indexOf(produtoById);
    cart.splice(removeIndex, 1);

    this.setState({ cart });
    localStorage.setItem('cart', JSON.stringify(cart));

    let cartSize = 0;
    const cartSizeStorage = localStorage.getItem('cartSize');
    if (cartSizeStorage) cartSize = JSON.parse(cartSizeStorage);
    cartSize = cart.reduce((acc, cur) => cur.quantity + acc, 0);

    localStorage.setItem('cartSize', JSON.stringify(cartSize));
    updateSize();
  };

  render() {
    const { cart } = this.state;
    const { updateSize } = this.props;
    return (
      <div>
        {
          cart !== null && (cart.map((item) => (
            <Product
              product={ item }
              removeProduct={ this.removeProduct }
              updateSize={ updateSize }
              key={ item.product.id }
            />
          )))
        }
      </div>
    );
  }
}

export default Cart;

Cart.propTypes = {
  updateSize: PropTypes.number.isRequired,
};
