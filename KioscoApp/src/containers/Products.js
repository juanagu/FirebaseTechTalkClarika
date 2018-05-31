import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getProducts, setError } from '../actions/products';

class RecipeListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    products: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getProducts: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchProducts();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchProducts = () => {
    return this.props.getProducts()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  render = () => {
    const { Layout, products, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        recipeId={id}
        error={products.error}
        loading={products.loading}
        products={products.products}
        reFetch={() => this.fetchProducts()}
      />
    );
  }
}

const mapStateToProps = state => ({
  products: state.products || {},
});

const mapDispatchToProps = {
  getProducts,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListing);
