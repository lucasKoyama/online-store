import { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import Review from '../components/Review';
import Search from '../components/Search';
import './Home.css';

class Details extends Component {
  state = {
    product: {},
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductById(id);
    this.setState({ product });
  };

  render() {
    const { add2Cart, match: { params: { id } } } = this.props;
    const { product } = this.state;
    const { attributes } = product;
    console.log(attributes);
    return (
      <section className="details">
        <header className="header">
          <Search hiddenQuery />
        </header>
        <div className="container">
          <div className="product">
            <img
              src={ product.thumbnail }
              alt="imagem do produto"
              data-testid="product-detail-image"
            />
            <div>
              <h3 data-testid="product-detail-name">{ product.title }</h3>
              <h3>Especificações Técnicas: </h3>
              <ul className="list-att">
                {
                  attributes !== undefined && attributes.map((att) => (
                    <li key={ att.name }>
                      <strong>{`${att.name}: `}</strong>
                      {att.value_name}
                    </li>
                  ))
                }
              </ul>
            </div>
            <h3
              data-testid="product-detail-price"
              className="price"
            >
              {`R$ ${product.price}`}
            </h3>
            <button
              data-testid="product-detail-add-to-cart"
              onClick={ () => add2Cart(product) }
              className="btn"
            >
              Adicionar
            </button>
          </div>
          <Review productId={ id } />
        </div>
      </section>
    );
  }
}

Details.propTypes = {
  add2Cart: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Details;
