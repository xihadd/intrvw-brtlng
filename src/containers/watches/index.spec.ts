import { computeQueryVariables, cleanAttributes } from './index';
import { Choice, Sort, Attribute } from '../../store/filterSlice';

describe('computeQueryVariables', () => {
  const selectedFilters: Choice[] = [
    { id: '1', name: 'FilterA', slug: 'filter-1', filter: 'filter-1' },
    { id: '2', name: 'FilterB', slug: 'filter-2', filter: 'filter-2' },
  ];

  it('should return correct query variables without sortBy', () => {
    const lastCursor = 'abc123';
    const sortBy = Sort.default;
    const expected = {
      limit: 16,
      offset: lastCursor,
      filter: {
        attributes: [
          { slug: 'filter-1', values: ['filter-1'] },
          { slug: 'filter-2', values: ['filter-2'] },
        ],
      },
    };
    const result = computeQueryVariables(lastCursor, selectedFilters, sortBy);
    expect(result).toEqual(expected);
  });

  it('should return correct query variables with sortBy', () => {
    const lastCursor = 'abc123';
    const sortBy = Sort.ASC;
    const expected = {
      limit: 16,
      offset: lastCursor,
      filter: {
        attributes: [
          { slug: 'filter-1', values: ['filter-1'] },
          { slug: 'filter-2', values: ['filter-2'] },
        ],
      },
      sort: {
        direction: Sort.ASC,
        field: 'NAME',
      },
    };
    const result = computeQueryVariables(lastCursor, selectedFilters, sortBy);
    expect(result).toEqual(expected);
  });

  it('should return correct query variables without selectedFilters', () => {
    const lastCursor = 'abc123';
    const sortBy = Sort.default;
    const expected = {
      limit: 16,
      offset: lastCursor,
      filter: {
        attributes: [],
      },
    };
    const result = computeQueryVariables(lastCursor, [], sortBy);
    expect(result).toEqual(expected);
  });

  it('should return correct query variables without lastCursor', () => {
    const lastCursor = undefined;
    const sortBy = Sort.default;
    const expected = {
      limit: 16,
      offset: undefined,
      filter: {
        attributes: [
          { slug: 'filter-1', values: ['filter-1'] },
          { slug: 'filter-2', values: ['filter-2'] },
        ],
      },
    };
    const result = computeQueryVariables(lastCursor, selectedFilters, sortBy);
    expect(result).toEqual(expected);
  });

  it('should return correct query variables when selectedFilters is empty', () => {
    const lastCursor = 'abc123';
    const sortBy = Sort.default;
    const expected = {
      limit: 16,
      offset: lastCursor,
      filter: {
        attributes: [],
      },
    };
    const result = computeQueryVariables(lastCursor, [], sortBy);
    expect(result).toEqual(expected);
  });

  it('should return correct query variables when sortBy is descending', () => {
    const lastCursor = 'abc123';
    const sortBy = Sort.DESC;
    const expected = {
      limit: 16,
      offset: lastCursor,
      filter: {
        attributes: [
          { slug: 'filter-1', values: ['filter-1'] },
          { slug: 'filter-2', values: ['filter-2'] },
        ],
      },
      sort: {
        direction: Sort.DESC,
        field: 'NAME',
      },
    };
    const result = computeQueryVariables(lastCursor, selectedFilters, sortBy);
    expect(result).toEqual(expected);
  });

  it('should return correct query variables when lastCursor is undefined', () => {
    const lastCursor = undefined;
    const sortBy = Sort.default;
    const expected = {
      limit: 16,
      offset: undefined,
      filter: {
        attributes: [
          { slug: 'filter-1', values: ['filter-1'] },
          { slug: 'filter-2', values: ['filter-2'] },
        ],
      },
    };
    const result = computeQueryVariables(lastCursor, selectedFilters, sortBy);
    expect(result).toEqual(expected);
  });

});

