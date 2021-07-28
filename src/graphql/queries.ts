/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStoreItem = /* GraphQL */ `
  query GetStoreItem($id: ID!) {
    getStoreItem(id: $id) {
      id
      linkId
      productName
      pictures
      price
      currency
      discountPrice
      hashtags
      shortDescription
      description
      customizeTextInstructions
      sizes
      colors
      orientations
      isPublished
      createdAt
      updatedAt
    }
  }
`;
export const listStoreItems = /* GraphQL */ `
  query ListStoreItems(
    $filter: ModelStoreItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStoreItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        linkId
        productName
        pictures
        price
        currency
        discountPrice
        hashtags
        shortDescription
        description
        customizeTextInstructions
        sizes
        colors
        orientations
        isPublished
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
