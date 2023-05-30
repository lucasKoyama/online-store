import React from 'react';
import PropTypes from 'prop-types';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import './Home.css';
import Categories from '../components/Categories';
import ProductsList from '../components/ProductsList';
import Search from '../components/Search';
import MsgBuscar from '../components/MsgBuscar';

class Home extends React.Component {
  state = {
    query: '',
    category: undefined,
    categoryList: [],
    products: [],
    searched: false,
    categoryShow: '',
  };

  componentDidMount() {
    this.fetchCategoryList();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  handleSearch = async () => {
    const { query, category } = this.state;
    const produtos = await getProductsFromCategoryAndQuery(category, query);
    this.setState({ products: produtos.results, searched: true });
  };

  handleClickRatio = ({ target: { id } }) => {
    this.setState({ category: id, query: '' }, async () => {
      await this.handleSearch();
    });
  };

  fetchCategoryList = () => {
    getCategories().then((response) => {
      this.setState({
        categoryList: response,
      });
    }).catch((error) => {
      console.log(error);
    });
  };

  categoryShow = () => {
    let { categoryShow } = this.state;
    categoryShow = categoryShow === 'category-show' ? '' : 'category-show';
    this.setState({ categoryShow });
  };

  render() {
    const { add2Cart } = this.props;
    const { query, products, searched, categoryList, categoryShow } = this.state;
    return (
      <>
        <header className="header">
          <Search
            query={ query }
            handleChange={ this.handleChange }
            handleSearch={ this.handleSearch }
          />
          <MsgBuscar
            query={ query }
            categoryShow={ this.categoryShow }
          />
        </header>
        <main className="main container">
          <Categories
            handleClickRatio={ this.handleClickRatio }
            categoryList={ categoryList }
            categoryShow={ categoryShow }
          />
          <ProductsList
            products={ products }
            add2Cart={ add2Cart }
            searched={ searched }
          />
        </main>
      </>
    );
  }
}

Home.propTypes = {
  add2Cart: PropTypes.func.isRequired,
};

export default Home;