describe('cleanAttributes', () => {
    it('should return an empty array if given an empty array', () => {
      const result = cleanAttributes([]);
      expect(result).toEqual([]);
    });
  
    it('should return an empty array if no attributes match the filter', () => {
      const attributes = [
        {
          node: {
            withChoices: true,
            inputType: 'DROPDOWN',
            slug: 'invalid-slug',
          },
        },
      ];
      const result = cleanAttributes(attributes);
      expect(result).toEqual([]);
    });
  
    it('should return a filtered and mapped array of attributes', () => {
      const attributes = [
        {
          node: {
            id: '1',
            name: 'Country',
            slug: 'country',
            inputType: 'DROPDOWN',
            withChoices: true,
            choices: {
              edges: [
                {
                  node: {
                    id: '11',
                    name: 'USA',
                    slug: 'usa',
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            id: '2',
            name: 'Artist',
            slug: 'artist',
            inputType: 'MULTISELECT',
            withChoices: true,
            choices: {
              edges: [
                {
                  node: {
                    id: '21',
                    name: 'The Beatles',
                    slug: 'the-beatles',
                  },
                },
              ],
            },
          },
        },
      ];
      const expected: Attribute[] = [
        {
          id: '1',
          name: 'Country',
          slug: 'country',
          inputType: 'DROPDOWN',
          withChoices: true,
          choices: [
            {
              id: '11',
              name: 'USA',
              slug: 'usa',
              filter: 'country',
            },
          ],
        },
        {
            id: '2',
            name: 'Artist',
            slug: 'artist',
            inputType: 'MULTISELECT',
            withChoices: true,
            choices: [
              {
                id: '21',
                name: 'The Beatles',
                slug: 'the-beatles',
                filter: 'artist',
              },
            ],
          }
      ];
      const result = cleanAttributes(attributes);
      expect(result).toEqual(expected);
    });

    const attributes = [
        {
          node: {
            id: '1',
            name: 'Country',
            slug: 'country',
            inputType: 'DROPDOWN',
            withChoices: true,
            choices: {
              edges: [
                { node: { id: '1', name: 'USA', slug: 'usa' } },
                { node: { id: '2', name: 'Canada', slug: 'canada' } },
              ],
            },
          },
        },
        {
          node: {
            id: '2',
            name: 'Format',
            slug: 'format',
            inputType: 'DROPDOWN',
            withChoices: false,
            choices: { edges: [] },
          },
        },
        {
          node: {
            id: '3',
            name: 'Genre',
            slug: 'genre',
            inputType: 'MULTISELECT',
            withChoices: true,
            choices: {
              edges: [
                { node: { id: '3', name: 'Rock', slug: 'rock' } },
                { node: { id: '4', name: 'Pop', slug: 'pop' } },
              ],
            },
          },
        },
      ];
    
      it('should return an empty array when no attributes are provided', () => {
        const result = cleanAttributes([]);
        expect(result).toEqual([]);
      });

      test("returns an empty array when given an empty array", () => {
        expect(cleanAttributes([])).toEqual([]);
      });
    
      it('should return an empty array when attributes are provided but none match the criteria', () => {
        const result = cleanAttributes([
          {
            node: {
              id: '1',
              name: 'Label',
              slug: 'label',
              inputType: 'DROPDOWN',
              withChoices: true,
              choices: {
                edges: [
                  { node: { id: '1', name: 'EMI', slug: 'emi' } },
                  { node: { id: '2', name: 'Sony', slug: 'sony' } },
                ],
              },
            },
          },
          {
            node: {
              id: '2',
              name: 'Release Year',
              slug: 'release-year',
              inputType: 'DROPDOWN',
              withChoices: true,
              choices: {
                edges: [
                  { node: { id: '1', name: '2021', slug: '2021' } },
                  { node: { id: '2', name: '2020', slug: '2020' } },
                ],
              },
            },
          },
        ]);
        expect(result).toEqual([]);
      });
  });