import filterReducer, {
    FilterState,
    Sort,
    updateChoices,
    updateLastCursor,
    updateSortBy,
    Choice
  } from './filterSlice';
  
  describe('filterSlice', () => {
    let initialState: FilterState;
  
    beforeEach(() => {
      initialState = {
        selectedFilters: [],
        sortBy: Sort.default,
        lastCursor: '',
      };
    });
  
    it('should handle updateChoices', () => {
      const selectedFilters: Choice[] = [{ id: '1', name: 'Option 1', slug: 'option-1', filter: 'filter1' }];
  
      const nextState = filterReducer(initialState, updateChoices(selectedFilters));
  
      expect(nextState.selectedFilters).toEqual(selectedFilters);
    });
  
    it('should handle updateSortBy', () => {
      const sortBy = Sort.ASC;
  
      const nextState = filterReducer(initialState, updateSortBy(sortBy));
  
      expect(nextState.sortBy).toEqual(sortBy);
    });
  
    it('should handle updateLastCursor', () => {
      const lastCursor = '123';
  
      const nextState = filterReducer(initialState, updateLastCursor(lastCursor));
  
      expect(nextState.lastCursor).toEqual(lastCursor);
    });

  });