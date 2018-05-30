import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * Get this User's Favourite Recipes
  */
export function getProducts(dispatch) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const ref = FirebaseRef.collection('products');

  return ref.on('value', (snapshot) => {
    const products = snapshot.val() || [];

    return dispatch({
      type: 'PRODUCTS_REFRESH',
      data: products,
    });
  });
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

