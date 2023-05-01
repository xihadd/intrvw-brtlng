import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Listbox } from '@headlessui/react';
import { Attribute, updateChoices } from '../../store/filterSlice';
import { useDispatchMock } from '../../store/hooks';
import '@testing-library/jest-dom'
import ProductFilter from './filter';

jest.mock('@/store/hooks', () => ({
  useAppDispatch: useDispatchMock,
}));

describe('ProductFilter', () => {
    const attributes = [
      {
        id: '1',
        name: 'Color',
        choices: [
          { id: '1', name: 'Red', slug: 'red' },
          { id: '2', name: 'Blue', slug: 'blue' },
        ],
      },
    ];
  
    test('should render the filter attributes and choices', () => {
      render(<ProductFilter attributes={attributes} />);
  
      // Verify that the filter attribute names are displayed
      const colorFilter = screen.getByText('Color');
      expect(colorFilter).toBeInTheDocument();
  
      // Verify that the filter choices are displayed
      const redChoice = screen.getByText('Red');
      expect(redChoice).toBeInTheDocument();
      const blueChoice = screen.getByText('Blue');
      expect(blueChoice).toBeInTheDocument();
    });
  
    test('should update the selected filters when a choice is clicked', () => {
      const updateChoicesMock = jest.fn();
      const dispatchMock = jest.fn(() => Promise.resolve());
      jest.mock('@/store/hooks', () => ({
        useAppDispatch: () => dispatchMock,
      }));
  
      render(<ProductFilter attributes={attributes} />);
  
      // Select the Red filter choice
      const redChoice = screen.getByText('Red');
      fireEvent.click(redChoice);
  
      // Verify that the selected filter has been updated
      const selectedFilters = screen.getByText(/Selected: .+/);
      expect(selectedFilters).toHaveTextContent('Selected: red');
  
      // Verify that the updateChoices action has been dispatched
      expect(dispatchMock).toHaveBeenCalledWith(
        updateChoices([{ id: '1', name: 'Red', slug: 'red', filter: 'color' }])
      );
    });
  });