import layoutReducer, { toggleSearch, toggleMobileMenu } from './layoutSlice';

describe('layoutSlice', () => {
  describe('reducer', () => {
    it('should toggle searchOpen', () => {
      const initialState = {
        searchOpen: false,
        mobileMenuOpen: false,
      };
      const action = toggleSearch();
      const nextState = layoutReducer(initialState, action);
      expect(nextState.searchOpen).toBe(true);
    });

    it('should toggle mobileMenuOpen', () => {
      const initialState = {
        searchOpen: false,
        mobileMenuOpen: false,
      };
      const action = toggleMobileMenu();
      const nextState = layoutReducer(initialState, action);
      expect(nextState.mobileMenuOpen).toBe(true);
    });
  });

  describe('actions', () => {
    it('should create an action to toggle searchOpen', () => {
      const expectedAction = {
        type: 'layout/toggleSearch',
      };
      expect(toggleSearch()).toEqual(expectedAction);
    });

    it('should create an action to toggle mobileMenuOpen', () => {
      const expectedAction = {
        type: 'layout/toggleMobileMenu',
      };
      expect(toggleMobileMenu()).toEqual(expectedAction);
    });
  });
});