import { gql } from "@apollo/client";

const fragmentProduct = gql`
  fragment ProductDetailsFragment on Product {
    id
    name
    slug
    description
    seoDescription
    seoTitle
    isAvailableForPurchase
    attributes {
      attribute {
        id
      }
    }
    pricing {
      priceRange {
        start {
          gross {
            currency
            amount
          }
        }
      }
    }
    thumbnail {
      url
    }
    media {
      url
      alt
      type
    }
    category {
      name
    }
  }
`;

export const getHomePageProducts = gql`
  query ProductGetElements {
    products(first: 8, channel: "default-channel") {
      totalCount
      edges {
        node {
          ...ProductDetailsFragment
        }
      }
    }
  }
  ${fragmentProduct}
`;

export const getProductDetailsBySlug = gql`
  query ProductBySlug($slug: String!) {
    product(slug: $slug, channel: "default-channel") {
      ...ProductDetailsFragment
    }
  }
  ${fragmentProduct}
`;

export const getProductsBySearch = gql`
query getProducts($filter: ProductFilterInput) {
  products(first: 12, channel: "default-channel", filter: $filter) {
    totalCount
    edges {
      node {
        ...ProductDetailsFragment
      }
    }
  }
}
${fragmentProduct}
`;
