/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStoreItemById = /* GraphQL */ `
  query GetStoreItemById($itemId: ID!) {
    getStoreItemById(itemId: $itemId) {
      itemId
      byLink
      title
      description
      focusPictureUrl
      pictures
      price
      currency
      discountPrice
      hashtags
      shortDescription
      customizeTextInstructions
      sizes
      colors
      orientations
      isPublished
    }
  }
`;
export const getStoreItemWithPic = /* GraphQL */ `
  query GetStoreItemWithPic($itemId: ID!) {
    getStoreItemWithPic(itemId: $itemId) {
      itemId
      byLink
      title
      description
      focusPictureUrl
      pictures
      price
      currency
      discountPrice
      hashtags
      shortDescription
      customizeTextInstructions
      sizes
      colors
      orientations
      isPublished
    }
  }
`;
export const getStoreItemByTitle = /* GraphQL */ `
  query GetStoreItemByTitle($title: String!) {
    getStoreItemByTitle(title: $title) {
      itemId
      byLink
      title
      description
      focusPictureUrl
      pictures
      price
      currency
      discountPrice
      hashtags
      shortDescription
      customizeTextInstructions
      sizes
      colors
      orientations
      isPublished
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems($limit: Int!, $nextToken: String) {
    listItems(limit: $limit, nextToken: $nextToken) {
      storeItems {
        itemId
        byLink
        title
        description
        focusPictureUrl
        pictures
        price
        currency
        discountPrice
        hashtags
        shortDescription
        customizeTextInstructions
        sizes
        colors
        orientations
        isPublished
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($orderId: String!) {
    getOrder(orderId: $orderId) {
      orderId
      address
      postalCode
      city
      state
      country
      discount
      discountCodeUsed
      isFulfilled
      fulfilledDate
      dateOrdered
    }
  }
`;
