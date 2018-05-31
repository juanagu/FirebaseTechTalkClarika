import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * Get this User's Favourite Recipes
  */
export function getProducts() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise((resolve, reject) => FirebaseRef
    .collection('products')
    .onSnapshot((querySnapshot) => {
      const products = [];
      querySnapshot.forEach(function(doc) {
        products.push(doc.data());
      });

      return dispatch({
        type: 'PRODUCTS_REFRESH',
        data: products,
      });
    }).catch(reject)).catch(e => console.log(e));
}

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'PRODUCTS_ERROR',
    data: message,
  })));
}

