import { gql } from "@apollo/client";

export const getHomePageProducts = gql`
  query ProductGetElements {
  products(first: 12, channel: "default-channel") {
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
