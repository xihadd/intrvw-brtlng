import { Attribute, Choice, Sort } from "../../store/filterSlice";

export type WatchesProps = {
  attributes: [];
};

type queryVariables = {
  limit: number;
  offset: string | undefined;
  filter: {
    attributes: {
      slug: string;
      values: string[];
    }[];
  };
  sort?: {
    direction: string;
    field: string;
  };
};

/**
 * Given a list of attributes, return a list of attributes that are mapped to a typ Attribute
 * and remove attributes that are not needed for the filter
 * @param attributes
 * @returns
 */
export const cleanAttributes = (attributes: any): Attribute[] => {
  const cleanedAttributes: Attribute[] = attributes
    .filter(
      (attribute: {
        node: { withChoices: boolean; inputType: string; slug: string };
      }) =>
        attribute?.node.withChoices == true &&
        (attribute?.node.inputType === "DROPDOWN" ||
          attribute?.node.inputType === "MULTISELECT") &&
        [
          "country",
          "release-type",
          "artist",
          "genre",
          "medium",
        ].includes(attribute?.node.slug)
    )
    .map((attribute: any) => {
      return {
        id: attribute.node.id,
        name: attribute.node.name,
        slug: attribute.node.slug,
        inputType: attribute.node.inputType,
        withChoices: attribute.node.withChoices,
        choices: attribute.node.choices.edges.map((choice: any) => {
          return {
            id: choice.node.id,
            name: choice.node.name,
            slug: choice.node.slug,
            filter: attribute.node.slug,
          };
        }),
      };
    });
  return cleanedAttributes;
};

/**
 * Compute the query variables for the getProductsByFilter query adding sort, limit and offset
 * @param lastCursor
 * @param selectedFilters
 * @param sortBy
 * @returns
 */
export const computeQueryVariables = (
  lastCursor: string | undefined,
  selectedFilters: Choice[],
  sortBy: Sort
): queryVariables => {
  const variables: queryVariables = {
    limit: 16,
    offset: lastCursor,
    filter: {
      attributes: selectedFilters.map((filter) => ({
        slug: filter?.filter || "",
        values: [filter?.slug || ""],
      })),
    },
  };

  if (sortBy !== Sort.default) {
    variables.sort = {
      direction: sortBy,
      field: "NAME",
    };
  }
  return variables;
};