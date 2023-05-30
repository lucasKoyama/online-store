import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartButton from './CartButton';

export default class Search extends Component {
  render() {
    const {
      query,
      handleChange,
      handleSearch,
      hiddenQuery,
    } = this.props;
    return (
      <div className="search">
        { hiddenQuery
          ? (
            <div>
              <Link to="/" className="btn">Voltar</Link>
            </div>
          )
          : (
            <div className="div-input">
              <input
                data-testid="query-input"
                className="input-search"
                name="query"
                placeholder="Pesquise aqui!"
                value={ query }
                type="text"
                onChange={ handleChange }
              />
              <button
                data-testid="query-button"
                onClick={ handleSearch }
                className="btn"
              >
                <span>Pesquisar  </span>
                <i className="fa-solid fa-magnifying-glass" />
              </button>
            </div>
          )}

        <CartButton />
      </div>
    );
  }
}

Search.propTypes = {
  query: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  hiddenQuery: PropTypes.bool.isRequired,
};
