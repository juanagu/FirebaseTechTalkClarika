import { Firebase, FirebaseRef } from '../lib/firebase';
import statusMessage from './status';

/**
  * Get all products
  */
export function getProducts() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise((resolve, reject) => FirebaseRef
    .collection('products')
    .onSnapshot((querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push(doc.data());
      });

      return dispatch({
        type: 'PRODUCTS_REFRESH',
        data: products,
      });
    }).catch(reject)).catch(e => console.log(e));
}

export function buyProduct(product) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const order = {
    product: {
      name: product.name,
      price: product.price,
    },
    userId: Firebase.auth().currentUser.uid,
    date: Firebase.firestore.FieldValue.serverTimestamp(),
  };

  return dispatch => new Promise((resolve, reject) => {
    FirebaseRef
      .collection('orders')
      .add(order).then(() => statusMessage(dispatch, 'loading', false).then(resolve))
      .catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
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

