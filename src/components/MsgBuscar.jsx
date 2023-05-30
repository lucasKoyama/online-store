import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MsgBuscar extends Component {
  render() {
    const {
      query,
      categoryShow,
    } = this.props;
    return (
      <div>
        {
          query.length > 0
            ? (
              <p> </p>
            ) : (
              <p data-testid="home-initial-message" className="search-msg">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            )
        }
        <button className="category-btn" onClick={ () => categoryShow() }>
          <span>Categorias </span>
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    );
  }
}

MsgBuscar.propTypes = {
  categoryShow: PropTypes.func.isRequired,
};

MsgBuscar.propTypes = {
  query: PropTypes.string.isRequired,
};
