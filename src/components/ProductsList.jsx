import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ProductsList extends Component {
  render() {
    const {
      products,
      add2Cart,
      searched,
    } = this.props;
    return (
      <div className="list-products">
        {
          products.length > 0
            ? (products.map((produto) => (
              <div className="product" key={ produto.id }>
                <Link
                  to={ `/detalhes-do-produto/${produto.id}` }
                  data-testid="product-detail-link"
                >
                  <div data-testid="product">
                    <img
                      src={ produto.thumbnail }
                      alt={ produto.title }
                    />
                    <h4 className="title">
                      {produto.title}
                    </h4>
                    <h5 className="price">
                      {`R$ ${produto.price}`}
                    </h5>
                  </div>
                </Link>
                <button
                  data-testid="product-add-to-cart"
                  onClick={ () => add2Cart(produto) }
                  className="btn"
                >
                  Adicionar
                </button>
                {
                  produto.shipping.free_shipping && (
                    <div data-testid="free-shipping" className="shipping">
                      <span>Frete grátis!     </span>
                      <i className="fa-solid fa-truck fa-1x" />
                    </div>
                  )
                }
              </div>
            )))
            : (searched && (<h2 className="not-found">Nenhum produto foi encontrado</h2>))
        }
      </div>
    );
  }
}

ProductsList.propTypes = {
  add2Cart: PropTypes.func.isRequired,
  products: PropTypes.arrayOf.isRequired,
  searched: PropTypes.bool.isRequired,
};
