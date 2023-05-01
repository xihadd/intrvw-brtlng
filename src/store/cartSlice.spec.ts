import CartReducer, { CartItem, CartState, addItemToCart, removeItemFromCart } from './cartSlice';

describe('cartSlice', () => {
  let initialState: CartState;

  beforeEach(() => {
    initialState = {
      cart: [],
      itemsInCart: 0,
    };
  });

  describe('addItemToCart', () => {
    it('should add a new item to the cart if it does not exist', () => {
      const itemToAdd: CartItem = { id: '1', name: 'Product 1', quantity: 2, price: 10 };
      const expectedState: CartState = {
        cart: [itemToAdd],
        itemsInCart: 2,
      };

      const actualState = CartReducer(initialState, addItemToCart(itemToAdd));

      expect(actualState).toEqual(expectedState);
    });

    it('should update the quantity of an existing item in the cart', () => {
      const existingItem: CartItem = { id: '1', name: 'Product 1', quantity: 2, price: 10 };
      const itemToAdd: CartItem = { id: '1', name: 'Product 1', quantity: 3, price: 10 };
      initialState = {
        cart: [existingItem],
        itemsInCart: 2,
      };
      const expectedState: CartState = {
        cart: [{ ...existingItem, quantity: 5 }],
        itemsInCart: 5,
      };

      const actualState = CartReducer(initialState, addItemToCart(itemToAdd));

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('removeItemFromCart', () => {
    it('should remove an existing item from the cart', () => {
      const existingItem: CartItem = { id: '1', name: 'Product 1', quantity: 2, price: 10 };
      initialState = {
        cart: [existingItem],
        itemsInCart: 2,
      };
      const expectedState: CartState = {
        cart: [],
        itemsInCart: 0,
      };

      const actualState = CartReducer(initialState, removeItemFromCart(existingItem.id));

      expect(actualState).toEqual(expectedState);
    });

    it('should not remove anything from the cart if the item does not exist', () => {
      const existingItem: CartItem = { id: '1', name: 'Product 1', quantity: 2, price: 10 };
      initialState = {
        cart: [existingItem],
        itemsInCart: 2,
      };
      const expectedState: CartState = {
        cart: [existingItem],
        itemsInCart: 2,
      };

      const actualState = CartReducer(initialState, removeItemFromCart('2'));

      expect(actualState).toEqual(expectedState);
    });
  });
});