import React from 'react';
import Proptypes from 'prop-types';
import '../pages/Home.css';
import '../pages/ShoppingCart.css';

class Product extends React.Component {
  state = {
    quantity: 1,
    cart: [],
  };

  componentDidMount() {
    this.updateQty();
    this.getCart();
  }

  updateQty = () => {
    const { product: { quantity } } = this.props;
    this.setState({ quantity });
  };

  getCart = () => {
    let cartArray = [];
    const cart = localStorage.getItem('cart');
    if (cart) { cartArray = JSON.parse(cart); }
    this.setState({ cart: cartArray });
  };

  handleQty = (action) => {
    const { cart } = this.state;
    const { product: { product }, updateSize } = this.props;
    const produto = cart.find((item) => item.product.id === product.id);
    const index = cart.indexOf(produto);
    if (action === 'increase' && cart[index].quantity + 1 <= product.available_quantity) {
      cart[index].quantity += 1;
    } else if (action === 'decrease') {
      cart[index].quantity -= 1;
      if (cart[index].quantity <= 0) { cart[index].quantity = 1; }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState({ quantity: cart[index].quantity });

    let cartSize = 0;
    const cartSizeStorage = localStorage.getItem('cartSize');
    if (cartSizeStorage) cartSize = JSON.parse(cartSizeStorage);
    cartSize = cart.reduce((acc, cur) => cur.quantity + acc, 0);
    localStorage.setItem('cartSize', JSON.stringify(cartSize));
    updateSize();
  };

  render() {
    const { product, removeProduct } = this.props;
    const { id, title, price, thumbnail } = product.product;
    const { quantity } = this.state;
    return (
      <div key={ id } className="shopping-cart-product">
        <img src={ thumbnail } alt={ title } />
        <div className="title">
          <h4 data-testid="shopping-cart-product-name">{ title }</h4>
        </div>
        <div className="responsive">
          <div className="plus-and-less">
            <button
              onClick={ () => this.handleQty('decrease') }
              data-testid="product-decrease-quantity"
            >
              <i className="fa-solid fa-minus qtdBtn" />
            </button>
            <h4
              data-testid="shopping-cart-product-quantity"
              className="qtdBtn"
            >
              { quantity }
            </h4>
            <button
              onClick={ () => this.handleQty('increase') }
              data-testid="product-increase-quantity"
            >
              <i className="fa-solid fa-plus qtdBtn" />
            </button>
          </div>
          <h4 className="price">
            <span>R$ </span>
            { (price * quantity).toFixed(2) }
          </h4>
        </div>
        <button
          id={ id }
          onClick={ (event) => removeProduct(event) }
          data-testid="remove-product"
          className="btn remove-product"
        >
          <span id={ id } />
          <i className="fa-solid fa-xmark" id={ id } />
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  id: Proptypes.string,
  title: Proptypes.string,
  price: Proptypes.string,
  thumbnail: Proptypes.string,
  product: Proptypes.object,
  removeProduct: Proptypes.func,
}.isRequired;

export default Product;
