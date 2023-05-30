import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Categories extends Component {
  render() {
    const {
      handleClickRatio,
      categoryList,
      categoryShow,
    } = this.props;
    return (
      <aside className={ `aside ${categoryShow}` }>
        <ul className="list">
          <h2>Categorias:</h2>
          {
            categoryList.map((category) => (
              <li key={ category.id }>
                <label
                  data-testid="category"
                  htmlFor={ category.id }
                >
                  <input
                    type="radio"
                    value={ `${category.name}` }
                    name="category"
                    id={ category.id }
                    onClick={ handleClickRatio }
                    className="input-ratio"
                  />
                  {`${category.name}`}
                </label>
              </li>
            ))
          }
        </ul>
      </aside>
    );
  }
}

Categories.propTypes = {
  categoryShow: PropTypes.func.isRequired,
};

Categories.propTypes = {
  handleClickRatio: PropTypes.func.isRequired,
  categoryList: PropTypes.arrayOf.isRequired,
};
