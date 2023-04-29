import { gql } from "@apollo/client";

export const getHomePageProducts = gql`
  query ProductGetElements {
  products(first: 8, channel: "default-channel") {
    totalCount
    edges {
      node {
        ...ProductCardFragment
      }
    }
  }
}

fragment ProductCardFragment on Product {
  id
  slug
  name
  thumbnail {
    ...ImageFragment
  }
  category {
    id
    name
  }
  media {
    url
    alt
    type
  }
  attributes {
    attribute {
      slug
    }
    values {
      name
    }
  }
}

fragment ImageFragment on Image {
  url
  alt
}
`;

export const getProductDetailsBySlug = gql`
query ProductBySlug($slug: String!) {
  product(slug: $slug, channel: "default-channel") {
    ...ProductDetailsFragment
  }
}

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
  thumbnail{
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