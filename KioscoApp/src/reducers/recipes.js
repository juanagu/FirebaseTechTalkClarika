import Store from '../store/recipes';

export const initialState = Store;

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case 'PRODUCTS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'PRODUCTS_REFRESH': {
      let products = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        products = action.data.map(item => ({
          id: item.id,
          title: item.name,
          image: item.image,
          price: item.price,
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        products,
      };
    }
    default:
      return state;
  }
}
